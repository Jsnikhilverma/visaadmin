import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SettingForm = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    mobile: "",
    email: "",
    address: "",
    tax: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [platformId, setPlatformId] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    // Fetch existing platform data
    axios
      .get(`${import.meta.env.VITE_BASE_URL}admin/platform/getAllPlatforms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Assuming the API returns an array of platforms
        const platform = res.data?.data?.[0];
        if (platform && platform._id) {
          const { brandName, email, tax, mobile,address,logo, _id } = platform;
          setFormData({ brandName, email, tax,address, mobile ,logo: null });
            const PlatformLogo =`${import.meta.env.VITE_BASE_URL_IMAGE}${logo}`;
          setLogoPreview(PlatformLogo);
          setPlatformId(_id);
          setIsEditMode(true);
        }
      })
      .catch((err) => console.error("GET error:", err));
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("handleChange", name, value, files);
    if (name === "logo" && files.length > 0) {
      setFormData({ ...formData, logo: files[0] });
      setLogoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("brandName", formData.brandName);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("address", formData.address);
    data.append("tax", formData.tax);
    if (formData.logo) data.append("platformLogo", formData.logo.name);
    console.log('formData', formData.logo.name);

    try {
      if (isEditMode && platformId) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}admin/platform/updatePlatform/${platformId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Settings updated successfully!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}admin/platform/createPlatform`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Settings created successfully!");
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to save settings.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-semibold mb-6 text-center">Admin Platform Settings</h2>

      {logoPreview && (
        <div className="flex justify-center mb-6">
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="h-24 w-24 rounded-full object-cover border"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Change Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mobile</label>
          <input
            type="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Text</label>
          <input
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="4"
            required
          ></input>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {isEditMode ? "Update Settings" : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingForm;
