import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    type: "increase" | "decrease" | "neutral"
  }
  icon: LucideIcon
  variant?: "default" | "critical" | "success" | "warning"
  className?: string
}

const variantStyles = {
  default: "border-border",
  critical: "border-critical/30 bg-gradient-to-br from-critical/5 to-transparent",
  success: "border-success/30 bg-gradient-to-br from-success/5 to-transparent", 
  warning: "border-warning/30 bg-gradient-to-br from-warning/5 to-transparent",
}

const iconStyles = {
  default: "text-primary",
  critical: "text-critical",
  success: "text-success",
  warning: "text-warning",
}

const changeStyles = {
  increase: "text-success",
  decrease: "text-critical", 
  neutral: "text-muted-foreground",
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = "default",
  className 
}: MetricCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden backdrop-blur-sm",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", iconStyles[variant])} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className={cn("text-xs mt-1", changeStyles[change.type])}>
            {change.value}
          </p>
        )}
      </CardContent>
    </Card>
  )
}