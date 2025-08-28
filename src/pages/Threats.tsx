import { useState } from "react"
import { ThreatBadge, ThreatLevel } from "@/components/ThreatBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Search, Filter, Eye, CheckCircle, Clock, MapPin } from "lucide-react"

interface Alert {
  id: string
  timestamp: string
  severity: ThreatLevel
  source: string
  host: string
  model: string
  message: string
  score: number
  acknowledged: boolean
  details: {
    sourceIp?: string
    destinationIp?: string
    port?: number
    protocol?: string
    bytes?: number
  }
}

// Mock real-time alerts data
const mockAlerts: Alert[] = [
  {
    id: "ALT-2024-001",
    timestamp: "2024-01-20T10:35:22Z",
    severity: "critical",
    source: "network",
    host: "web-server-01",
    model: "SeqAnomTransformer",
    message: "Massive data exfiltration attempt detected - 15GB transferred to external IP",
    score: 0.95,
    acknowledged: false,
    details: {
      sourceIp: "192.168.1.45",
      destinationIp: "203.0.113.5",
      port: 443,
      protocol: "HTTPS",
      bytes: 15728640000
    }
  },
  {
    id: "ALT-2024-002", 
    timestamp: "2024-01-20T10:32:15Z",
    severity: "high",
    source: "log",
    host: "auth-server",
    model: "LogBERT-lite",
    message: "Brute force attack detected - 847 failed login attempts in 2 minutes",
    score: 0.87,
    acknowledged: false,
    details: {
      sourceIp: "45.129.56.89"
    }
  },
  {
    id: "ALT-2024-003",
    timestamp: "2024-01-20T10:28:33Z", 
    severity: "medium",
    source: "network",
    host: "database-01",
    model: "SeqAnomTransformer",
    message: "Unusual SQL query patterns detected from application server",
    score: 0.72,
    acknowledged: true,
    details: {
      sourceIp: "192.168.1.23",
      destinationIp: "192.168.1.100",
      port: 3306,
      protocol: "MySQL"
    }
  },
  {
    id: "ALT-2024-004",
    timestamp: "2024-01-20T10:25:44Z",
    severity: "high",
    source: "network", 
    host: "firewall-01",
    model: "SeqAnomTransformer",
    message: "Port scan detected from external source - scanning 1000+ ports",
    score: 0.83,
    acknowledged: false,
    details: {
      sourceIp: "198.51.100.42"
    }
  },
  {
    id: "ALT-2024-005",
    timestamp: "2024-01-20T10:22:18Z",
    severity: "low",
    source: "log",
    host: "web-server-02", 
    model: "LogBERT-lite",
    message: "Repeated 404 errors suggest reconnaissance activity",
    score: 0.45,
    acknowledged: true,
    details: {
      sourceIp: "172.16.0.15"
    }
  }
]

export default function Threats() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesSource = sourceFilter === "all" || alert.source === sourceFilter
    
    return matchesSearch && matchesSeverity && matchesSource
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Threat Feed</h1>
          <p className="text-muted-foreground">Real-time security alerts and anomaly detection</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-muted-foreground">Live monitoring active</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="log">Logs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={`transition-all hover:shadow-md ${
            alert.severity === 'critical' ? 'border-critical/30' : 
            alert.severity === 'high' ? 'border-high/30' : ''
          }`}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <ThreatBadge level={alert.severity} />
                    <Badge variant="secondary" className="text-xs">
                      {alert.model}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTimestamp(alert.timestamp)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {alert.host}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-foreground">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Score: {(alert.score * 100).toFixed(1)}%</span>
                      <span>ID: {alert.id}</span>
                      {alert.details.sourceIp && (
                        <span>Source: {alert.details.sourceIp}</span>
                      )}
                      {alert.details.bytes && (
                        <span>Data: {formatBytes(alert.details.bytes)}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {alert.acknowledged ? (
                    <Badge variant="outline" className="text-success border-success/50">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Acknowledged
                    </Badge>
                  ) : (
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAcknowledge(alert.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Acknowledge
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium">No alerts found</p>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}