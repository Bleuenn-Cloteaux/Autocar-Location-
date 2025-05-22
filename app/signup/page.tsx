"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    identifier: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState({
    identifier: "",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10}$/

    if (!formData.identifier) {
      newErrors.identifier = "L'identifiant est requis"
      valid = false
    }

    if (!formData.email) {
      newErrors.email = "L'email est requis"
      valid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
      valid = false
    }

    if (!formData.phone) {
      newErrors.phone = "Le téléphone est requis"
      valid = false
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Format de téléphone invalide (10 chiffres)"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 2000)
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
              onClick={() => router.push("/")}
              className="mr-2 text-white hover:bg-[#2a3545]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-xl font-bold">
              <span className="text-[#c3e600]">autocar</span>
              <span className="text-white">-location.com</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#1a2533]">Créer un compte chauffeur</h1>
          <p className="text-gray-600">Renseignez vos informations pour vous inscrire</p>
        </div>

        <Card className="w-full max-w-md border-0 shadow-md">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Identifiant</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  className={errors.identifier ? "border-red-500" : ""}
                />
                {errors.identifier && <p className="text-xs text-red-500">{errors.identifier}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]"
                  disabled={isLoading || isSuccess}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#1a2533] border-t-transparent"></div>
                      Création en cours...
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Compte créé avec succès !
                    </div>
                  ) : (
                    "Créer mon compte"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Vous avez déjà un compte ?</p>
          <Button variant="link" onClick={() => router.push("/")} className="font-semibold text-[#1a2533]">
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  )
}
