import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MetricCard } from "@/components/MetricCard"
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Network as NetworkIcon, Activity, Shield, AlertTriangle, Download, Upload, Globe, Server, Filter, Search, RefreshCw } from "lucide-react"

const mockNetworkData = [
  { time: "00:00", inbound: 45, outbound: 32, packets: 1240 },
  { time: "04:00", inbound: 52, outbound: 38, packets: 1580 },
  { time: "08:00", inbound: 78, outbound: 65, packets: 2340 },
  { time: "12:00", inbound: 95, outbound: 82, packets: 3120 },
  { time: "16:00", inbound: 88, outbound: 76, packets: 2890 },
  { time: "20:00", inbound: 67, outbound: 54, packets: 2150 },
]

const mockProtocolData = [
  { protocol: "HTTPS", value: 45, color: "hsl(var(--primary))" },
  { protocol: "HTTP", value: 25, color: "hsl(var(--secondary))" },
  { protocol: "SSH", value: 15, color: "hsl(var(--accent))" },
  { protocol: "DNS", value: 10, color: "hsl(var(--muted))" },
  { protocol: "Other", value: 5, color: "hsl(var(--muted-foreground))" },
]

const mockTopTalkers = [
  { ip: "192.168.1.100", hostname: "web-server-01", inbound: "2.3 GB", outbound: "1.8 GB", connections: 1247, risk: "low" },
  { ip: "10.0.0.55", hostname: "db-primary", inbound: "890 MB", outbound: "1.2 GB", connections: 534, risk: "low" },
  { ip: "172.16.0.23", hostname: "unknown", inbound: "1.5 GB", outbound: "850 MB", connections: 892, risk: "medium" },
  { ip: "203.0.113.45", hostname: "external", inbound: "450 MB", outbound: "2.1 GB", connections: 2341, risk: "high" },
  { ip: "192.168.1.77", hostname: "workstation-12", inbound: "320 MB", outbound: "180 MB", connections: 156, risk: "low" },
]

const mockAnomalies = [
  { time: "14:23:15", type: "Port Scan", source: "203.0.113.22", target: "192.168.1.0/24", severity: "high" },
  { time: "14:18:42", type: "DDoS Attempt", source: "multiple", target: "web-server-01", severity: "critical" },
  { time: "14:15:33", type: "Unusual Traffic", source: "172.16.0.23", target: "external", severity: "medium" },
  { time: "14:12:18", type: "Failed Auth", source: "10.0.0.99", target: "ssh://db-primary", severity: "medium" },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "critical": return "text-critical"
    case "high": return "text-warning"
    case "medium": return "text-accent"
    case "low": return "text-success"
    default: return "text-muted-foreground"
  }
}

const getRiskBadgeVariant = (risk: string) => {
  switch (risk) {
    case "critical": return "destructive"
    case "high": return "destructive"
    case "medium": return "secondary"
    case "low": return "outline"
    default: return "outline"
  }
}

export default function Network() {
  const [timeRange, setTimeRange] = useState("24h")
  const [filterProtocol, setFilterProtocol] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Network Monitor</h1>
          <p className="text-muted-foreground">Real-time network traffic analysis and threat detection</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Throughput"
          value="4.2 GB/s"
          change={{ value: "+12% from yesterday", type: "increase" }}
          icon={Activity}
          variant="success"
        />
        <MetricCard
          title="Active Connections"
          value="8,247"
          change={{ value: "+5% from yesterday", type: "increase" }}
          icon={NetworkIcon}
          variant="default"
        />
        <MetricCard
          title="Anomalies Detected"
          value="23"
          change={{ value: "+8 in last hour", type: "increase" }}
          icon={AlertTriangle}
          variant="warning"
        />
        <MetricCard
          title="Blocked IPs"
          value="156"
          change={{ value: "+12 today", type: "increase" }}
          icon={Shield}
          variant="critical"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="threats">Threat Detection</TabsTrigger>
          <TabsTrigger value="topology">Network Map</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Network Traffic (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockNetworkData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="time" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Area type="monotone" dataKey="inbound" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.3)" />
                    <Area type="monotone" dataKey="outbound" stackId="1" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary) / 0.3)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Protocol Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockProtocolData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ protocol, value }) => `${protocol}: ${value}%`}
                    >
                      {mockProtocolData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Top Network Talkers
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by IP or hostname..." 
                    className="pl-8 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Hostname</TableHead>
                    <TableHead>Inbound</TableHead>
                    <TableHead>Outbound</TableHead>
                    <TableHead>Connections</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTopTalkers.map((host, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{host.ip}</TableCell>
                      <TableCell>{host.hostname}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {host.inbound}
                      </TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Upload className="h-3 w-3" />
                        {host.outbound}
                      </TableCell>
                      <TableCell>{host.connections.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getRiskBadgeVariant(host.risk)} className={getRiskColor(host.risk)}>
                          {host.risk.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Analysis Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={filterProtocol} onValueChange={setFilterProtocol}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Protocols</SelectItem>
                    <SelectItem value="https">HTTPS</SelectItem>
                    <SelectItem value="http">HTTP</SelectItem>
                    <SelectItem value="ssh">SSH</SelectItem>
                    <SelectItem value="dns">DNS</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Source IP range..." />
                <Input placeholder="Destination IP range..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bandwidth Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockNetworkData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="time" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inbound" fill="hsl(var(--primary))" name="Inbound (Mbps)" />
                  <Bar dataKey="outbound" fill="hsl(var(--secondary))" name="Outbound (Mbps)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Recent Network Anomalies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Threat Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAnomalies.map((anomaly, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{anomaly.time}</TableCell>
                      <TableCell>{anomaly.type}</TableCell>
                      <TableCell className="font-mono">{anomaly.source}</TableCell>
                      <TableCell className="font-mono">{anomaly.target}</TableCell>
                      <TableCell>
                        <Badge variant={getRiskBadgeVariant(anomaly.severity)} className={getRiskColor(anomaly.severity)}>
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topology" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Topology</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <NetworkIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Interactive Network Map</p>
                  <p className="text-muted-foreground">Real-time visualization of network topology and connections</p>
                </div>
                <Button>Enable Network Discovery</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}