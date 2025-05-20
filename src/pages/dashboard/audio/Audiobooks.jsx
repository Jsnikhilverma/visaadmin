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

function Audiobooks() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [experts, setExperts] = useState([]);
  const [assigningToId, setAssigningToId] = useState(null);

  const token = Cookies.get("token");
  const expertToken = Cookies.get("expertToken");
  const userType = Cookies.get("userType"); // admin or expert
  const userId = Cookies.get("userId"); // used for expert fetch
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  // Fetch leads based on user role
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
 
        
        res = await axios.get(`${baseUrl}admin/kyc/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if (userType === "expert" && userId) {

        
        // Use expertToken if available, else fallback to token
        const authToken = expertToken;

        const url = `${baseUrl}expert/by-expert/${userId}`;

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

  // Fetch experts once on mount (only for admin)
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axios.get(`${baseUrl}expert/allexperts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  // Delete lead (admin only)
  const deleteLead = async (id) => {
    try {
      await axios.delete(`${baseUrl}admin/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/kyc-detail/${id}`);
  };

  // Toggle Assign Expert dropdown for a row
  const handleAssignExpertClick = (id) => {
    setAssigningToId((prevId) => (prevId === id ? null : id));
  };

  // Handle expert selection from dropdown
  const handleExpertSelect = async (expertId) => {
    try {
      await axios.put(
        `${baseUrl}admin/kyc/assign-expert/${assigningToId}/${expertId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Expert assigned successfully!");
      setAssigningToId(null);
      fetchLeads(); // refresh leads
    } catch (error) {
      console.error("Error assigning expert:", error);
      alert("Failed to assign expert.");
    }
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
      label: "Mobile",
      render: (row) => <div>{row.phone || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "email",
      label: "Email",
      render: (row) => <div>{row.email || row.userId?.email || "N/A"}</div>,
      width: "w-60",
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
      render: (row) =>
  (userType === "admin" || userType === "expert") ? (
    <div className="relative flex gap-2">
      {/* Edit button for admin & expert */}
      <Tooltip content="Edit">
        <button onClick={() => handleEdit(row._id)}>
          <PencilIcon className="h-5 w-5 text-blue-500" />
        </button>
      </Tooltip>

      {/* Delete button for admin & expert */}
      <Tooltip content="Delete">
        <button onClick={() => deleteLead(row._id)}>
          <TrashIcon className="h-5 w-5 text-red-500" />
        </button>
      </Tooltip>

      {/* Assign Expert button only for admin */}
      {userType === "admin" && (
        <Tooltip content="Assign Expert">
          <button
            onClick={() => handleAssignExpertClick(row._id)}
            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
          >
            Assign Expert
          </button>
        </Tooltip>
      )}

      {/* Expert dropdown only shown for admin */}
      {userType === "admin" && assigningToId === row._id && (
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
  ) : (
    <div className="text-gray-500 italic">No Actions</div>
  ),
      width: "w-48",
    }
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

export default Audiobooks;
