import { useState } from "react";

const NOCForm = () => {
  const [hasNOC, setHasNOC] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantAddress: "",
    purpose: "",
    authority: "",
    designation: "",
    issueDate: "",
    remarks: "",
  });
  const [nocFile, setNocFile] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setNocFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasNOC && nocFile) {
      console.log("NOC File Uploaded:", nocFile);
      alert("NOC File Uploaded! Check the console for details.");
    } else {
      console.log("NOC Form Submitted:", formData);
      alert("NOC Form Submitted! Check the console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
        <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">
          No Objection Certificate (NOC)
              </h2>


              <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-3 rounded-l-full font-medium ${
              !hasNOC  ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setHasNOC(false)}
          >
            Fill Form
          </button>
          <button
            className={`px-6 py-3 rounded-r-full font-medium ${
              nocFile  ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setHasNOC(true)}
          >
            Upload NOC
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {hasNOC ? (
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Upload Existing NOC (PDF/Image)
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                required
                className="w-full border border-slate-300 px-4 py-3 rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          ) : (
            <>
              {/* Applicant Name */}
              <div>
                <label className="block text-slate-700 font-medium mb-1">Applicant Full Name</label>
                <input
                  type="text"
                  name="applicantName"
                  className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="John Doe"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Applicant Address */}
              <div>
                <label className="block text-slate-700 font-medium mb-1">Applicant Address</label>
                <textarea
                  name="applicantAddress"
                  className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  rows="3"
                  placeholder="123, Main Street, City, Country"
                  value={formData.applicantAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Purpose and Issue Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Purpose of NOC</label>
                  <input
                    type="text"
                    name="purpose"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Visa Application / Employment / Education"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Issue Date</label>
                  <input
                    type="date"
                    name="issueDate"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={formData.issueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Authority and Designation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Issuing Authority</label>
                  <input
                    type="text"
                    name="authority"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Company / Government Authority Name"
                    value={formData.authority}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Issuer Designation</label>
                  <input
                    type="text"
                    name="designation"
                    className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Manager / Director / Officer"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Additional Remarks (Optional)
                </label>
                <textarea
                  name="remarks"
                  className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  rows="3"
                  placeholder="Any additional notes or instructions..."
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-block bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md"
            >
              {hasNOC ? "Upload NOC Document" : "Generate NOC"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NOCForm;
