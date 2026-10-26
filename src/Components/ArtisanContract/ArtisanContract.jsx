import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Nav from "../../Components/Nav/Nav";
import ScopeCompilationForm from "./ScopeCompilationForm";
import ContractPreview from "./ContractPreview";

const API_BASE_URL =
  "https://skillzonet-backend-auth-v1.onrender.com";

const ArtisanContract = () => {
  // The route should be /artisan-contract/:contractId
  const { contractId } = useParams();

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        setError("");
        setContract(null);

        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken");

        if (!token) {
          throw new Error(
            "Authentication token not found. Please log in again."
          );
        }

        if (!contractId) {
          throw new Error(
            "Contract ID was not provided in the URL."
          );
        }

        console.log(
          "Fetching contract with ID:",
          contractId
        );

        const response = await axios.get(
          `${API_BASE_URL}/api/job/contracts/getcontractDetails/${encodeURIComponent(
            contractId
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        console.log(
          "CONTRACT DETAILS API RESPONSE:",
          response.data
        );

        if (
          response.data?.success === false
        ) {
          throw new Error(
            response.data?.message ||
              "Unable to retrieve contract details."
          );
        }

        // The updated API returns the contract in response.data.contract.
        const contractData =
          response.data?.contract ||
          response.data?.data?.contract;

        if (
          !contractData ||
          typeof contractData !== "object" ||
          !contractData.id
        ) {
          throw new Error(
            response.data?.message ||
              "Valid contract details were not returned by the server."
          );
        }

        setContract(contractData);
      } catch (error) {
        console.error(
          "FETCH CONTRACT ERROR:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Unable to load contract details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [contractId]);

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
