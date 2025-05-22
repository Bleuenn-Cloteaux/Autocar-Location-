"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Navigation, MapPin, Search, Bell } from "lucide-react"

export default function MapPage() {
  const router = useRouter()

  // Données fictives pour les points sur la carte
  const mapPoints = [
    {
      id: "1",
      name: "Kazipara, Pakar matha",
      type: "pickup",
      time: "10:30",
    },
    {
      id: "2",
      name: "Mirpur 10, 1216",
      type: "dropoff",
      time: "11:15",
    },
  ]

  const handleNavigate = () => {
    router.push("/navigation/current")
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

      <main className="relative flex-1">
        {/* Map container */}
        <div className="h-full min-h-[calc(100vh-8rem)] w-full bg-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.95410647963!2d2.2769954081275857!3d48.85883363954136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1652956744960!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Map points overlay - in a real app these would be positioned on the map */}
          <div className="absolute left-1/4 top-1/3 z-10">
            <div className="rounded-md bg-[#c3e600] px-2 py-1 text-xs text-[#1a2533]">{mapPoints[0].name}</div>
          </div>

          <div className="absolute bottom-1/3 right-1/4 z-10">
            <div className="rounded-md bg-[#1a2533] px-2 py-1 text-xs text-white">{mapPoints[1].name}</div>
          </div>

          {/* Route line - this would be a proper SVG path in a real app */}
          <div className="absolute left-1/4 right-1/4 top-1/3 z-0 border-b-4 border-[#c3e600] transform rotate-45"></div>
        </div>

        {/* Bottom action card */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="border-none shadow-lg">
            <CardContent className="p-4">
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f8e0] text-[#1a2533]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{mapPoints[0].name}</p>
                      <p className="text-xs text-gray-500">Pickup location</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{mapPoints[0].time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[#1a2533]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{mapPoints[1].name}</p>
                      <p className="text-xs text-gray-500">Drop-off location</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{mapPoints[1].time}</span>
                </div>
              </div>

              <Button className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]" onClick={handleNavigate}>
                <Navigation className="mr-2 h-4 w-4" />
                Start Navigation
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
