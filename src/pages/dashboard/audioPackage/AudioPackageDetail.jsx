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

const AudioPackageDetail = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const [passDetails, setPassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUpdateStatus = async (newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}passport/passport-status-update/${id}?status=${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Visa status updated to ${newStatus}`);
      setPassDetails({ ...passDetails, status: newStatus });
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Status update failed.");
    }
  };

  useEffect(() => {
    const fetchVisaDetailsById = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}admin/passport/getpassport/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPassDetails({
          ...res.data.data,
          status:
            res.data.data.status === null || res.data.data.status === undefined
              ? "pending"
              : res.data.data.status,
        });

        console.log(res.data);
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

  if (!passDetails) {
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
            Passport Application Details
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Country:</strong> {passDetails.firstName}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Visa Type:</strong> {passDetails.firstName}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Date Of Birth:</strong>{" "}
            {new Date(passDetails.dateOfBirth).toLocaleDateString()}
          </Typography>

          {/* Status badge */}
          <Typography color="gray" className="text-lg flex items-center gap-2">
            <strong>Status:</strong>
            <span>
              {passDetails.status}
            </span>
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Typography color="gray" className="text-lg">
                <strong>Photo:</strong>
              </Typography>
              <img
                src={`${import.meta.env.VITE_BASE_URL_IMAGE}${passDetails.userImg}`}
                alt="Photo"
                className="rounded-md shadow-sm"
              />
            </div>
            <div>
              <Typography color="gray" className="text-lg">
                <strong>Adhar Front:</strong>
              </Typography>
              <img
                src={`${import.meta.env.VITE_BASE_URL_IMAGE}${passDetails.adharFrontImg}`}
                alt="Adhar Front"
                className="rounded-md shadow-sm"
              />
            </div>
            <div>
              <Typography color="gray" className="text-lg">
                <strong>Adhar Back:</strong>
              </Typography>
              <img
                src={`${import.meta.env.VITE_BASE_URL_IMAGE}${passDetails.adharBackImg}`}
                alt="Adhar Back"
                className="rounded-md shadow-sm"
              />
            </div>
            <div>
              <Typography color="gray" className="text-lg">
                <strong>PAN Card:</strong>
              </Typography>
              <img
                src={`${import.meta.env.VITE_BASE_URL_IMAGE}${passDetails.panCardImg}`}
                alt="PAN Card"
                className="rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => handleUpdateStatus("approved")}
              disabled={passDetails.status !== "pending"}
              className={`px-4 py-2 rounded-md shadow text-white ${
                passDetails.status !== "pending"
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Accept
            </button>
            <button
              onClick={() => handleUpdateStatus("rejected")}
              disabled={passDetails.status !== "pending"}
              className={`px-4 py-2 rounded-md shadow text-white ${
                passDetails.status !== "pending"
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

export default AudioPackageDetail;
