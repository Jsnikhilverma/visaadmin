import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
} from "@material-tailwind/react";

const AudiobookDetail = () => {
  const { id } = useParams();
  const role = Cookies.get("userType"); // 'expert' or 'admin'
  const token = role === "expert" ? Cookies.get("expertToken") : Cookies.get("token");

  const [kycDetails, setKycDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState(""); // State to store reason

  const handleUpdateStatus = async (newStatus) => {

    if (!reason.trim()) {
      alert("Please provide a reason before updating the status.");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BASE_URL}admin/kyc/status/${id}?status=${newStatus}`;
      const res = await axios.put(
        url,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`KYC status updated to ${newStatus}`);
      setKycDetails({ ...kycDetails, status: newStatus });
      setReason(""); // Clear reason after update
    } catch (error) {
      console.error("Failed to update status:", error.response || error.message);
      alert(`Status update failed: ${error?.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    const fetchKycDetailsById = async () => {
      try {
        const apiPath =
          role === "expert"
            ? `expert/expertKyc/${id}`
            : `admin/kyc/details/${id}`;

        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${apiPath}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setKycDetails(data.data);
      } catch (error) {
        console.error("Failed to fetch KYC details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKycDetailsById();
  }, [id, token, role]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-10 w-10 text-blue-500" />
      </div>
    );
  }

  if (!kycDetails) {
    return (
      <div className="text-center mt-10 text-red-500">
        KYC details not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <Card className="shadow-lg">
        <CardBody className="p-6 space-y-4">
          <Typography variant="h4" color="blue-gray">
            KYC Details
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>First Name:</strong> {kycDetails.firstName}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Email:</strong> {kycDetails.email}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Address:</strong> {kycDetails.address}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Pincode:</strong> {kycDetails.pincode}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Status:</strong> {kycDetails.status}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Reason:</strong> {kycDetails.reason}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>for admin (comment):</strong> {kycDetails.adminreason}
          </Typography>

          {/* Optional image display */}
          {kycDetails.adharFrontImg && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Typography color="gray" className="text-lg font-bold">Adhar Front:</Typography>
                <img
                  src={`${import.meta.env.VITE_BASE_URL_IMAGE}${kycDetails.adharFrontImg}`}
                  alt="Adhar Front"
                  className="rounded-md shadow-sm"
                />
              </div>
              <div>
                <Typography color="gray" className="text-lg font-bold">Adhar Back:</Typography>
                <img
                  src={`${import.meta.env.VITE_BASE_URL_IMAGE}${kycDetails.adharBackImg}`}
                  alt="Adhar Back"
                  className="rounded-md shadow-sm"
                />
              </div>
              <div>
                <Typography color="gray" className="text-lg font-bold">PAN Card:</Typography>
                <img
                  src={`${import.meta.env.VITE_BASE_URL_IMAGE}${kycDetails.panCardImg}`}
                  alt="PAN Card"
                  className="rounded-md shadow-sm"
                />
              </div>
            </div>
          )}

          {/* Reason textarea - only for admin */}
          {role === "expert" && (
            <div className="mt-6">
              <label className="text-lg font-bold">Give Reason</label>
              <textarea
                className="border-2 rounded-lg w-full p-2 mt-1"
                placeholder="Give a reason for accept or reject"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          )}

          {/* Action buttons - only for admin */}
          {role === "expert" && (
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => handleUpdateStatus("approved")}
                disabled={kycDetails.status !== "pending"}
                className={`px-4 py-2 rounded-md shadow text-white ${
                  kycDetails.status !== "pending"
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus("rejected")}
                disabled={kycDetails.status !== "pending"}
                className={`px-4 py-2 rounded-md shadow text-white ${
                  kycDetails.status !== "pending"
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Reject
              </button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default AudiobookDetail;
