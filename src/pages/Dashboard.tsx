import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StudentCard } from "@/components/StudentCard";
import { StatsCard } from "@/components/StatsCard";
import { FileUpload } from "@/components/FileUpload";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Upload,
  Search,
  Filter,
  Download
} from "lucide-react";

// Mock data for demonstration
const mockStudents = [
  {
    id: "1",
    name: "Arjun Sharma",
    class: "10A",
    mentor: "Ms. Priya",
    riskLevel: "high" as const,
    riskScore: 85,
    attendance: 45,
    lastTestScore: 32,
    feesStatus: "overdue" as const
  },
  {
    id: "2", 
    name: "Sneha Patel",
    class: "10B",
    mentor: "Mr. Kumar",
    riskLevel: "medium" as const,
    riskScore: 65,
    attendance: 75,
    lastTestScore: 68,
    feesStatus: "partial" as const
  },
  {
    id: "3",
    name: "Rohit Gupta", 
    class: "10A",
    mentor: "Ms. Priya",
    riskLevel: "low" as const,
    riskScore: 25,
    attendance: 92,
    lastTestScore: 87,
    feesStatus: "paid" as const
  },
  {
    id: "4",
    name: "Kavya Singh",
    class: "10C", 
    mentor: "Dr. Mehta",
    riskLevel: "high" as const,
    riskScore: 78,
    attendance: 58,
    lastTestScore: 41,
    feesStatus: "overdue" as const
  },
  {
    id: "5",
    name: "Aditya Jain",
    class: "10B",
    mentor: "Mr. Kumar", 
    riskLevel: "medium" as const,
    riskScore: 55,
    attendance: 82,
    lastTestScore: 56,
    feesStatus: "paid" as const
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");
  const [showUpload, setShowUpload] = useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || student.class === filterClass;
    const matchesRisk = filterRisk === "all" || student.riskLevel === filterRisk;
    
    return matchesSearch && matchesClass && matchesRisk;
  });

  const highRiskCount = mockStudents.filter(s => s.riskLevel === "high").length;
  const mediumRiskCount = mockStudents.filter(s => s.riskLevel === "medium").length;
  const lowRiskCount = mockStudents.filter(s => s.riskLevel === "low").length;

  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file.name);
    // Here you would process the spreadsheet
  };

  return (
    <div className="min-h-screen bg-dashboard p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Risk Dashboard</h1>
            <p className="text-muted-foreground">Early intervention through data-driven insights</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowUpload(!showUpload)}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Data
            </Button>
            <Button className="gap-2 bg-gradient-primary">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* File Upload Section */}
        {showUpload && (
          <div className="grid md:grid-cols-3 gap-6">
            <FileUpload
              title="Attendance Data"
              description="Upload student attendance spreadsheet"
              acceptedFormats={[".xlsx", ".csv", ".xls"]}
              onFileSelect={handleFileUpload}
            />
            <FileUpload
              title="Assessment Scores"
              description="Upload test scores and grades"
              acceptedFormats={[".xlsx", ".csv", ".xls"]}
              onFileSelect={handleFileUpload}
            />
            <FileUpload
              title="Fee Records"
              description="Upload fee payment status"
              acceptedFormats={[".xlsx", ".csv", ".xls"]}
              onFileSelect={handleFileUpload}
            />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Students"
            value={mockStudents.length}
            subtitle="Currently enrolled"
            icon={Users}
          />
          <StatsCard
            title="High Risk"
            value={highRiskCount}
            subtitle="Requires immediate attention"
            icon={AlertTriangle}
            variant="danger"
          />
          <StatsCard
            title="Medium Risk" 
            value={mediumRiskCount}
            subtitle="Monitor closely"
            icon={TrendingUp}
            variant="warning"
          />
          <StatsCard
            title="Low Risk"
            value={lowRiskCount}
            subtitle="On track for success"
            icon={Users}
            variant="success"
          />
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Student Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search students by name or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="10A">Class 10A</SelectItem>
                  <SelectItem value="10B">Class 10B</SelectItem>
                  <SelectItem value="10C">Class 10C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Student Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <StudentCard 
                  key={student.id} 
                  student={student}
                  onClick={() => console.log("View student details:", student.name)}
                />
              ))}
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No students match your current filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;