import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Input,
  Spinner,
  
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Toaster, {
  showErrorToast,
  showSuccessToast,
} from "@/components/Toaster";

const AddDocumentModal = ({ open, handleOpen, fetchDocuments }) => {
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("expertToken");
  const [documentData, setDocumentData] = useState({
    document_name: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setDocumentData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const submitDocument = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("document_name", documentData.document_name);
      formData.append("image", documentData.image);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admin/platform/createDocument`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        showSuccessToast(response.data.message || "Document uploaded successfully.");
        setDocumentData({ document_name: "", image: null });
        fetchDocuments(); 
        handleOpen();

      } else {
        showErrorToast(response.data.message || "Upload failed.");
      }
    } catch (error) {
      console.error("Error submitting document:", error);
      showErrorToast("Failed to upload document.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Toaster />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Upload Document</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Document Name"
              name="document_name"
              onChange={handleInputChange}
              value={documentData.document_name}
            />
            <Input
              label="Document Image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-2">
            Cancel
          </Button>
          <Button variant="text" onClick={submitDocument} disabled={loading}>
            {loading ? <Spinner className="h-4 w-4" /> : "Submit"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

AddDocumentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  bidId: PropTypes.any, // No longer required for document upload
};

export default AddDocumentModal;
