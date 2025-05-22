"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Star, CheckCircle, Calendar, TrendingUp, X, Search, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ScorecardPage() {
  const router = useRouter()

  // Données fictives pour le scorecard
  const scoreData = {
    score: 87,
    taskName: "Deliver 500kg oats",
    feedback: "Your timely delivery of the shipment to your reliability and dedication",
    reviewer: "Mark Wood",
    rating: 4,
    metrics: [
      { name: "Task completion", value: 95, status: "good" },
      { name: "Punctuality", value: 90, status: "good" },
      { name: "Customer satisfaction", value: 85, status: "good" },
      { name: "Documentation", value: 80, status: "average" },
    ],
    recentTasks: [
      {
        id: "1",
        name: "Deliver 500kg oats",
        date: "15 mai 2025",
        score: 87,
        status: "completed",
      },
      {
        id: "2",
        name: "Transport 3 passengers",
        date: "12 mai 2025",
        score: 92,
        status: "completed",
      },
      {
        id: "3",
        name: "Deliver furniture",
        date: "8 mai 2025",
        score: 78,
        status: "completed",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-white p-3 text-center text-sm text-gray-700 shadow-sm">
        <p>+33 09 80 40 04 84 | Du lundi au vendredi, de 09h à 18h</p>
      </header>

      <nav className="bg-[#1a2533] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/home")}
              className="mr-2 text-white hover:bg-[#2a3545]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-xl font-bold">
              <span className="text-[#c3e600]">autocar</span>
              <span className="text-white">-location.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#2a3545]">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-[#2a3545]">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-4">
        {/* Success notification */}
        <div className="mb-4 flex items-center justify-between rounded-md bg-[#f0f8e0] p-3 pr-2">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-[#c3e600]" />
            <span className="text-sm text-[#1a2533]">Task completed successfully</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#1a2533]">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Main score card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="mb-2">
              <Badge variant="outline" className="bg-[#f0f8e0] text-[#1a2533] border-[#c3e600]">
                Task completed
              </Badge>
            </div>

            <h2 className="mb-6 text-xl font-bold">{scoreData.taskName}</h2>

            <div className="mb-6 flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r from-[#f0f8e0] to-[#e8f4cc]">
                <div className="absolute h-32 w-32 rounded-full bg-white"></div>
                <div className="relative text-center">
                  <span className="text-5xl font-bold text-[#1a2533]">{scoreData.score}</span>
                  <span className="text-sm text-gray-500">/100</span>
                </div>
              </div>
            </div>

            <div className="mb-4 text-center">
              <Badge className="bg-[#f0f8e0] text-[#1a2533] border-[#c3e600]">Good score</Badge>
            </div>

            <div className="mb-6 space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Based on task completion</p>
                <p className="text-sm text-gray-600">Performance and time management</p>
              </div>

              <p className="text-center font-medium">{scoreData.feedback}</p>
            </div>

            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < scoreData.rating ? "fill-[#c3e600] text-[#c3e600]" : "text-gray-300"}`}
                />
              ))}
            </div>

            <p className="mt-2 text-center text-sm text-gray-600">{scoreData.reviewer}</p>
          </CardContent>
        </Card>

        {/* Performance metrics */}
        <h3 className="mb-3 font-semibold text-[#1a2533]">Performance Metrics</h3>
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-4">
              {scoreData.metrics.map((metric, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm">{metric.name}</span>
                    <span
                      className={`text-sm font-medium ${
                        metric.status === "good"
                          ? "text-[#1a2533]"
                          : metric.status === "average"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full ${
                        metric.status === "good"
                          ? "bg-[#c3e600]"
                          : metric.status === "average"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent tasks */}
        <h3 className="mb-3 font-semibold text-[#1a2533]">Recent Tasks</h3>
        <div className="space-y-3">
          {scoreData.recentTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{task.name}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {task.date}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f8e0] text-sm font-medium text-[#1a2533]">
                      {task.score}
                    </div>
                    <TrendingUp
                      className={`h-4 w-4 ${
                        task.score >= 85 ? "text-[#c3e600]" : task.score >= 70 ? "text-yellow-500" : "text-red-500"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
