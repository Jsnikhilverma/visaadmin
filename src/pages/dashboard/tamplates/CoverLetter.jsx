import { useState } from "react";

const CoverLetterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    company: "",
    letter: "",
  });

  const [uploadMode, setUploadMode] = useState(false); // Toggle between form and upload
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uploadMode && uploadedFile) {
      console.log("Uploaded Cover Letter File:", uploadedFile);
      alert("Cover Letter Uploaded. Check console for file.");
    } else {
      console.log("Cover Letter Submitted:", formData);
      alert("Cover Letter Created. Check console for data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
        <h2 className="text-3xl font-semibold text-slate-800 mb-6 text-center">
          {uploadMode ? "Upload Your Cover Letter" : "Craft Your Cover Letter"}
        </h2>

        {/* Toggle Section */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setUploadMode(false)}
            className={`px-6 py-2 rounded-l-full ${
              !uploadMode ? "bg-blue-600 text-white" : "bg-gray-200 text-slate-600"
            }`}
          >
            Fill Form
          </button>
          <button
            onClick={() => setUploadMode(true)}
            className={`px-6 py-2 rounded-r-full ${
              uploadMode ? "bg-blue-600 text-white" : "bg-gray-200 text-slate-600"
            }`}
          >
            Upload File
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {uploadMode ? (
            // Upload Mode UI
            <div>
              <label className="block text-slate-600 font-medium mb-1">
                Upload Cover Letter (PDF or Image)
              </label>
              <input
                type="file"
                accept=".pdf, image/*"
                onChange={handleFileChange}
                className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                required
              />
              {uploadedFile && (
                <p className="mt-2 text-green-600">File Selected: {uploadedFile.name}</p>
              )}
            </div>
          ) : (
            // Form Mode UI
            <>
              {/* Full Name */}
              <div>
                <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555 123 4567"
                    required
                  />
                </div>
              </div>

              {/* Job Title & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Frontend Developer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Tech Innovations Inc."
                    required
                  />
                </div>
              </div>

              {/* Cover Letter Body */}
              <div>
                <label className="block text-slate-600 font-medium mb-1">Cover Letter</label>
                <textarea
                  name="letter"
                  rows="6"
                  className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                  value={formData.letter}
                  onChange={handleChange}
                  placeholder="Write your cover letter here..."
                  required
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-block bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md"
            >
              {uploadMode ? "Upload Cover Letter" : "Generate Cover Letter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoverLetterForm;
