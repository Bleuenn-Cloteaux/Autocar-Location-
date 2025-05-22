"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Car,
  Phone,
  MessageSquare,
  CheckCircle,
  Navigation2,
  Users,
  Search,
  Bell,
} from "lucide-react"

export default function MissionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [missionStatus, setMissionStatus] = useState("pending") // pending, en_route, arrived, completed

  // Modifions les données fictives pour inclure le nombre de passagers
  const missionData = {
    id: "current",
    date: "17 mai 2025",
    time: "15:00",
    location: "45 Rue de Rivoli, Paris",
    passengerType: "Standard",
    passengerCount: 1,
    vehicle: "Tesla Model 3 - AB-123-CD - Autonomie: 350km",
  }

  const handleStartMission = () => {
    setMissionStatus("en_route")
  }

  const handleArrived = () => {
    setMissionStatus("arrived")
  }

  // Modifions la fonction handleNavigate pour rediriger vers la page de navigation
  const handleNavigate = () => {
    router.push(`/navigation/${params.id}`)
  }

  const handleCallClient = () => {
    // In a real app, this would initiate a call
    alert("Cette fonctionnalité appellerait le client")
  }

  const handleContactSupport = () => {
    // In a real app, this would open the support chat
    alert("Cette fonctionnalité ouvrirait le chat avec le support")
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
              onClick={() => router.push("/dashboard")}
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
        <div className="mb-4">
          <div className="mb-2 flex items-center">
            <div
              className={`mr-2 h-3 w-3 rounded-full ${
                missionStatus === "pending"
                  ? "bg-orange-500"
                  : missionStatus === "en_route"
                    ? "bg-[#c3e600]"
                    : "bg-green-500"
              }`}
            ></div>
            <span className="font-medium">
              {missionStatus === "pending"
                ? "En attente"
                : missionStatus === "en_route"
                  ? "En route"
                  : missionStatus === "arrived"
                    ? "Sur place"
                    : "Terminée"}
            </span>
          </div>

          <div className="relative h-2 w-full rounded-full bg-gray-200">
            <div
              className={`absolute left-0 top-0 h-full rounded-full ${
                missionStatus === "pending"
                  ? "w-1/4 bg-orange-500"
                  : missionStatus === "en_route"
                    ? "w-2/4 bg-[#c3e600]"
                    : missionStatus === "arrived"
                      ? "w-3/4 bg-green-500"
                      : "w-full bg-green-500"
              }`}
            ></div>
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Lieu de prise en charge</p>
                  <p className="text-sm text-gray-600">123 Avenue des Champs-Élysées, Paris</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Heure de prise en charge</p>
                  <p className="text-sm text-gray-600">17 mai 2025 à 13:30</p>
                </div>
              </div>

              {/* Modifions l'affichage des détails de la mission pour inclure le nombre de passagers */}
              <div className="flex items-start">
                {missionData.passengerCount > 1 ? (
                  <Users className="mr-2 h-5 w-5 text-gray-500" />
                ) : (
                  <User className="mr-2 h-5 w-5 text-gray-500" />
                )}
                <div>
                  <p className="font-medium">Passager</p>
                  <p className="text-sm text-gray-600">
                    {missionData.passengerType} -{" "}
                    {missionData.passengerCount === 1
                      ? "1 personne"
                      : `Groupe de ${missionData.passengerCount} personnes`}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Car className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Véhicule affecté</p>
                  <p className="text-sm text-gray-600">Tesla Model 3 - AB-123-CD</p>
                </div>
              </div>
            </div>

            {missionStatus === "pending" && (
              <div className="mt-6">
                <p className="mb-2 text-center font-medium text-orange-600">Vous devez partir dans 35 minutes</p>
                <Button onClick={handleStartMission} className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]">
                  Valider le départ
                </Button>
              </div>
            )}

            {missionStatus === "en_route" && (
              <div className="mt-6">
                <p className="mb-2 text-center font-medium text-[#1a2533]">Temps estimé d&apos;arrivée : 15 minutes</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]"
                    onClick={handleArrived}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Arrivé
                  </Button>
                  <Button className="flex-1 bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]" onClick={handleNavigate}>
                    <Navigation2 className="mr-2 h-4 w-4" />
                    Naviguer
                  </Button>
                </div>
              </div>
            )}

            {missionStatus === "arrived" && (
              <div className="mt-6">
                <p className="mb-2 text-center font-medium text-green-600">Vous êtes arrivé à destination</p>
                <Button
                  className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                  onClick={() => setMissionStatus("completed")}
                >
                  GO
                </Button>
              </div>
            )}

            {missionStatus === "completed" && (
              <div className="mt-6">
                <p className="mb-2 text-center font-medium text-green-600">Mission terminée avec succès</p>
                <Button
                  className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                  onClick={() => router.push("/dashboard")}
                >
                  Retour au tableau de bord
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="flex items-center justify-center border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]"
            onClick={handleCallClient}
          >
            <Phone className="mr-2 h-4 w-4" />
            Appeler le client
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]"
            onClick={handleContactSupport}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contacter le support
          </Button>
        </div>
      </main>
    </div>
  )
}
