"use client"
 
import type React from "react"
 
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
 
export default function LoginPage() {
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
  })
 
  useEffect(() => {
    // Simulate splash screen animation
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)
 
    return () => clearTimeout(timer)
  }, [])
 
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
 
    if (!formData.identifier) {
      newErrors.identifier = "Veuillez entrer votre email ou téléphone"
      valid = false
    }
 
    if (!formData.password) {
      newErrors.password = "Veuillez entrer votre mot de passe"
      valid = false
    }
 
    setErrors(newErrors)
    return valid
  }
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
 
    if (validateForm()) {
      // Here you would typically call an API to authenticate the user
      console.log("Login attempt with:", formData)
 
      // For demo purposes, simulate successful login
      router.push("/home")
    }
  }
 
  const goToSignup = () => {
    router.push("/signup")
  }
 
  if (showSplash) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1a2533]">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 h-24 w-24 animate-pulse rounded-full bg-white p-5">
            <div className="flex h-full w-full items-center justify-center rounded-full">
              <span className="text-2xl font-bold text-[#c3e600]">A</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-[#c3e600]">autocar</span>
            <span className="text-white">-location.com</span>
          </h1>
        </div>
      </div>
    )
  }
 
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-white p-3 text-center text-sm text-gray-700 shadow-sm">
        <p>+33 09 80 40 04 84 | Du lundi au vendredi, de 09h à 18h</p>
      </header>
 
      <nav className="bg-[#1a2533] p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="text-xl font-bold">
            <span className="text-[#c3e600]">autocar</span>
            <span className="text-white">-location.com</span>
          </div>
        </div>
      </nav>
 
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1a2533]">Bienvenue</h1>
          <p className="text-gray-600">Connectez-vous à votre compte chauffeur</p>
        </div>
 
        <Card className="w-full max-w-md border-0 shadow-md">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Email ou Téléphone</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Entrez votre email ou téléphone"
                  value={formData.identifier}
                  onChange={handleChange}
                  className={errors.identifier ? "border-red-500" : ""}
                />
                {errors.identifier && <p className="text-sm text-red-500">{errors.identifier}</p>}
              </div>
 
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
 
              <div className="pt-2">
                <Button type="submit" className="w-full bg-[#c3e600] text-[#1a2533] hover:bg-[#a8c700]">
                  Se connecter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
 
        <div className="mt-6 text-center">
          <p className="text-gray-600">Vous n&apos;avez pas de compte ?</p>
          <Button variant="link" onClick={goToSignup} className="font-semibold text-[#1a2533]">
            Créer un compte chauffeur
          </Button>
        </div>
      </div>
 
      <footer className="bg-white p-4 text-center text-sm text-gray-600">
        <div className="mx-auto max-w-6xl">
          <p>© 2025 Autocar-location.com - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}
 
