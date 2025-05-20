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

function Allexperts() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const fetchExperts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}expert/allexperts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setExperts(res.data.experts || []);
    } catch (error) {
      console.error("Error fetching experts:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchExperts();
  }, [token, fetchExperts]);

  const deleteExpert = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}admin/users/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExperts((prev) => prev.filter((expert) => expert._id !== id));
    } catch (error) {
      console.error("Error deleting expert:", error);
    }
  };

  const handleEdit = (id) => {
    if (!id) return;
    navigate(`/expertdetails/${id}`);
  };

  const columns = [
    {
      key: "profilePhoto",
      label: "Profile",
      width: "w-20",
      render: (row) => (
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          {row.profilePhoto ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL_IMAGE}${row.profilePhoto}`}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              N/A
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (row) => <div>{row.name || "N/A"}</div>,
      width: "w-48",
    },
    {
      key: "email",
      label: "Email",
      render: (row) => <div>{row.email || "N/A"}</div>,
      width: "w-64",
    },
    {
      key: "phone",
      label: "Phone",
      render: (row) => <div>{row.phone || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "experienceYears",
      label: "Experience",
      render: (row) => <div>{row.experienceYears || "N/A"} years</div>,
      width: "w-32",
    },
    {
      key: "expertise",
      label: "Expertise",
      render: (row) => <div>{row.expertise || "N/A"}</div>,
      width: "w-40",
    },
    {
      key: "companyName",
      label: "Company",
      render: (row) => <div>{row.companyName || "N/A"}</div>,
      width: "w-60",
    },
    {
      key: "officeAddress",
      label: "Office Address",
      render: (row) => <div>{row.officeAddress || "N/A"}</div>,
      width: "w-80",
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
            <button onClick={() => deleteExpert(row._id)}>
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
        Experts List
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        View all registered experts
      </Typography>
    </div>
    <button
      onClick={() => navigate("/add-expert")} // adjust path as needed
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Add Expert
    </button>
  </div>
</CardHeader>


      <CardBody>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner className="h-8 w-8 text-blue-500" />
          </div>
        ) : (
          <CustomTable columns={columns} data={experts} />
        )}
      </CardBody>
    </Card>
  );
}

export default Allexperts;
