import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "danger";
}

const getVariantStyles = (variant: StatsCardProps["variant"]) => {
  switch (variant) {
    case "success":
      return "bg-risk-low-light border-risk-low text-risk-low";
    case "warning":
      return "bg-risk-medium-light border-risk-medium text-risk-medium";
    case "danger":
      return "bg-risk-high-light border-risk-high text-risk-high";
    default:
      return "bg-card border-border text-foreground";
  }
};

export const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = "default" 
}: StatsCardProps) => {
  return (
    <Card className={cn("border-l-4 transition-all duration-200", getVariantStyles(variant))}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-risk-low" : "text-risk-high"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};