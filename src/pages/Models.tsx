import { useState } from "react"
import { MetricCard } from "@/components/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Brain, TrendingUp, Activity, AlertTriangle, PlayCircle, Pause, RotateCcw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface ModelVersion {
  id: string
  name: string
  version: string
  type: "SeqAnomTransformer" | "LogBERT-lite"
  stage: "Development" | "Staging" | "Production"
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  lastTrained: string
  deployedAt?: string
  status: "active" | "inactive" | "training"
  trainingTime: string
  datasetSize: number
}

const mockModels: ModelVersion[] = [
  {
    id: "model-001",
    name: "Network Anomaly Detector",
    version: "v2.1.3",
    type: "SeqAnomTransformer",
    stage: "Production",
    accuracy: 94.2,
    precision: 92.8,
    recall: 95.1,
    f1Score: 93.9,
    lastTrained: "2024-01-15T14:30:00Z",
    deployedAt: "2024-01-16T09:00:00Z",
    status: "active",
    trainingTime: "2h 45m",
    datasetSize: 2500000
  },
  {
    id: "model-002", 
    name: "Log Pattern Analyzer",
    version: "v1.8.7",
    type: "LogBERT-lite",
    stage: "Production",
    accuracy: 91.7,
    precision: 89.3,
    recall: 93.2,
    f1Score: 91.2,
    lastTrained: "2024-01-14T11:15:00Z",
    deployedAt: "2024-01-14T16:30:00Z",
    status: "active",
    trainingTime: "1h 32m",
    datasetSize: 1800000
  },
  {
    id: "model-003",
    name: "Network Anomaly Detector",
    version: "v2.2.0-beta",
    type: "SeqAnomTransformer", 
    stage: "Staging",
    accuracy: 95.1,
    precision: 94.2,
    recall: 96.0,
    f1Score: 95.1,
    lastTrained: "2024-01-19T20:45:00Z",
    status: "inactive",
    trainingTime: "3h 12m",
    datasetSize: 3200000
  },
  {
    id: "model-004",
    name: "Advanced Log Analyzer",
    version: "v2.0.0-alpha",
    type: "LogBERT-lite",
    stage: "Development",
    accuracy: 88.5,
    precision: 86.1,
    recall: 90.3,
    f1Score: 88.2,
    lastTrained: "2024-01-20T08:00:00Z",
    status: "training",
    trainingTime: "Ongoing...",
    datasetSize: 950000
  }
]

// Mock performance data
const performanceData = [
  { date: '2024-01-01', accuracy: 92.1, precision: 90.5, recall: 93.2 },
  { date: '2024-01-08', accuracy: 93.4, precision: 91.8, recall: 94.1 },
  { date: '2024-01-15', accuracy: 94.2, precision: 92.8, recall: 95.1 },
  { date: '2024-01-20', accuracy: 94.1, precision: 92.6, recall: 95.0 },
]

const alertsData = [
  { model: 'Network v2.1.3', alerts: 156 },
  { model: 'Log v1.8.7', alerts: 89 },
  { model: 'Network v2.2.0', alerts: 12 },
  { model: 'Log v2.0.0', alerts: 5 }
]

const stageColors = {
  "Production": "bg-success text-white",
  "Staging": "bg-warning text-white", 
  "Development": "bg-info text-white"
}

const statusColors = {
  "active": "bg-success text-white",
  "inactive": "bg-muted text-muted-foreground",
  "training": "bg-info text-white animate-pulse"
}

export default function Models() {
  const [models] = useState<ModelVersion[]>(mockModels)
  const [retrainDialogOpen, setRetrainDialogOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<ModelVersion | null>(null)

  const activeModels = models.filter(m => m.status === "active").length
  const productionModels = models.filter(m => m.stage === "Production").length
  const avgAccuracy = models.filter(m => m.stage === "Production").reduce((acc, m) => acc + m.accuracy, 0) / productionModels || 0

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Models</h1>
          <p className="text-muted-foreground">Manage and monitor machine learning models</p>
        </div>
        <Dialog open={retrainDialogOpen} onOpenChange={setRetrainDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-cyber shadow-cyber">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retrain Model
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Retrain Model</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Model Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="network">Network Anomaly Detector</SelectItem>
                    <SelectItem value="log">Log Pattern Analyzer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Time Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select training data range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Start Training</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Model Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Models" 
          value={activeModels}
          icon={Brain}
          variant="success"
        />
        <MetricCard
          title="Production Models"
          value={productionModels}
          icon={PlayCircle}
          variant="default"
        />
        <MetricCard
          title="Avg Accuracy"
          value={`${avgAccuracy.toFixed(1)}%`}
          change={{ value: "+2.1% this week", type: "increase" }}
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Alerts Generated"
          value="262"
          change={{ value: "+18% today", type: "increase" }}
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Model Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[85, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Accuracy"
                />
                <Line 
                  type="monotone" 
                  dataKey="precision" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Precision"
                />
                <Line 
                  type="monotone" 
                  dataKey="recall" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  name="Recall"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts by Model */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Alerts by Model (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={alertsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="model" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
                <Bar dataKey="alerts" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Models List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Model Versions</h2>
        <div className="grid gap-4">
          {models.map((model) => (
            <Card key={model.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{model.name}</h3>
                      <Badge variant="outline">{model.version}</Badge>
                      <Badge className={stageColors[model.stage]}>
                        {model.stage}
                      </Badge>
                      <Badge className={statusColors[model.status]}>
                        {model.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Accuracy</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={model.accuracy} className="flex-1" />
                          <span className="text-sm font-medium">{model.accuracy}%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Precision</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={model.precision} className="flex-1" />
                          <span className="text-sm font-medium">{model.precision}%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Recall</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={model.recall} className="flex-1" />
                          <span className="text-sm font-medium">{model.recall}%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">F1 Score</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={model.f1Score} className="flex-1" />
                          <span className="text-sm font-medium">{model.f1Score}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <Label className="text-xs">Last Trained</Label>
                        <p>{formatDate(model.lastTrained)}</p>
                      </div>
                      {model.deployedAt && (
                        <div>
                          <Label className="text-xs">Deployed</Label>
                          <p>{formatDate(model.deployedAt)}</p>
                        </div>
                      )}
                      <div>
                        <Label className="text-xs">Training Time</Label>
                        <p>{model.trainingTime}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Dataset Size</Label>
                        <p>{formatNumber(model.datasetSize)} samples</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {model.stage === "Staging" && (
                      <Button variant="outline" size="sm">
                        Promote to Production
                      </Button>
                    )}
                    {model.status === "active" ? (
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                    ) : model.status === "inactive" ? (
                      <Button variant="outline" size="sm">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Activate
                      </Button>
                    ) : null}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}