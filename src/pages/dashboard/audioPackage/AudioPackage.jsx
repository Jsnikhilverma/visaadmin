import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import CustomTable from "../../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function AudioPackage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [experts, setExperts] = useState([]);
  const [assigningToId, setAssigningToId] = useState(null);

  const token = Cookies.get("token");
  const expertToken = Cookies.get("expertToken");
    const userType = Cookies.get("userType"); // admin or expert
    const userId = Cookies.get("userId");
  const navigate = useNavigate();

   const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchLeads = useCallback(async () => {
    if (!token && !expertToken) {

      
      setLeads([]);
      setLoading(false);
      return;
    }

    setLoading(true);

     try {
      let res;

      if (userType === "admin") {
 
        
        res = await axios.get(`${baseUrl}admin/passport/allpassports`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if (userType === "expert" && userId) {

        
        // Use expertToken if available, else fallback to token
        const authToken = expertToken;

        const url = `${baseUrl}expert/passport/${userId}`;

        res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } else {
        setLeads([]);
        setLoading(false);
        return;
      }

  

      if (res?.data?.data) {
        setLeads(res.data.data);
      } else if (res?.data?.kycData) {
        setLeads(res.data.kycData);
      } else {
        setLeads([]);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [token, userType, expertToken, userId, baseUrl]);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}expert/allexperts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setExperts(res.data.experts || []);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };

   if (token || expertToken) {

      
      if (userType === "admin") {
      
        
        fetchExperts();
        fetchLeads();
      } else if (userType === "expert" && userId) {
   
        
        fetchLeads();
      }
    }
  }, [token, userType,expertToken, userId, fetchLeads, baseUrl]);

  const handleExpertSelect = async (expertId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}admin/passportuser/assign-expert/${assigningToId}/${expertId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Expert assigned successfully!");
      setAssigningToId(null);
    } catch (error) {
      console.error("Error assigning expert:", error);
      alert("Failed to assign expert.");
    }
  };

  useEffect(() => {
    if (token) fetchLeads(1);
  }, [token, fetchLeads]);

  const handleAssignExpertClick = (id) => {
    setAssigningToId((prevId) => (prevId === id ? null : id));
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}admin/users/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLeads(leads.filter((lead) => lead.id !== id));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/apply-passports-detail/${id}`);
  };

  const columns = [
    {
      key: "fullName",
      label: "Name",
      render: (row) => (
        <div>{`${row.firstName || "N/A"} ${row.lastName || ""}`}</div>
      ),
      width: "w-48",
    },
    {
      key: "phone",
      label: "Date of birth",
      render: (row) => <div>{row.dateOfBirth || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "User Images",
      label: "User Images",
      width: "w-10",
      render: (row) => (
        <div>
          {row.userImg ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL_IMAGE}${row.userImg}`}
              alt="User"
              className="w-10 h-10 object-cover rounded"
            />
          ) : (
            "N/A"
          )}
        </div>
      ),
    },
    {
      key: "address",
      label: "Address",
      render: (row) => <div>{row.address || "N/A"}</div>,
      width: "w-60",
    },
    {
      key: "pincode",
      label: "Pincode",
      render: (row) => <div>{row.pincode || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="relative flex gap-2">
          <Tooltip content="Edit">
            <button onClick={() => handleEdit(row._id)}>
              <PencilIcon className="h-5 w-5 text-blue-500" />
            </button>
          </Tooltip>
          <Tooltip content="Delete">
            <button onClick={() => deleteLead(row._id)}>
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
          </Tooltip>
          <Tooltip content="Assign Expert">
            <button
              onClick={() => handleAssignExpertClick(row._id)}
              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
            >
              Assign Expert
            </button>
          </Tooltip>

          {assigningToId === row._id && (
            <div className="absolute top-full right-5 mt-1 w-48 max-h-56 overflow-y-auto bg-white border rounded shadow-lg z-10">
              {experts.length > 0 ? (
                experts.map((expert) => (
                  <div
                    key={expert._id}
                    className="cursor-pointer px-3 py-2 hover:bg-green-100"
                    onClick={() => handleExpertSelect(expert._id)}
                  >
                    {expert.name ||
                      expert.fullName ||
                      expert.firstName ||
                      "Unnamed Expert"}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-500">No experts found</div>
              )}
            </div>
          )}
        </div>
      ),
      width: "w-28",
    },
  ];

  return (
    <Card>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              User List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              View the current active Users
            </Typography>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner className="h-8 w-8 text-blue-500" />
          </div>
        ) : (
          <CustomTable columns={columns} data={leads} />
        )}
      </CardBody>
    </Card>
  );
}

export default AudioPackage;
