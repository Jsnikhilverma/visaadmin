import React from 'react';
import { ArrowUpDown, Download, Filter, Search } from "lucide-react";

// Button component
const Button = ({ children, variant = "default", size, disabled, className, onClick }) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3"
  };
  
  return (
    <button 
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size || 'default']} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Card component
const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`}>
    {children}
  </div>
);

// CardHeader component
const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}>
    {children}
  </div>
);

// CardTitle component
const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold leading-none tracking-tight">{children}</h3>
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
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    {...props}
  />
);

// Label component
const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`}>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
      </div>
      {open && (
        <div className="absolute top-full left-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {React.Children.map(children, child => 
            React.cloneElement(child, { 
              onClick: handleSelect
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
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          activeValue: value,
          onValueChange: setValue
        })
      )}
    </div>
  );
};

const TabsList = ({ children, activeValue, onValueChange }) => (
  <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    {React.Children.map(children, child => 
      React.cloneElement(child, { 
        activeValue,
        onValueChange
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
  // Sample applications data
  const applications = [
    {
      id: "AV-2023-1234",
      client: "John Smith",
      destination: "United States",
      type: "Tourist Visa",
      date: "May 10, 2023",
      expert: "Sarah Johnson",
      status: "Under Review",
    },
    {
      id: "AV-2023-1235",
      client: "Maria Garcia",
      destination: "Canada",
      type: "Student Visa",
      date: "May 12, 2023",
      expert: "Michael Rodriguez",
      status: "Submitted",
    },
    {
      id: "AV-2023-1236",
      client: "David Chen",
      destination: "United Kingdom",
      type: "Business Visa",
      date: "May 15, 2023",
      expert: "Emily Wong",
      status: "Approved",
    },
    {
      id: "AV-2023-1237",
      client: "Priya Sharma",
      destination: "Australia",
      type: "Work Visa",
      date: "May 18, 2023",
      expert: "Robert Kim",
      status: "Under Review",
    },
    {
      id: "AV-2023-1238",
      client: "Ahmed Hassan",
      destination: "Germany",
      type: "Schengen Visa",
      date: "May 20, 2023",
      expert: "Sarah Johnson",
      status: "Rejected",
    },
    {
      id: "AV-2023-1239",
      client: "Sofia Rodriguez",
      destination: "France",
      type: "Tourist Visa",
      date: "May 22, 2023",
      expert: "Michael Rodriguez",
      status: "Submitted",
    },
    {
      id: "AV-2023-1240",
      client: "James Wilson",
      destination: "Japan",
      type: "Business Visa",
      date: "May 25, 2023",
      expert: "Emily Wong",
      status: "Approved",
    },
    {
      id: "AV-2023-1241",
      client: "Aisha Khan",
      destination: "New Zealand",
      type: "Work Visa",
      date: "May 28, 2023",
      expert: "Robert Kim",
      status: "Under Review",
    },
    {
      id: "AV-2023-1242",
      client: "Carlos Mendez",
      destination: "Spain",
      type: "Schengen Visa",
      date: "May 30, 2023",
      expert: "Sarah Johnson",
      status: "Approved",
    },
    {
      id: "AV-2023-1243",
      client: "Emma Thompson",
      destination: "Italy",
      type: "Tourist Visa",
      date: "June 2, 2023",
      expert: "Michael Rodriguez",
      status: "Submitted",
    },
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visa Applications</h1>
          <p className="text-muted-foreground">Manage and track all visa applications in the system</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" /> Sort
          </Button>
        </div>
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
          <div>
            <Label htmlFor="status" className="sr-only">
              Status
            </Label>
            <Select defaultValue="all">
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="incomplete">Incomplete</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="prepared">Prepared</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date-range" className="sr-only">
              Date Range
            </Label>
            <Select defaultValue="all-time">
              <SelectTrigger id="date-range">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <div className="flex justify-between items-center">
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Showing 1-10 of {applications.length} applications</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-8 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                  <div className="col-span-2">Application ID / Client</div>
                  <div>Destination</div>
                  <div>Visa Type</div>
                  <div>Submission Date</div>
                  <div>Assigned Expert</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {applications.map((application) => (
                    <div key={application.id} className="grid grid-cols-8 items-center px-4 py-3 text-sm">
                      <div className="col-span-2">
                        <div className="font-medium">{application.id}</div>
                        <div className="text-muted-foreground">{application.client}</div>
                      </div>
                      <div>{application.destination}</div>
                      <div>{application.type}</div>
                      <div>{application.date}</div>
                      <div>{application.expert}</div>
                      <div>
                        <div
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                            application.status === "Under Review" &&
                              "bg-yellow-100 text-yellow-800",
                            application.status === "Submitted" &&
                              "bg-blue-100 text-blue-800",
                            application.status === "Approved" &&
                              "bg-green-100 text-green-800",
                            application.status === "Rejected" &&
                              "bg-red-100 text-red-800"
                          )}
                        >
                          {application.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <Link href={`/admin-dashboard/applications/${application.id}`}>
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
                  Showing <strong>1-10</strong> of <strong>{applications.length}</strong> applications
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
                  Showing 1-{applications.filter(app => app.status === "Under Review" || app.status === "Submitted").length} of {applications.filter(app => app.status === "Under Review" || app.status === "Submitted").length} applications
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-8 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                  <div className="col-span-2">Application ID / Client</div>
                  <div>Destination</div>
                  <div>Visa Type</div>
                  <div>Submission Date</div>
                  <div>Assigned Expert</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {applications
                    .filter((app) => app.status === "Under Review" || app.status === "Submitted")
                    .map((application) => (
                      <div key={application.id} className="grid grid-cols-8 items-center px-4 py-3 text-sm">
                        <div className="col-span-2">
                          <div className="font-medium">{application.id}</div>
                          <div className="text-muted-foreground">{application.client}</div>
                        </div>
                        <div>{application.destination}</div>
                        <div>{application.type}</div>
                        <div>{application.date}</div>
                        <div>{application.expert}</div>
                        <div>
                          <div
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              application.status === "Under Review" &&
                                "bg-yellow-100 text-yellow-800",
                              application.status === "Submitted" &&
                                "bg-blue-100 text-blue-800"
                            )}
                          >
                            {application.status}
                          </div>
                        </div>
                        <div className="text-right">
                          <Link href={`/admin-dashboard/applications/${application.id}`}>
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
                  Showing <strong>1-{applications.filter(app => app.status === "Under Review" || app.status === "Submitted").length}</strong> of <strong>{applications.filter(app => app.status === "Under Review" || app.status === "Submitted").length}</strong> applications
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
                <CardTitle>Approved Applications</CardTitle>
                <CardDescription>
                  Showing 1-{applications.filter(app => app.status === "Approved").length} of {applications.filter(app => app.status === "Approved").length} applications
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-8 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                  <div className="col-span-2">Application ID / Client</div>
                  <div>Destination</div>
                  <div>Visa Type</div>
                  <div>Submission Date</div>
                  <div>Assigned Expert</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {applications
                    .filter((app) => app.status === "Approved")
                    .map((application) => (
                      <div key={application.id} className="grid grid-cols-8 items-center px-4 py-3 text-sm">
                        <div className="col-span-2">
                          <div className="font-medium">{application.id}</div>
                          <div className="text-muted-foreground">{application.client}</div>
                        </div>
                        <div>{application.destination}</div>
                        <div>{application.type}</div>
                        <div>{application.date}</div>
                        <div>{application.expert}</div>
                        <div>
                          <div
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              "bg-green-100 text-green-800"
                            )}
                          >
                            {application.status}
                          </div>
                        </div>
                        <div className="text-right">
                          <Link href={`/admin-dashboard/applications/${application.id}`}>
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
                  Showing <strong>1-{applications.filter(app => app.status === "Approved").length}</strong> of <strong>{applications.filter(app => app.status === "Approved").length}</strong> applications
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
                <CardTitle>Rejected Applications</CardTitle>
                <CardDescription>
                  Showing 1-{applications.filter(app => app.status === "Rejected").length} of {applications.filter(app => app.status === "Rejected").length} applications
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-8 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                  <div className="col-span-2">Application ID / Client</div>
                  <div>Destination</div>
                  <div>Visa Type</div>
                  <div>Submission Date</div>
                  <div>Assigned Expert</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {applications
                    .filter((app) => app.status === "Rejected")
                    .map((application) => (
                      <div key={application.id} className="grid grid-cols-8 items-center px-4 py-3 text-sm">
                        <div className="col-span-2">
                          <div className="font-medium">{application.id}</div>
                          <div className="text-muted-foreground">{application.client}</div>
                        </div>
                        <div>{application.destination}</div>
                        <div>{application.type}</div>
                        <div>{application.date}</div>
                        <div>{application.expert}</div>
                        <div>
                          <div
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              "bg-red-100 text-red-800"
                            )}
                          >
                            {application.status}
                          </div>
                        </div>
                        <div className="text-right">
                          <Link href={`/admin-dashboard/applications/${application.id}`}>
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
                  Showing <strong>1-{applications.filter(app => app.status === "Rejected").length}</strong> of <strong>{applications.filter(app => app.status === "Rejected").length}</strong> applications
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