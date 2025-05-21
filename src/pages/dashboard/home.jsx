import React, { useRef } from "react";
import { ArrowUpDown, Download, Filter, Search } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";

// Button component
const Button = ({
  children,
  variant = "default",
  size,
  disabled,
  className,
  onClick,
}) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ${
        variantClasses[variant]
      } ${sizeClasses[size || "default"]} ${className || ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Card component
const Card = ({ children, className }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${
      className || ""
    }`}
  >
    {children}
  </div>
);

// CardHeader component
const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ""}`}>
    {children}
  </div>
);

// CardTitle component
const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold leading-none tracking-tight">
    {children}
  </h3>
);

// CardDescription component
const CardDescription = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);

// CardContent component
const CardContent = ({ children }) => (
  <div className="p-6 pt-0">{children}</div>
);

// Input component
const Input = ({ type, placeholder, className, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      className || ""
    }`}
    {...props}
  />
);

// Label component
const Label = ({ htmlFor, children, className }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
      className || ""
    }`}
  >
    {children}
  </label>
);

// Select components
const Select = ({ children, defaultValue, onChange }) => {
  const [value, setValue] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (val) => {
    setValue(val);
    setOpen(false);
    if (onChange) onChange(val);
  };

  return (
    <div className="relative">
      <div
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setOpen(!open)}
      >
        {value || "Select an option"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {open && (
        <div className="absolute top-full left-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: handleSelect,
            })
          )}
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, id }) => <div id={id}>{children}</div>;
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
const SelectContent = ({ children }) => <div>{children}</div>;
const SelectItem = ({ value, children, onClick }) => (
  <div
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
    onClick={() => onClick(value)}
  >
    {children}
  </div>
);

// Tabs components
const Tabs = ({ children, defaultValue }) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div data-value={value}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          activeValue: value,
          onValueChange: setValue,
        })
      )}
    </div>
  );
};

const TabsList = ({ children, activeValue, onValueChange }) => (
  <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        activeValue,
        onValueChange,
      })
    )}
  </div>
);

