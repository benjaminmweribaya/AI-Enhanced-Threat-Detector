import { MetricCard } from "@/components/MetricCard"
import { ThreatBadge } from "@/components/ThreatBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield, Activity, Brain, Network, Clock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

// Mock data for demonstration
const hourlyAlerts = [
  { time: '00:00', alerts: 12 },
  { time: '04:00', alerts: 8 },
  { time: '08:00', alerts: 25 },
  { time: '12:00', alerts: 18 },
  { time: '16:00', alerts: 32 },
  { time: '20:00', alerts: 15 },
]

const threatTypes = [
  { name: 'Malware', value: 35, color: '#ef4444' },
  { name: 'Phishing', value: 25, color: '#f97316' },
  { name: 'DDoS', value: 20, color: '#eab308' },
  { name: 'Intrusion', value: 20, color: '#22c55e' },
]

const recentAlerts = [
  { id: 1, time: '2 min ago', message: 'Suspicious network traffic detected from 192.168.1.45', level: 'critical' as const },
  { id: 2, time: '5 min ago', message: 'Failed login attempts from multiple IPs', level: 'high' as const },
  { id: 3, time: '8 min ago', message: 'Unusual data transfer pattern detected', level: 'medium' as const },
  { id: 4, time: '12 min ago', message: 'Port scan activity identified', level: 'high' as const },
]

export default function Overview() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Overview</h1>
          <p className="text-muted-foreground">Real-time threat detection and system health monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
            <span>System Healthy</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Threats"
          value="23"
          change={{ value: "+15% from last hour", type: "increase" }}
          icon={AlertTriangle}
          variant="critical"
        />
        <MetricCard
          title="Protected Assets"
          value="1,247"
          change={{ value: "3 new this week", type: "increase" }}
          icon={Shield}
          variant="success"
        />
        <MetricCard
          title="Network Activity"
          value="98.2%"
          change={{ value: "+2.1% uptime", type: "increase" }}
          icon={Network}
          variant="default"
        />
        <MetricCard
          title="AI Models Active"
          value="4"
          change={{ value: "All healthy", type: "neutral" }}
          icon={Brain}
          variant="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Threat Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Threats Over Time (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={hourlyAlerts}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="alerts" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Threat Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={threatTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {threatTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {threatTypes.map((type, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="h-3 w-3 rounded-sm" 
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-muted-foreground">{type.name}</span>
                  <span className="font-medium">{type.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Alerts
          </CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                <div className="flex items-start gap-3">
                  <ThreatBadge level={alert.level} />
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Investigate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}