import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import Cookies from "js-cookie";

export default function ExpertSignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePhoto: null,
    governmentId: null,
    idWithSelfie: null,
    experienceYears: "",
    expertise: "",
    countries: "",
    certifications: null,
    companyName: "",
    officeAddress: "",
    workingHours: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("profilePhoto", formData.profilePhoto);
    form.append("governmentId", formData.governmentId);
    form.append("idWithSelfie", formData.idWithSelfie);
    form.append("experienceYears", formData.experienceYears);
    form.append("expertise", formData.expertise);
    form.append("countries", formData.countries);
    if (formData.certifications) {
      form.append("certifications", formData.certifications);
    }
    form.append("companyName", formData.companyName);
    form.append("officeAddress", formData.officeAddress);
    form.append("workingHours", formData.workingHours);
    form.append("password", formData.password);
    form.append("confirmPassword", formData.confirmPassword);
      form.append("termsAccepted", formData.termsAccepted);
      

       const token = Cookies.get("token");

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}expert/signup`, {
        method: "POST",
        headers: {
          // Add Authorization header if needed
          Authorization: `Bearer ${token}`
        },
        body: form,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        // Reset form or redirect as needed
      } else {
        alert("Signup failed: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center items-center">
      <Card className="w-full max-w-4xl shadow-xl border-2">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-indigo-700">Visa Expert Signup</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div>
              <Label>Phone</Label>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div>
              <Label>Profile Photo</Label>
              <Input type="file" name="profilePhoto" onChange={handleChange} accept="image/*" required />
            </div>

            <div>
              <Label>Government ID</Label>
              <Input type="file" name="governmentId" onChange={handleChange} required />
            </div>

            <div>
              <Label>ID with Selfie</Label>
              <Input type="file" name="idWithSelfie" onChange={handleChange} required />
            </div>

            <div>
              <Label>Experience (years)</Label>
              <Input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} required />
            </div>

            <div>
              <Label>Expertise Areas</Label>
              <Input name="expertise" value={formData.expertise} onChange={handleChange} placeholder="e.g., Student Visa, Business Visa" required />
            </div>

            <div>
              <Label>Countries of Specialization</Label>
              <Input name="countries" value={formData.countries} onChange={handleChange} placeholder="e.g., USA, Canada" required />
            </div>

            <div>
              <Label>Certifications</Label>
              <Input type="file" name="certifications" onChange={handleChange} />
            </div>

            <div>
              <Label>Company Name</Label>
              <Input name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Office Address</Label>
              <Textarea name="officeAddress" value={formData.officeAddress} onChange={handleChange} />
            </div>

            <div>
              <Label>Working Hours</Label>
              <Input name="workingHours" value={formData.workingHours} onChange={handleChange} />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <Checkbox id="terms" name="termsAccepted" checked={formData.termsAccepted} onCheckedChange={(val) => setFormData({ ...formData, termsAccepted: val })} />
              <Label htmlFor="terms">I accept the Terms and Conditions</Label>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Submit Application</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
