import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export type ThreatLevel = "critical" | "high" | "medium" | "low"

interface ThreatBadgeProps {
  level: ThreatLevel
  className?: string
}

const threatStyles = {
  critical: "bg-critical text-white shadow-threat border-critical/50",
  high: "bg-high text-white shadow-sm border-high/50",
  medium: "bg-medium text-white shadow-sm border-medium/50",
  low: "bg-low text-white shadow-sm border-low/50",
}

export function ThreatBadge({ level, className }: ThreatBadgeProps) {
  return (
    <Badge 
      className={cn(
        "font-medium uppercase tracking-wide border",
        threatStyles[level],
        className
      )}
    >
      {level}
    </Badge>
  )
}