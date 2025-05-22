"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Calendar,
  MapPin,
  Clock,
  User,
  Car,
  CheckCircle,
  Navigation2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

// Modifions les données fictives pour inclure le nombre de passagers
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
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("missions")
  const [currentMonth, setCurrentMonth] = useState(5) // Mai
  const [currentYear, setCurrentYear] = useState(2025)
  const [selectedMission, setSelectedMission] = useState<string | null>(null)
  const router = useRouter()

  // Filtrer les missions par statut
  const currentMission = allMissions.find((mission) => mission.status === "en_cours")
  const upcomingMissions = allMissions.filter((mission) => mission.status === "a_venir")
  const completedMissions = allMissions.filter((mission) => mission.status === "terminee")

  // Fonction pour générer le calendrier du mois
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()

    // Ajuster pour que la semaine commence le lundi (0 = lundi, 6 = dimanche)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1

    const calendar = []
    let dayCounter = 1

    // Noms des jours de la semaine
    const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

    // Ajouter les noms des jours
    calendar.push(
      <div key="weekdays" className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>,
    )

    // Générer les semaines
    for (let i = 0; i < 6; i++) {
      const week = []

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < adjustedFirstDay) || dayCounter > daysInMonth) {
          // Case vide
          week.push(
            <div key={`empty-${i}-${j}`} className="h-20 border border-gray-100 bg-gray-50/50 rounded-md"></div>,
          )
        } else {
          // Filtrer les missions pour ce jour
          const dayMissions = allMissions.filter(
            (mission) => mission.day === dayCounter && mission.month === currentMonth && mission.year === currentYear,
          )

          week.push(
            <div
              key={`day-${dayCounter}`}
              className={`h-20 border rounded-md p-1 overflow-hidden relative ${
                dayCounter === new Date().getDate() &&
                currentMonth === new Date().getMonth() + 1 &&
                currentYear === new Date().getFullYear()
                  ? "border-[#c3e600] bg-[#f0f8e0]"
                  : "border-gray-200"
              }`}
            >
              <div className="text-right mb-1">
                <span className="text-xs font-medium">{dayCounter}</span>
              </div>
              <div className="space-y-1">
                {dayMissions.map((mission) => (
                  <div
                    key={mission.id}
                    onClick={() => setSelectedMission(mission.id === selectedMission ? null : mission.id)}
                    className={`
                      text-xs p-1 rounded cursor-pointer truncate
                      ${
                        mission.status === "en_cours"
                          ? "bg-[#c3e600]/20 text-[#1a2533]"
                          : mission.status === "a_venir"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                      ${selectedMission === mission.id ? "ring-2 ring-offset-1 ring-[#c3e600]" : ""}
                    `}
                  >
                    {mission.time} - {mission.location.split(",")[0]}
                  </div>
                ))}
              </div>
            </div>,
          )

          dayCounter++
        }
      }

      calendar.push(
        <div key={`week-${i}`} className="grid grid-cols-7 gap-1">
          {week}
        </div>,
      )

      // Si on a déjà affiché tous les jours du mois, on arrête
      if (dayCounter > daysInMonth) break
    }

    return calendar
  }

  // Fonction pour naviguer entre les mois
  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction
    let newYear = currentYear

    if (newMonth > 12) {
      newMonth = 1
      newYear++
    } else if (newMonth < 1) {
      newMonth = 12
      newYear--
    }

    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  // Obtenir le nom du mois
  const getMonthName = (month: number) => {
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ]
    return monthNames[month - 1]
  }

  // Trouver la mission sélectionnée
  const missionDetails = selectedMission ? allMissions.find((m) => m.id === selectedMission) : null

  // Modifions la fonction handleNavigate pour rediriger vers la page de navigation
  const handleNavigate = (missionId: string) => {
    router.push(`/navigation/${missionId}`)
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

      <main className="flex-1 p-4">
        <Tabs defaultValue="missions" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="missions" className="data-[state=active]:bg-[#1a2533] data-[state=active]:text-white">
              Missions
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-[#1a2533] data-[state=active]:text-white">
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#1a2533] data-[state=active]:text-white">
              Profil
            </TabsTrigger>
          </TabsList>

          {/* Onglet Missions */}
          <TabsContent value="missions" className="mt-4 space-y-4">
            {/* Mission en cours */}
            {currentMission && (
              <div className="mb-6">
                <h2 className="mb-2 font-semibold text-[#1a2533]">Mission en cours</h2>
                <Card className="border-l-4 border-l-[#c3e600]">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold text-[#1a2533]">Mission active</h3>
                      <span className="rounded-full bg-[#f0f8e0] px-2 py-1 text-xs font-medium text-[#1a2533]">
                        En route
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Lieu de prise en charge</p>
                          <p className="text-sm text-gray-600">{currentMission.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-sm text-gray-600">{currentMission.date}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="mr-2 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Heure</p>
                          <p className="text-sm text-gray-600">{currentMission.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <User className="mr-2 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Passager</p>
                          <p className="text-sm text-gray-600">
                            {currentMission.passengerType} -{" "}
                            {currentMission.passengerCount === 1
                              ? "1 personne"
                              : `Groupe de ${currentMission.passengerCount} personnes`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Car className="mr-2 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Véhicule affecté</p>
                          <p className="text-sm text-gray-600">{currentMission.vehicle}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" className="flex-1 border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Arrivé
                      </Button>
                      <Button
                        className="flex-1 bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                        onClick={() => handleNavigate(currentMission.id)}
                      >
                        <Navigation2 className="mr-2 h-4 w-4" />
                        Naviguer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Missions à venir */}
            <Accordion type="single" collapsible className="mb-4 w-full">
              <AccordionItem value="upcoming-missions" className="border-b-[#c3e600]/30">
                <AccordionTrigger className="py-3 font-semibold text-[#1a2533]">
                  Missions à venir du mois ({upcomingMissions.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {upcomingMissions.map((mission) => (
                      <Card key={mission.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between border-b bg-[#f0f8e0] p-3">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-[#1a2533]" />
                              <span className="font-medium text-[#1a2533]">{mission.date}</span>
                            </div>
                            <span className="text-sm font-medium text-[#1a2533]">{mission.time}</span>
                          </div>
                          <div className="p-3">
                            <div className="mb-2 flex items-start">
                              <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                              <p className="text-sm">{mission.location}</p>
                            </div>
                            <div className="flex items-start">
                              <User className="mr-2 h-4 w-4 text-gray-500" />
                              <p className="text-sm">
                                {mission.passengerType} -{" "}
                                {mission.passengerCount === 1
                                  ? "1 personne"
                                  : `Groupe de ${mission.passengerCount} personnes`}
                              </p>
                            </div>
                            <div className="flex items-start">
                              <Car className="mr-2 h-4 w-4 text-gray-500" />
                              <p className="text-sm">{mission.vehicle}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Missions effectuées */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="completed-missions" className="border-b-[#c3e600]/30">
                <AccordionTrigger className="py-3 font-semibold text-[#1a2533]">
                  Missions effectuées ({completedMissions.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {completedMissions.map((mission) => (
                      <Card key={mission.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between border-b bg-gray-50 p-3">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-gray-600" />
                              <span className="font-medium text-gray-700">{mission.date}</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle2 className="mr-1 h-4 w-4 text-[#c3e600]" />
                              <span className="text-sm font-medium text-[#1a2533]">Terminée</span>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="mb-1 flex items-start">
                              <Clock className="mr-2 h-4 w-4 text-gray-500" />
                              <p className="text-sm">{mission.time}</p>
                            </div>
                            <div className="mb-1 flex items-start">
                              <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                              <p className="text-sm">{mission.location}</p>
                            </div>
                            <div className="flex items-start">
                              <Car className="mr-2 h-4 w-4 text-gray-500" />
                              <p className="text-sm">{mission.vehicle}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Onglet Calendrier */}
          <TabsContent value="calendar" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {/* En-tête du calendrier */}
                <div className="mb-4 flex items-center justify-between">
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-lg font-semibold">
                    {getMonthName(currentMonth)} {currentYear}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Légende */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-[#c3e600]"></div>
                    <span className="text-xs">En cours</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">À venir</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-gray-500"></div>
                    <span className="text-xs">Terminée</span>
                  </div>
                </div>

                {/* Calendrier */}
                <div className="space-y-1">{generateCalendar()}</div>

                {/* Détails de la mission sélectionnée */}
                {missionDetails && (
                  <div className="mt-4 rounded-lg border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Détails de la mission</h3>
                      <Badge
                        variant="outline"
                        className={
                          missionDetails.status === "en_cours"
                            ? "border-[#c3e600] text-[#1a2533] bg-[#f0f8e0]"
                            : missionDetails.status === "a_venir"
                              ? "border-blue-500 text-blue-700 bg-blue-50"
                              : "border-gray-500 text-gray-700 bg-gray-50"
                        }
                      >
                        {missionDetails.status === "en_cours"
                          ? "En cours"
                          : missionDetails.status === "a_venir"
                            ? "À venir"
                            : "Terminée"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        <p className="text-sm">
                          {missionDetails.date} à {missionDetails.time}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                        <p className="text-sm">{missionDetails.location}</p>
                      </div>
                      <div className="flex items-start">
                        <User className="mr-2 h-4 w-4 text-gray-500" />
                        <p className="text-sm">
                          {missionDetails.passengerType} -{" "}
                          {missionDetails.passengerCount === 1
                            ? "1 personne"
                            : `Groupe de ${missionDetails.passengerCount} personnes`}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Car className="mr-2 h-4 w-4 text-gray-500" />
                        <p className="text-sm">{missionDetails.vehicle}</p>
                      </div>
                    </div>

                    {missionDetails.status === "en_cours" && (
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Arrivé
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                          onClick={() => handleNavigate(missionDetails.id)}
                        >
                          <Navigation2 className="mr-2 h-4 w-4" />
                          Naviguer
                        </Button>
                      </div>
                    )}

                    {missionDetails.status === "a_venir" && (
                      <div className="mt-3">
                        <Button
                          size="sm"
                          className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                          onClick={() => router.push(`/mission/${missionDetails.id}`)}
                        >
                          Voir les détails
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Profil */}
          <TabsContent value="profile">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-[#f0f8e0] p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#c3e600] text-2xl font-bold text-[#1a2533]">
                      JD
                    </div>
                  </div>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-gray-600">Chauffeur VTC</p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-medium">Email</span>
                    <span className="text-gray-600">john.doe@example.com</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-medium">Téléphone</span>
                    <span className="text-gray-600">+33 6 12 34 56 78</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-medium">Véhicule principal</span>
                    <span className="text-gray-600">Tesla Model 3</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-medium">Statut</span>
                    <span className="rounded-full bg-[#f0f8e0] px-2 py-1 text-xs font-medium text-[#1a2533]">
                      Actif
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="mt-6 w-full border-[#c3e600] text-[#1a2533] hover:bg-[#f0f8e0]">
                  Modifier mon profil
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={activeTab === "missions" ? "default" : "outline"}
            className={`w-full ${
              activeTab === "missions"
                ? "bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                : "text-[#1a2533] hover:bg-[#f0f8e0]"
            }`}
            onClick={() => setActiveTab("missions")}
          >
            Missions
          </Button>
          <Button
            variant={activeTab === "calendar" ? "default" : "outline"}
            className={`w-full ${
              activeTab === "calendar"
                ? "bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                : "text-[#1a2533] hover:bg-[#f0f8e0]"
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            Calendrier
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "outline"}
            className={`w-full ${
              activeTab === "profile"
                ? "bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                : "text-[#1a2533] hover:bg-[#f0f8e0]"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profil
          </Button>
        </div>
      </footer>
    </div>
  )
}
