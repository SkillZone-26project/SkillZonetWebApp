
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Nav from "../../Components/Nav/Nav";
import ScopeCompilationForm from "./ScopeCompilationForm";
import ContractPreview from "./ContractPreview";

const API_BASE_URL =
  "https://skillzonet-backend-auth-v1.onrender.com";

const ArtisanContract = () => {
  const { contractId } = useParams();

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContract = async () => {
      if (!contractId) {
        setError("Contract ID was not provided.");
        setContract(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setContract(null);

        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken");

        if (!token) {
          setError(
            "Authentication token not found. Please log in again."
          );
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/job/contracts/getcontractDetails/${contractId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = response.data;

        if (responseData?.success === false) {
          throw new Error(
            responseData?.message ||
              "Unable to retrieve contract details."
          );
        }

        // Support common response wrapper structures.
        let contractData =
          responseData?.data?.data?.contract ||
          responseData?.data?.contract ||
          responseData?.data?.data ||
          responseData?.data ||
          responseData?.contract ||
          null;

        if (Array.isArray(contractData)) {
          contractData = contractData[0] || null;
        }

        if (contractData?.contract) {
          contractData = contractData.contract;
        } else if (contractData?.contractDetails) {
          contractData = contractData.contractDetails;
        }

        if (
          !contractData ||
          typeof contractData !== "object" ||
          Array.isArray(contractData)
        ) {
          throw new Error(
            "The server response did not contain valid contract details."
          );
        }

        setContract(contractData);
      } catch (requestError) {
        console.error(
          "FETCH CONTRACT ERROR:",
          requestError.response?.data || requestError.message
        );

        setError(
          requestError.response?.data?.message ||
            requestError.response?.data?.error ||
            requestError.message ||
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
            <ScopeCompilationForm contract={contract} />
            <ContractPreview contract={contract} />
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
