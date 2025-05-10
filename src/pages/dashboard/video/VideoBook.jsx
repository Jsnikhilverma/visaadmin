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
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);x
  const token = Cookies.get("token");
  // const [open, setOpen] = useState(false);
  // const [bidId, setBidId] = useState(null);
  


  // const handleOpen = (id,projectTitle,min,max) =>{

  //   const bids ={
  //     id:id,
  //     projectTitle:projectTitle,
  //     min:min,
  //     max:max
  //   }

  //   setOpen(!open);
  //   setBidId(bids);
   

  // } 
  
  // const permissions = Cookies.get("permissions");
  // const currentRoute = useLocation().pathname;

  // console.log("currentRoute", currentRoute);

  // const accessArray = JSON.parse(permissions);
  // const accessRoutes = accessArray.map((route) => `/${route}`);
  // console.log("accessRoutes", accessRoutes);

  

  const navigate = useNavigate(); // Initialize navigate

  const fetchLeads = useCallback(
    async () => {
      if (!token) return;
  
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}admin/visa/allvisaapplications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("leads", res.data);
        setLeads(res.data); // ← updated here
        // setTotalPages(data.meta.totalPages); // ← updated here
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  
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
