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
import { TrashIcon } from "@heroicons/react/24/solid";
import AddDocumentModal from "./addDocumentModal";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const token = Cookies.get("expertToken");

  const handleModalOpen = () => setOpen((prev) => !prev);

  const fetchDocuments = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}admin/platform/getAllDocument`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDocuments(res.data.data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const deleteDocument = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}admin/platform/deleteDocument/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const columns = [
    {
      key: "document_name",
      label: "Document Name",
      render: (row) => <div>{row.document_name}</div>,
      width: "w-60",
    },
    {
      key: "document_url",
      label: "Document",
      render: (row) => (
        <a
          href={`${import.meta.env.VITE_BASE_URL_IMAGE}${row.document_url}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View
        </a>
      ),
      width: "w-40",
    },
    {
      key: "created_at",
      label: "Created At",
      render: (row) =>
        new Date(row.created_at).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      width: "w-48",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Tooltip content="Delete">
          <button onClick={() => deleteDocument(row._id)}>
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
        </Tooltip>
      ),
      width: "w-20",
    },
  ];

  return (
    <Card>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Document List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              View and manage uploaded documents
            </Typography>
          </div>
          <button
            onClick={handleModalOpen}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Document
          </button>
        </div>
      </CardHeader>

      <CardBody>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner className="h-8 w-8 text-blue-500" />
          </div>
        ) : (
          <CustomTable columns={columns} data={documents} />
        )}
      </CardBody>

      <AddDocumentModal open={open} handleOpen={handleModalOpen} fetchDocuments={fetchDocuments} />
    </Card>
  );
}

export default Documents;
