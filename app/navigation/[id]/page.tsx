"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  User,
  ChevronUp,
  ChevronDown,
  Users,
  Search,
  Bell,
} from "lucide-react"

// Données fictives pour les missions (identiques à celles du dashboard)
const allMissions = [
  // Mission en cours
  {
    id: "current",
    date: "17 mai 2025",
    day: 17,
    month: 5,
    year: 2025,
    time: "15:00",
    location: "45 Rue de Rivoli, Paris",
    passengerType: "Standard",
    passengerCount: 1,
    vehicle: "Tesla Model 3 - AB-123-CD - Autonomie: 350km",
    status: "en_cours",
    coordinates: { lat: 48.8566, lng: 2.3522 }, // Coordonnées fictives pour Paris
  },
  // Missions à venir
  {
    id: "1",
    date: "20 mai 2025",
    day: 20,
    month: 5,
    year: 2025,
    time: "09:30",
    location: "15 Avenue Montaigne, Paris",
    passengerType: "VIP",
    passengerCount: 2,
    vehicle: "Tesla Model S - AB-123-CD",
    status: "a_venir",
    coordinates: { lat: 48.8662, lng: 2.3082 },
  },
  {
    id: "2",
    date: "22 mai 2025",
    day: 22,
    month: 5,
    year: 2025,
    time: "14:00",
    location: "Aéroport Charles de Gaulle, Terminal 2E",
    passengerType: "Standard",
    passengerCount: 4,
    vehicle: "Tesla Model 3 - AB-123-CD",
    status: "a_venir",
    coordinates: { lat: 49.0097, lng: 2.5479 },
  },
  {
    id: "3",
    date: "25 mai 2025",
    day: 25,
    month: 5,
    year: 2025,
    time: "18:45",
    location: "Gare de Lyon, Paris",
    passengerType: "PMR",
    passengerCount: 1,
    vehicle: "Tesla Model X - AB-123-CD",
    status: "a_venir",
    coordinates: { lat: 48.8448, lng: 2.3735 },
  },
  // Missions effectuées
  {
    id: "4",
    date: "10 mai 2025",
    day: 10,
    month: 5,
    year: 2025,
    time: "10:15",
    location: "Place de la Concorde, Paris",
    passengerType: "Standard",
    passengerCount: 3,
    vehicle: "Tesla Model 3 - AB-123-CD",
    status: "terminee",
    coordinates: { lat: 48.8656, lng: 2.3212 },
  },
  {
    id: "5",
    date: "8 mai 2025",
    day: 8,
    month: 5,
    year: 2025,
    time: "16:30",
    location: "Tour Eiffel, Paris",
    passengerType: "VIP",
    passengerCount: 2,
    vehicle: "Tesla Model S - AB-123-CD",
    status: "terminee",
    coordinates: { lat: 48.8584, lng: 2.2945 },
  },
  {
    id: "6",
    date: "5 mai 2025",
    day: 5,
    month: 5,
    year: 2025,
    time: "08:00",
    location: "Aéroport d'Orly, Terminal Sud",
    passengerType: "Standard",
    passengerCount: 1,
    vehicle: "Tesla Model 3 - AB-123-CD",
    status: "terminee",
    coordinates: { lat: 48.7262, lng: 2.3652 },
  },
]

export default function NavigationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)
  const [eta, setEta] = useState("15 min")
  const [distance, setDistance] = useState("5.2 km")
  const [voiceGuidance, setVoiceGuidance] = useState(true)
  const [mission, setMission] = useState<any>(null)

  // Récupérer les détails de la mission
  useEffect(() => {
    const missionData = allMissions.find((m) => m.id === params.id)
    if (missionData) {
      setMission(missionData)
    } else {
      // Rediriger vers le dashboard si la mission n'existe pas
      router.push("/dashboard")
    }
  }, [params.id, router])

  // Simuler la navigation
  useEffect(() => {
    if (!mission) return

    const interval = setInterval(() => {
      // Mettre à jour l'ETA et la distance de manière aléatoire pour simuler le mouvement
      const newEta = Math.max(Number.parseInt(eta.split(" ")[0]) - 1, 0)
      setEta(`${newEta} min`)

      const newDistance = Math.max(Number.parseFloat(distance.split(" ")[0]) - 0.2, 0).toFixed(1)
      setDistance(`${newDistance} km`)

      if (newEta === 0 && Number.parseFloat(newDistance) < 0.1) {
        clearInterval(interval)
        // Dans une vraie application, cela déclencherait une notification d'arrivée
        alert("Vous êtes arrivé à destination!")
        router.push(`/mission/${params.id}`)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [eta, distance, mission, params.id, router])

  const handleCallClient = () => {
    // Dans une vraie application, cela initierait un appel
    alert("Cette fonctionnalité appellerait le client")
  }

  const handleContactSupport = () => {
    // Dans une vraie application, cela ouvrirait le chat avec le support
    alert("Cette fonctionnalité ouvrirait le chat avec le support")
  }

  const toggleVoiceGuidance = () => {
    setVoiceGuidance(!voiceGuidance)
  }

  if (!mission) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Chargement...</p>
      </div>
    )
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
              onClick={() => router.push(`/mission/${params.id}`)}
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
        {/* Carte interactive - Dans une vraie application, ce serait une carte Google Maps ou similaire */}
        <div className="h-full min-h-[calc(100vh-13rem)] w-full bg-white p-0">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.95410647963!2d2.2769954081275857!3d48.85883363954136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1652956744960!5m2!1sfr!2sfr`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Overlay d'informations de navigation */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="border-none shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Temps restant</p>
                  <p className="text-xl font-bold">{eta}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="text-xl font-bold">{distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Arrivée</p>
                  <p className="text-xl font-bold">{mission.time}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)} className="rounded-full">
                  {showDetails ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                </Button>
              </div>

              {showDetails && (
                <div className="mt-4 space-y-3 border-t pt-3">
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-sm text-gray-600">{mission.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Heure de prise en charge</p>
                      <p className="text-sm text-gray-600">{mission.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    {mission.passengerCount > 1 ? (
                      <Users className="mr-2 h-5 w-5 text-gray-500" />
                    ) : (
                      <User className="mr-2 h-5 w-5 text-gray-500" />
                    )}
                    <div>
                      <p className="font-medium">Passager</p>
                      <p className="text-sm text-gray-600">
                        {mission.passengerType} -{" "}
                        {mission.passengerCount === 1 ? "1 personne" : `Groupe de ${mission.passengerCount} personnes`}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]"
                      onClick={handleCallClient}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]"
                      onClick={handleContactSupport}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Support
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
