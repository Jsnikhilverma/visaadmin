import React, { useState } from "react";

const SponsorshipLetterForm = () => {
  const [hasLetter, setHasLetter] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    sponsorName: "",
    sponsorAddress: "",
    sponsorPhone: "",
    sponsorEmail: "",
    relationship: "",
    applicantName: "",
    visaPurpose: "",
    sponsorshipDetails: "",
    issueDate: "",
    additionalNotes: "",
  });

  const handleToggle = () => {
    setHasLetter(!hasLetter);
    setFile(null); // Reset file on toggle
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasLetter && file) {
      console.log("Uploaded File:", file);
      alert("File uploaded successfully.");
    } else {
      console.log("Form Data:", formData);
      alert("Form submitted successfully.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sponsorship Letter for Visa
        </h2>

        {/* Toggle Section */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-3 rounded-l-full font-medium ${
              !hasLetter ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setHasLetter(false)}
          >
            Fill Form
          </button>
          <button
            className={`px-6 py-3 rounded-r-full font-medium ${
              hasLetter ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setHasLetter(true)}
          >
            Upload Letter
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {hasLetter ? (
            // Upload Section
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Existing Sponsorship Letter (PDF / Image)
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 p-3 rounded-xl"
                required
              />
              {file && (
                <p className="mt-2 text-sm text-green-600">Selected: {file.name}</p>
              )}
            </div>
          ) : (
            // Form Section
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Sponsor’s Full Name
                </label>
                <input
                  type="text"
                  name="sponsorName"
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-3 rounded-xl"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Sponsor’s Address
                </label>
                <textarea
                  name="sponsorAddress"
                  rows="3"
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-3 rounded-xl"
                  placeholder="123 Main Street, City, Country"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Sponsor’s Phone
                  </label>
                  <input
                    type="tel"
                    name="sponsorPhone"
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-3 rounded-xl"
                    placeholder="+123456789"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Sponsor’s Email
                  </label>
                  <input
                    type="email"
                    name="sponsorEmail"
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-3 rounded-xl"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Relationship to Applicant
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-3 rounded-xl"
                    placeholder="Father, Uncle, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Applicant’s Full Name
                  </label>
                  <input
                    type="text"
                    name="applicantName"
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-3 rounded-xl"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Visa Purpose
                </label>
                <input
                  type="text"
                  name="visaPurpose"
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-3 rounded-xl"
                  placeholder="Tourist Visa / Student Visa"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Sponsorship Details
                </label>
                <textarea
                  name="sponsorshipDetails"
                  rows="4"
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-3 rounded-xl"
                  placeholder="I will cover travel, stay, and living expenses..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-3 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <input
                    type="text"
                    name="additionalNotes"
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-3 rounded-xl"
                    placeholder="Any extra comments..."
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition"
            >
              {hasLetter ? "Upload Letter" : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SponsorshipLetterForm;
