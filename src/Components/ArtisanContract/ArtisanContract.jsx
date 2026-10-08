import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Nav from "../../Components/Nav/Nav";
import ScopeCompilationForm from "./ScopeCompilationForm";
import ContractPreview from "./ContractPreview";

const ArtisanContract = () => {
  const { jobId } = useParams();

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token");

        if (!token) {
          setError(
            "Authentication token not found. Please login again."
          );
          return;
        }

        if (!jobId) {
          setError(
            "Job ID was not provided."
          );
          return;
        }

        console.log(
          "Looking for contract for Job ID:",
          jobId
        );

        const response = await axios.get(
          "https://skillzonet-backend-auth-v1.onrender.com/api/job/contracts/getall",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("ALL CONTRACTS API RESPONSE:", response.data);
console.log("CONTRACT DATA:", response.data?.data);
console.log(
  "CONTRACT DATA KEYS:",
  Object.keys(response.data?.data || {})
);

        /*
          Different APIs sometimes return:
          response.data.contracts
          response.data.data
          response.data.data.contracts

          We check the common structures without
          changing your backend response.
        */

        const contracts =
          response.data?.contracts ||
          response.data?.data?.contracts ||
          response.data?.data ||
          [];

        if (!Array.isArray(contracts)) {
          console.error(
            "Unexpected contracts response:",
            response.data
          );

          setError(
            "The contracts data returned from the server is invalid."
          );

          return;
        }

        /*
          Find the contract that belongs to
          the selected job.
        */

        const matchingContract =
          contracts.find(
            (item) =>
              String(item?.jobId) ===
              String(jobId)
          );

        console.log(
          "MATCHING CONTRACT:",
          matchingContract
        );

        if (!matchingContract) {
          setError(
            "No contract was found for this job."
          );

          return;
        }

        setContract(
          matchingContract
        );

      } catch (error) {
        console.error(
          "FETCH CONTRACT ERROR:",
          error.response?.data ||
            error.message
        );

        setError(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to load contract details. Please try again."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [jobId]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-[80px]">

      <Nav />

      <div className="max-w-[1440px] mx-auto px-6 py-8">

        {loading ? (

          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-gray-500">
              Loading contract details...
            </p>
          </div>

        ) : error ? (

          <div className="bg-white border border-red-200 rounded-lg p-10 text-center">

            <p className="text-red-600 font-medium">
              {error}
            </p>

          </div>

        ) : contract ? (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-start">

            {/* LEFT */}

            <ScopeCompilationForm
              contract={contract}
            />

            {/* RIGHT */}

            <ContractPreview
              contract={contract}
            />

          </div>

        ) : (

          <div className="bg-white border rounded-lg p-10 text-center">
            <p className="text-gray-500">
              Contract information is unavailable.
            </p>
          </div>

        )}

      </div>

    </div>
  );
};

export default ArtisanContract;