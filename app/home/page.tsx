"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Bell, Search, MoreHorizontal, ChevronDown, Clock, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const router = useRouter()

  // Données fictives pour les missions
  const currentTask = {
    id: "current",
    vehicle: "Mini van 03",
    timeLeft: "4 Hr 10 mins",
    location: "45 Rue de Rivoli, Paris",
    status: "en_cours",
  }

  const upcomingTask = {
    id: "upcoming",
    vehicle: "Mini van 05",
    timeLeft: "4 Hr 10 mins",
    location: "15 Avenue Montaigne, Paris",
    status: "a_venir",
  }

  const recentTasks = [
    {
      id: "1",
      vehicle: "Toyota 9382",
      date: "Lundi, 6 sept",
      taskId: "1929120",
      clientId: "233561",
      distance: "293 km",
      duration: "2h 30m",
      status: "completed",
      completion: "90%",
    },
    {
      id: "2",
      vehicle: "Toyota 9382",
      timeLeft: "2h 23m",
      taskId: "1929120",
      clientId: "233561",
      status: "en_cours",
    },
  ]

  const handleTaskDetails = (taskId: string) => {
    router.push(`/mission/${taskId}`)
  }

  const handleNavigate = (taskId: string) => {
    router.push(`/navigation/${taskId}`)
  }

  const handleViewAll = () => {
    router.push("/dashboard")
  }

  const handleViewScorecard = () => {
    router.push("/scorecard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-white p-3 text-center text-sm text-gray-700 shadow-sm">
        <p>+33 09 80 40 04 84 | Du lundi au vendredi, de 09h à 18h</p>
      </header>

      <nav className="bg-[#1a2533] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-[#2a3545]">
              <Menu className="h-5 w-5" />
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

      <div className="flex flex-col">
        <div className="relative h-40 w-full bg-gray-300">
          {/* Image de fond - autocar */}
          <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-at9FktvRN9NKnGf1kOKjtMWAVLXzPQ.png')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a2533]/70"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-2xl font-bold text-white">Current Location</h1>
            <div className="flex items-center text-white">
              <span className="font-medium">Paris, France</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Current Task */}
          <Card className="bg-[#1a2533] text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium uppercase">Current Task</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-[#2a3545]">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <h2 className="text-xl font-bold mb-1">{currentTask.vehicle}</h2>
              <div className="flex items-center mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{currentTask.timeLeft} left</span>
              </div>

              <Button
                className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                onClick={() => handleTaskDetails(currentTask.id)}
              >
                Task details
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Task */}
          <Card className="border-yellow-400">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium uppercase text-yellow-500">Upcoming Task</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <h2 className="text-xl font-bold mb-1">{upcomingTask.vehicle}</h2>
              <div className="flex items-center mb-4">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-600">{upcomingTask.timeLeft} left</span>
              </div>

              <Button variant="outline" className="w-full" onClick={() => handleTaskDetails(upcomingTask.id)}>
                Task details
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Recent task</h3>
          <Button variant="link" className="text-sm text-[#1a2533]" onClick={handleViewAll}>
            View all
          </Button>
        </div>

        {/* Recent Tasks */}
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{task.vehicle}</h3>
                    {task.status === "completed" && (
                      <div className="h-6 w-16 bg-gradient-to-r from-[#e8f4cc] to-[#c3e600] rounded-full">
                        <div className="text-xs text-right pr-1 font-medium text-[#1a2533]">{task.completion}</div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{task.date || (task.timeLeft && `${task.timeLeft} left`)}</span>
                    </div>

                    <div className="flex items-center justify-end">
                      <span className="text-xs text-gray-500 mr-1">#</span>
                      <span className="text-sm">{task.taskId}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-1">#</span>
                      <span className="text-sm">{task.clientId}</span>
                    </div>

                    {task.distance && (
                      <div className="flex items-center justify-end">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm">{task.distance}</span>
                      </div>
                    )}

                    {task.duration && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm">{task.duration}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {task.status === "completed" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]"
                        >
                          <span className="mr-1">✓</span> Completed
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-[#1a2533]"
                          onClick={() => handleTaskDetails(task.id)}
                        >
                          Details <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                        onClick={() => handleNavigate(task.id)}
                      >
                        View details
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scorecard Preview */}
        <div className="mt-6">
          <Card className="bg-gradient-to-r from-[#f0f8e0] to-[#e8f4cc] border-[#c3e600]/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-[#1a2533]">Your Performance</h3>
                <Badge variant="outline" className="bg-white border-[#c3e600] text-[#1a2533]">
                  This Week
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overall Score</p>
                  <p className="text-2xl font-bold text-[#1a2533]">
                    87<span className="text-sm font-normal">/100</span>
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]"
                  onClick={handleViewScorecard}
                >
                  View Scorecard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      {/* Bouton CRM */}
<div className="text-center mt-6">
<Button
            onClick={() => router.push("/crm")}
            className="[#c3e600] text-white hover:bg-[#a8c700]"
>
            Accéder au CRM (test)
</Button>
</div>
</main>
 
      <footer className="bg-white p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
<div className="grid grid-cols-4 gap-2">
<Button variant="ghost" className="flex flex-col items-center justify-center h-auto py-2 text-[#1a2533]" onClick={() => router.push("/home")}>
<div className="h-5 w-5 mb-1 text-[#c3e600]">🏠</div>
<span className="text-xs">Home</span>
</Button>
<Button variant="ghost" className="flex flex-col items-center justify-center h-auto py-2 text-[#1a2533]" onClick={() => router.push("/dashboard")}>
<Calendar className="h-5 w-5 mb-1" />
<span className="text-xs">Missions</span>
</Button>
<Button variant="ghost" className="flex flex-col items-center justify-center h-auto py-2 text-[#1a2533]" onClick={() => router.push("/map")}>
<MapPin className="h-5 w-5 mb-1" />
<span className="text-xs">Map</span>
</Button>
<Button variant="ghost" className="flex flex-col items-center justify-center h-auto py-2 text-[#1a2533]" onClick={() => router.push("/profile")}>
<div className="h-5 w-5 mb-1">👤</div>
<span className="text-xs">Profile</span>
</Button>
</div>
</footer>
</div>
  )
}