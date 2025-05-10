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

const VideoDetail = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const [visaDetails, setVisaDetails] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleUpdateStatus = async (newStatus) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}visa/visaApplicationId/${id}?status=${newStatus}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(`Visa status updated to ${newStatus}`);
    // Optionally, refetch or update UI
    setVisaDetails({ ...visaDetails, status: newStatus });
  } catch (error) {
    console.error("Failed to update status:", error);
    alert("Status update failed.");
  }
};

  useEffect(() => {
    const fetchVisaDetailsById = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}admin/visa/visaapplications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVisaDetails(res.data);
        // console.log(res.data);
        
        
      } catch (error) {
        console.error("Failed to fetch KYC details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisaDetailsById();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-10 w-10 text-blue-500" />
      </div>
    );
  }

  if (!visaDetails) {
    return (
      <div className="text-center mt-10 text-red-500">
        KYC details not found.
      </div>
    );
  }

  // const data = visaDetails.data;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <Card className="shadow-lg">
        <CardBody className="p-6 space-y-4">
          <Typography variant="h4" color="blue-gray">
            Visa Application Details
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Country:</strong> {visaDetails.country}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Visa Type:</strong> {visaDetails.visaType}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Travel Date:</strong> {new Date(visaDetails.travelDate).toLocaleDateString()}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Return Date:</strong> {new Date(visaDetails.returnDate).toLocaleDateString()}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Travel Purpose:</strong> {visaDetails.travelPurpose}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Accommodation:</strong> {visaDetails.accommodation}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Status:</strong> {visaDetails.status}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Typography color="gray" className="text-lg">
                <strong>Photo:</strong>
              </Typography>
              <img
                src={`${import.meta.env.VITE_BASE_URL_IMAGE}${visaDetails.documents.photo}`}
                alt="Photo"
                className="rounded-md shadow-sm"
              />
            </div>
            <div>
              <Typography color="gray" className="text-lg">
                <strong>Bank Statement:</strong>
              </Typography>
              <img
                src={`${import.meta.env.VITE_BASE_URL_IMAGE}${visaDetails.documents.bankStatement}`}
                alt="Bank Statement"
                className="rounded-md shadow-sm"
              />
            </div>
            <div>
              <Typography color="gray" className="text-lg">
                <strong>Invitation:</strong>
              </Typography>
              <img
                src={`${import.meta.env.VITE_BASE_URL_IMAGE}${visaDetails.documents.invitation}`}
                alt="Invitation"
                className="rounded-md shadow-sm"
              />
            </div>
          </div>
           <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => handleUpdateStatus("approved")}
              disabled={visaDetails.status !== "pending"}
              className={`px-4 py-2 rounded-md shadow text-white ${
                visaDetails.status !== "pending"
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Accept
            </button>
            <button
              onClick={() => handleUpdateStatus("rejected")}
              disabled={visaDetails.status !== "pending"}
              className={`px-4 py-2 rounded-md shadow text-white ${
                visaDetails.status !== "pending"
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Reject
            </button>
          </div>

        </CardBody>
      </Card>
    </div>
  );
};

export default VideoDetail;
