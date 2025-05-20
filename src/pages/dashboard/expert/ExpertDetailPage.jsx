import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Toaster, {

  showErrorToast,
} from "../../../components/Toaster";

const ExpertDetailPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    profilePhoto: null,
    companyName: "",
    experienceYears: "",
    governmentId: null,
    idWithSelfie: null,
    certifications: null, // string for single certification image path
    about: "",
    expertise: "",
    countries: "",
    officeAddress: "",
    workingHours: "",
  });
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}expert/experts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const expert = response.data?.expert;

      if (expert) {
        setFormData({
          name: expert.name || "",
          email: expert.email || "",
          phone: expert.phone || "",
          role: expert.role || "",
          profilePhoto: expert.profilePhoto || null,
          companyName: expert.companyName || "",
          experienceYears: expert.experienceYears || "",
          governmentId: expert.governmentId || null,
          idWithSelfie: expert.idWithSelfie || null,
          certifications: expert.certifications || null,
          about: "", // no about field in response, keep empty or add if API updated
          expertise: expert.expertise || "",
          countries: expert.countries || "",
          officeAddress: expert.officeAddress || "",
          workingHours: expert.workingHours || "",
        });
      }
    } catch (error) {
      console.error("Error fetching expert:", error);
      showErrorToast("Failed to fetch expert data");
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  const baseImageUrl = import.meta.env.VITE_BASE_URL_IMAGE;

  return (
    <>
      <Toaster />
      <div className="p-6 max-w-5xl mx-auto border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4">Expert Details</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <InputField
            label="Email"
            value={formData.email}
            name="email"
            disabled
          />
          <InputField
            label="Phone"
            value={formData.phone}
            name="phone"
            onChange={handleChange}
          />
          <InputField
            label="Role"
            value={formData.role}
            name="role"
            disabled
          />
          <InputField
            label="Company"
            value={formData.companyName}
            name="companyName"
            onChange={handleChange}
          />
          <InputField
            label="Experience (years)"
            value={formData.experienceYears}
            name="experienceYears"
            onChange={handleChange}
          />
          <InputField
            label="Expertise"
            value={formData.expertise}
            name="expertise"
            onChange={handleChange}
          />
          <InputField
            label="Countries"
            value={formData.countries}
            name="countries"
            onChange={handleChange}
          />
          <InputField
            label="Office Address"
            value={formData.officeAddress}
            name="officeAddress"
            onChange={handleChange}
          />
          <InputField
            label="Working Hours"
            value={formData.workingHours}
            name="workingHours"
            onChange={handleChange}
          />

          {/* Profile Photo */}
          <div className="sm:col-span-2 mt-4">
            <label className="block font-medium mb-1">Profile Photo</label>
            {formData.profilePhoto ? (
              <img
                src={`${baseImageUrl}${formData.profilePhoto}`}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full"
              />
            ) : (
              <p>No profile image uploaded</p>
            )}
          </div>

          {/* Government ID */}
          <div className="sm:col-span-2 mt-4">
            <label className="block font-medium mb-1">Government ID</label>
            {formData.governmentId ? (
              <a
                href={`${baseImageUrl}${formData.governmentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Government ID
              </a>
            ) : (
              <p>No government ID uploaded</p>
            )}
          </div>

          {/* ID With Selfie */}
          <div className="sm:col-span-2 mt-4">
            <label className="block font-medium mb-1">ID With Selfie</label>
            {formData.idWithSelfie ? (
              <a
                href={`${baseImageUrl}${formData.idWithSelfie}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View ID With Selfie
              </a>
            ) : (
              <p>No ID with selfie uploaded</p>
            )}
          </div>

          {/* Certification */}
          <div className="sm:col-span-2 mt-4">
            <label className="block font-medium mb-1">Certification</label>
            {formData.certifications ? (
              <a
                href={`${baseImageUrl}${formData.certifications}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Certification
              </a>
            ) : (
              <p>No certification uploaded</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

const InputField = ({ label, value, name, onChange, disabled }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full border px-3 py-2 rounded"
    />
  </div>
);

export default ExpertDetailPage;
