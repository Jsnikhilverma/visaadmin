import { useState, useEffect, useCallback } from "react";
import {
  // Button,
  Card,
  CardBody,
  // CardFooter,
  CardHeader,
  // IconButton,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import CustomTable from "../../../components/CustomTable";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// import AddCustomBid from "./addCustomBid";

function VedioBook() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
    const [experts, setExperts] = useState([]);
  const [assigningToId, setAssigningToId] = useState(null);

  const token = Cookies.get("token");
const expertToken = Cookies.get("expertToken");
    const userType = Cookies.get("userType"); // admin or expert
    const userId = Cookies.get("userId");

  const navigate = useNavigate(); // Initialize navigate

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
        console.log(1);
        
        
        res = await axios.get(`${baseUrl}admin/visa/allvisaapplications`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res.data, 'ad res');
        
      } else if (userType === "expert" && userId) {
        const authToken = expertToken;

        const url = `${baseUrl}expert/visa/${userId}`;

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
       if (res?.data && userType === "admin") {
        setLeads(res.data);
       } else if (res?.data?.data && userType === "expert") {         
        setLeads(res.data.data);
       } else {
         console.log(4);
         
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
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}expert/allexperts`, {
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
  
  
  const handleAssignExpertClick = (id) => {
    setAssigningToId((prevId) => (prevId === id ? null : id));
  };

  // Handle expert selection from dropdown
  const handleExpertSelect = async (expertId) => {
    console.log("Assigning expert", expertId, "to lead", assigningToId);

    try {
      // Example API call to assign expert to lead (adjust URL and payload as needed)
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}admin/visa/assign-visa/${assigningToId}/${expertId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Expert assigned successfully!");
      setAssigningToId(null);
      // Optionally refresh leads or update UI
    } catch (error) {
      console.error("Error assigning expert:", error);
      alert("Failed to assign expert.");
    }
  };


  
  useEffect(() => {
    if (token) fetchLeads(1);
  }, [token, fetchLeads]);

  

  const deleteLead = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(leads.filter((lead) => lead.id !== id));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/visa-detail/${id}`); // Redirect to detail page with ID
  };

  const columns = [
    {
      key: "passportId",
      label: "Passport ID",
      render: (row) => <div>{row.passportId || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "country",
      label: "Country",
      render: (row) => <div>{row.country || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "visaType",
      label: "Visa Type",
      render: (row) => <div>{row.visaType || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "travelDate",
      label: "Travel Date",
      render: (row) => <div>{new Date(row.travelDate).toLocaleDateString() || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "returnDate",
      label: "Return Date",
      render: (row) => <div>{new Date(row.returnDate).toLocaleDateString() || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <div>{row.status || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
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
            <div className="absolute top-auto right-20 mt-10 w-48 max-h-56 overflow-y-auto bg-white border rounded shadow-lg z-10">
              {experts.length > 0 ? (
                experts.map((expert) => (
                  <div
                    key={expert._id}
                    className="cursor-pointer px-3 py-2 hover:bg-green-100"
                    onClick={() => handleExpertSelect(expert._id)}
                  >
                    {expert.name || expert.fullName || expert.firstName || "Unnamed Expert"}
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
          {/* <Button variant="gradient">Add New Lead</Button> */}
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

      {/* <CardFooter className="flex justify-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {currentPage > 3 && (
            <>
              <IconButton
                variant="text"
                size="sm"
                onClick={() => setCurrentPage(1)}
              >
                1
              </IconButton>
              {currentPage > 4 && <p>...</p>}
            </>
          )}

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = Math.max(1, currentPage - 2) + i;
            if (page > totalPages) return null;
            return (
              <IconButton
                key={page}
                variant="text"
                size="sm"
                onClick={() => setCurrentPage(page)}
                disabled={currentPage === page}
              >
                {page}
              </IconButton>
            );
          })}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <p>...</p>}
              <IconButton
                variant="text"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </IconButton>
            </>
          )}
        </div>

        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </CardFooter>
     */}
      {/* <AddCustomBid open={open} handleOpen={handleOpen} bidId={bidId} /> */}
    </Card>
  );
}

export default VedioBook;
