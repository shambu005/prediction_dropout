import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  class: string;
  mentor: string;
  riskLevel: "low" | "medium" | "high";
  riskScore: number;
  attendance: number;
  lastTestScore: number;
  feesStatus: "paid" | "overdue" | "partial";
}

interface StudentCardProps {
  student: Student;
  onClick?: () => void;
}

const getRiskBadgeVariant = (level: "low" | "medium" | "high") => {
  switch (level) {
    case "low": return "default";
    case "medium": return "secondary";
    case "high": return "destructive";
  }
};

const getRiskColor = (level: "low" | "medium" | "high") => {
  switch (level) {
    case "low": return "bg-risk-low-light border-risk-low text-risk-low";
    case "medium": return "bg-risk-medium-light border-risk-medium text-risk-medium";
    case "high": return "bg-risk-high-light border-risk-high text-risk-high";
  }
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const StudentCard = ({ student, onClick }: StudentCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
        getRiskColor(student.riskLevel)
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{student.name}</CardTitle>
              <p className="text-sm text-muted-foreground">Class {student.class}</p>
            </div>
          </div>
          <Badge variant={getRiskBadgeVariant(student.riskLevel)} className="capitalize">
            {student.riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Attendance:</span>
              <span className={cn(
                "font-medium",
                student.attendance < 60 ? "text-risk-high" : 
                student.attendance < 80 ? "text-risk-medium" : "text-risk-low"
              )}>
                {student.attendance}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Test:</span>
              <span className={cn(
                "font-medium",
                student.lastTestScore < 40 ? "text-risk-high" : 
                student.lastTestScore < 70 ? "text-risk-medium" : "text-risk-low"
              )}>
                {student.lastTestScore}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk Score:</span>
              <span className="font-bold">{student.riskScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fees:</span>
              <span className={cn(
                "font-medium capitalize",
                student.feesStatus === "paid" ? "text-risk-low" : "text-risk-high"
              )}>
                {student.feesStatus}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            Mentor: <span className="font-medium">{student.mentor}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};