const TabsTrigger = ({ value, children, activeValue, onValueChange }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeValue === value
        ? "bg-background text-foreground shadow-sm"
        : "hover:bg-background/50 hover:text-foreground"
    }`}
    onClick={() => onValueChange(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeValue }) => {
  if (activeValue !== value) return null;
  return <div>{children}</div>;
};

// Utility function for classNames
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Link component
const Link = ({ href, children }) => (
  <a href={href} className="hover:underline">
    {children}
  </a>
);

function Home() {
  const [applications, setApplications] = React.useState([]);
  const [allPassport, setPassport] = React.useState([]);
  const [kycData, setKycData] = React.useState([]);
  const [experts, setExperts] = React.useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState([]); // if you want other filters
  const [selectedExpert, setSelectedExpert] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [name, setName] = useState([]);
  const filtersTouched = useRef(false);
  const token = Cookies.get("token");

  const fetchCountry = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/iso",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("countries", res.data.data);
      setCountry(res.data.data); // Make sure setCountry is defined in your component
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    if (!token) return;

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
      setApplications(res.data); // ← updated here
      // setTotalPages(data.meta.totalPages); // ← updated here
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      // setLoading(false);
    }
  }, [token]);

  const fetchUser = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}admin/allusers/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("clientName", res.data);
      setName(res.data); // ← updated here
      // setTotalPages(data.meta.totalPages); // ← updated here
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      // setLoading(false);
    }
  }, [token]);

  const fetchAllPassword = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}admin/passport/onlypassport`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("leads", res.data.data);
      setPassport(res.data.data); // ← updated here
      // setTotalPages(data.meta.totalPages); // ← updated here
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      // setLoading(false);
    }
  }, [token]);

  const fetchAllKyc = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}admin/kyc/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("leads", res.data.data);
      setKycData(res.data.data); // ← updated here
      // setTotalPages(data.meta.totalPages); // ← updated here
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      // setLoading(false);
    }
  }, [token]);
  const fetchAllExperts = useCallback(async () => {
    if (!token) return;

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
      console.log("experts", res.data.experts);
      setExperts(res.data.experts); // ← updated here
      // setTotalPages(data.meta.totalPages); // ← updated here
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      // setLoading(false);
    }
  }, [token]);

  const handleFilter = async () => {
    const params = {};
    if (status) params.status = status;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (selectedClient) params.clientName = selectedClient;
    if (selectedExpert) params.expertName = selectedExpert;
    // params.clientEmail = "jsnikhil00@gmail.com";
    params.country = country;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}admin/visa/filterApplications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );
      console.log("Filtered data:", response.data);
      setApplications(response.data.data); // ← updated here
      // You can now update your table or state with this data
    } catch (error) {
      console.error("Error filtering applications:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchAllPassword();
    fetchUser();
    fetchAllKyc();
    fetchAllExperts();
    fetchCountry();
  }, [
    token,
    fetchLeads,
    fetchAllPassword,
    fetchAllKyc,
    fetchAllExperts,
    fetchUser,
    fetchCountry,
  ]);

  // Trigger filter when any of these change
  useEffect(() => {
    if (filtersTouched.current) {
      handleFilter();
    } else {
      // Skip first render
      filtersTouched.current = true;
    }
  }, [status, startDate, endDate, selectedClient, selectedExpert]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" className="gap-2" onClick={handleFilter}>
          <Filter className="h-4 w-4" /> Filter
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>

        {/* Date Range Inputs */}
        <div className="flex items-center gap-2">
          <Label htmlFor="start-date" className="sr-only">
            Start Date
          </Label>
          <Input
            type="date"
            id="start-date"
            className="w-32"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Label htmlFor="end-date" className="sr-only">
            End Date
          </Label>
          <Input
            type="date"
            id="end-date"
            className="w-32"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Status Dropdown */}

        <select
          className="border rounded-md p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        {/* Country Dropdown */}
        {/* <select
          className="border rounded-md p-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {Array.isArray(country) &&
            country.map((app) => (
              <option key={app.Iso2} value={app.Iso2}>
                {app.name}
              </option>
            ))}
        </select> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applications by ID, client name, destination..."
              className="pl-8 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Client Dropdown */}
          <select
            className="border rounded-md p-2"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">Select Client</option>
            {name.map((app) => (
              <option key={app._id} value={app.name}>
                {app.name}
              </option>
            ))}
          </select>
          {/* Expert Dropdown */}
          <select
            className="border rounded-md p-2"
            value={selectedExpert}
            onChange={(e) => setSelectedExpert(e.target.value)}
          >
            <option value="">Select Expert</option>
            {experts.map((expert) => (
              <option key={expert.id} value={expert.name}>
                {expert.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Visa</TabsTrigger>
          <TabsTrigger value="pending">Only Passport</TabsTrigger>
          <TabsTrigger value="approved">All kyc</TabsTrigger>
          <TabsTrigger value="rejected">Experts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <div className="flex justify-between items-center">
                <CardTitle>All Applications</CardTitle>
                <CardDescription>
                  Showing 1-10 of {applications.length} applications
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                {/* Table Header */}
                <div className="grid grid-cols-6 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                  <div>Country / Visa Type</div>
                  <div>Travel & Return Date</div>
                  <div>Purpose</div>
                  <div>Status</div>
                  <div className="text-center">Priority</div>
                  <div className="text-right">Actions</div>
                </div>

                {/* Table Content */}
                <div className="divide-y">
                  {applications.map((application) => (
                    <div
                      key={application._id}
                      className="grid grid-cols-6 items-center px-4 py-3 text-sm"
                    >
                      {/* Country / Visa Type */}
                      <div className="capitalize">
                        {application.country} / {application.visaType}
                      </div>

                      {/* Travel & Return Date */}
                      <div>
                        {new Date(application.travelDate).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(application.returnDate).toLocaleDateString()}
                      </div>

                      {/* Travel Purpose */}
                      <div
                        className="truncate max-w-[200px]"
                        title={application.travelPurpose}
                      >
                        {application.travelPurpose}
                      </div>

                      {/* Status */}
                      <div>
                        <div
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                            application.status === "approved" &&
                              "bg-green-100 text-green-800",
                            application.status === "pending" &&
                              "bg-yellow-100 text-yellow-800",
                            application.status === "rejected" &&
                              "bg-red-100 text-red-800"
                          )}
                        >
                          {application.status}
                        </div>
                      </div>

                      {/* Priority */}
                      <div className="text-center">
                        {application.priority ? "Yes" : "No"}
                      </div>

                      {/* Actions */}
                      <div className="text-right">
                        <Link href={`/visa-detail/${application._id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Footer */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>1-{applications.length}</strong> of{" "}
                  <strong>{applications.length}</strong> applications
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <div className="flex justify-between items-center">
                <CardTitle>Pending Applications</CardTitle>
                <CardDescription>
                  Showing 1-
                  {
                    allPassport.filter((app) => app.status === "pending").length
                  }{" "}
                  of{" "}
                  {allPassport.filter((app) => app.status === "pending").length}{" "}
                  applications
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-8 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                  <div className="col-span-2">Passport No / Full Name</div>
                  <div>Nationality</div>
                  <div>Passport Type</div>
                  <div>Date of Issue</div>
                  <div>Date of Expiry</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {allPassport
                    .filter((app) => app.status === "pending")
                    .map((application) => (
                      <div
                        key={application._id}
                        className="grid grid-cols-8 items-center px-4 py-3 text-sm"
                      >
                        <div className="col-span-2">
                          <div className="font-medium">
                            {application.PassportNumber}
                          </div>
                          <div className="text-muted-foreground">
                            {application.Fullname}
                          </div>
                        </div>
                        <div>{application.Nationality}</div>
                        <div>{application.PassportType}</div>
                        <div>
                          {new Date(
                            application.DateofIssue
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          {new Date(
                            application.DateofExpiry
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {application.status}
                          </div>
                        </div>
                        <div className="text-right">
                          <Link
                            href={`/apply-passports-detail/${application._id}`}
                          >
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <strong>
                    1-
                    {
                      allPassport.filter((app) => app.status === "pending")
                        .length
                    }
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {
                      allPassport.filter((app) => app.status === "pending")
                        .length
                    }
                  </strong>{" "}
                  applications
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <div className="flex justify-between items-center">
                <CardTitle>Approved KYC Applications</CardTitle>
                <CardDescription>
                  Showing 1-
                  {
                    kycData.filter((item) => item.status === "approved").length
                  }{" "}
                  of{" "}
                  {kycData.filter((item) => item.status === "approved").length}{" "}
                  applications
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                  <div>Name / Email</div>
                  <div>Country</div>
                  <div>Nationality</div>
                  <div>Address</div>
                  <div>Pin Code</div>
                  <div>Expert Assigned</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {kycData
                    .filter((item) => item.status === "approved")
                    .map((item) => (
                      <div
                        key={item._id}
                        className="grid grid-cols-7 items-center px-4 py-3 text-sm"
                      >
                        <div>
                          <div className="font-medium">{item.firstName}</div>
                          <div className="text-muted-foreground">
                            {item.email}
                          </div>
                        </div>
                        <div>{item.country}</div>
                        <div>{item.nationality}</div>
                        <div>{item.address}</div>
                        <div>{item.pincode}</div>
                        <div className="text-green-700">
                          {item.expertId || "N/A"}
                        </div>
                        <div className="text-right">
                          <Link href={`/kyc-detail/${item._id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <strong>
                    1-
                    {
                      kycData.filter((item) => item.status === "approved")
                        .length
                    }
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {
                      kycData.filter((item) => item.status === "approved")
                        .length
                    }
                  </strong>{" "}
                  applications
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <div className="flex justify-between items-center">
                <CardTitle>Experts Who Haven't Accepted Terms</CardTitle>
                <CardDescription>
                  Showing{" "}
                  <strong>
                    1-{experts.filter((e) => !e.termsAccepted).length}
                  </strong>{" "}
                  of <strong>{experts.length}</strong> experts
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                  <div>Name / Email</div>
                  <div>Phone</div>
                  <div>Expertise</div>
                  <div>Experience (Years)</div>
                  <div>Company</div>
                  <div>Working Hours</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {experts
                    .filter((expert) => !expert.termsAccepted)
                    .map((expert) => (
                      <div
                        key={expert._id}
                        className="grid grid-cols-7 items-center px-4 py-3 text-sm"
                      >
                        <div>
                          <div className="font-medium">
                            {expert.name || "N/A"}
                          </div>
                          <div className="text-muted-foreground">
                            {expert.email}
                          </div>
                        </div>
                        <div>{expert.phone || "N/A"}</div>
                        <div>{expert.expertise || "N/A"}</div>
                        <div>{expert.experienceYears || "N/A"}</div>
                        <div>{expert.companyName || "N/A"}</div>
                        <div>{expert.workingHours || "N/A"}</div>
                        <div className="text-right">
                          <Link href={`/expertdetails/${expert._id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <strong>
                    1-{experts.filter((e) => !e.termsAccepted).length}
                  </strong>{" "}
                  of <strong>{experts.length}</strong> experts
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
