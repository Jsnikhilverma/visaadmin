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

  const [passDetails, setPassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason,setReason]=useState()

  const token = Cookies.get("token");
  const expertToken = Cookies.get("expertToken");
  const userType = Cookies.get("userType"); // admin or expert
  // const userId = Cookies.get("userId");

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const imageBaseUrl = import.meta.env.VITE_BASE_URL_IMAGE;

  console.log(passDetails,"gfvhgsgh");
  

  const fetchVisaDetailsByAdmin = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}admin/passport/getpassport/${id}`,
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
      console.log(1);
      
    } catch (error) {
      console.error("Failed to fetch passport details", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVisaDetailsByExpert = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}expert/expertpasport/${id}`,
        {
          headers: {
            Authorization: `Bearer ${expertToken}`,
          },
        }
      );
      console.log(res.data.data, 'iii');
      console.log(5);
      
      
      

      const expertData = res.data.data;
      console.log(res.data.data,"jhfjj");
      

      if (expertData) {
        setPassDetails({
          ...expertData,
          status:
            expertData.status === null || expertData.status === undefined
              ? "pending"
              : expertData.status,
        });
      } else {
        setPassDetails(null);
      }
    } catch (error) {
      console.error("Failed to fetch expert visa details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!token && !expertToken) {
      alert("Unauthorized");
      return;
    }

    setLoading(true);
   try {
  let res;

  // Allow both expert and admin
  if (userType === "expert" || userType === "admin") {
    const token = userType === "expert" ? expertToken : adminToken; // assuming you have adminToken available

    res = await axios.put(
      `${baseUrl}expert/passport-status-update/${id}?status=${newStatus}`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    alert("Only admins and experts can update status.");
    setLoading(false);
    return;
  }

  if (res?.data?.data) {
    setPassDetails({ ...passDetails, status: newStatus });
    alert(`Visa status updated to ${newStatus}`);
  }
} catch (error) {
  console.error("Failed to update status:", error);
  alert("Status update failed.");
} finally {
  setLoading(false);
}

  };

  useEffect(() => {
    if (userType === "admin") {
      fetchVisaDetailsByAdmin();
    } else if (userType === "expert") {
      fetchVisaDetailsByExpert();
    }
  }, [id, userType]);

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
        Visa details not found.
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
            <strong>Country:</strong> {passDetails.country || "-"}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Visa Type:</strong> {passDetails.visaType || "-"}
          </Typography>
          <Typography color="gray" className="text-lg">
            <strong>Date Of Birth:</strong>{" "}
            {passDetails.dateOfBirth
              ? new Date(passDetails.dateOfBirth).toLocaleDateString()
              : "-"}
          </Typography>

          <Typography color="gray" className="text-lg flex items-center gap-2">
            <strong>Status:</strong>
            <span>{passDetails.status}</span>
          </Typography>
          <Typography color="gray" className="text-lg flex items-center gap-2">
            <strong>Reason:</strong>
            <span>{passDetails.reason}</span>
          </Typography>
           <Typography color="gray" className="text-lg flex items-center gap-2">
            <strong>Comment for admin:</strong>
            <span>{passDetails.adminreason}</span>
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Photo", src: passDetails.userImg },
              { label: "Adhar Front", src: passDetails.adharFrontImg },
              { label: "Adhar Back", src: passDetails.adharBackImg },
              { label: "PAN Card", src: passDetails.panCardImg },
            ].map(
              (item, index) =>
                item.src && (
                  <div key={index}>
                    <Typography color="gray" className="text-lg">
                      <strong>{item.label}:</strong>
                    </Typography>
                    <img
                      src={`${imageBaseUrl}${item.src}`}
                      alt={item.label}
                      className="rounded-md shadow-sm"
                    />
                  </div>
                )
            )}
          </div>

           {userType === "expert" && (
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

          {/* Action Buttons only for admin */}
          {userType === "expert" && (
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
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default AudioPackageDetail;
