'use client'
 
import { useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app'

import {

  collection,

  getDocs,

  getFirestore,

  addDoc

} from 'firebase/firestore'
 
type Contact = {

  nom: string

  email: string

  telephone: string

  statut: string

  dernierContact?: string

  montantPotentiel?: number

  prochaineAction?: string

}
 
const firebaseConfig = {

  apiKey: "AIzaSyCXazEDes5O0_jwLsYlNvFw6UaE0bysj_A",

  authDomain: "autocar-location-6ef69.firebaseapp.com",

  projectId: "autocar-location-6ef69",

  storageBucket: "autocar-location-6ef69.firebasestorage.app",

  messagingSenderId: "948024056804",

  appId: "1:948024056804:web:c984efc9f0a0802c7905f1",

  measurementId: "G-Y3H3JSVJ5G"

}
 
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
 
export default function CRMContactList() {

  const [contacts, setContacts] = useState<Contact[]>([])

  const [newContact, setNewContact] = useState<Contact>({

    nom: '',

    email: '',

    telephone: '',

    statut: ''

  })
 
  useEffect(() => {

    const fetchContacts = async () => {

      const querySnapshot = await getDocs(collection(db, 'contacts'))

      const data = querySnapshot.docs.map(doc => doc.data() as Contact)

      setContacts(data)

    }

    fetchContacts()

  }, [])
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target

    setNewContact(prev => ({ ...prev, [name]: value }))

  }
 
  const handleAddContact = async () => {

    if (!newContact.nom || !newContact.email || !newContact.telephone || !newContact.statut) return

    await addDoc(collection(db, 'contacts'), newContact)

    setContacts(prev => [...prev, newContact])

    setNewContact({ nom: '', email: '', telephone: '', statut: '' })

  }
 
  return (
<div className="max-w-4xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau CRM</h1>
 
      {/* Formulaire d'ajout */}
<div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
<input

          name="nom"

          value={newContact.nom}

          onChange={handleChange}

          placeholder="Nom"

          className="border rounded px-3 py-2"

        />
<input

          name="email"

          value={newContact.email}

          onChange={handleChange}

          placeholder="Email"

          className="border rounded px-3 py-2"

        />
<input

          name="telephone"

          value={newContact.telephone}

          onChange={handleChange}

          placeholder="Téléphone"

          className="border rounded px-3 py-2"

        />
<input

          name="statut"

          value={newContact.statut}

          onChange={handleChange}

          placeholder="Statut"

          className="border rounded px-3 py-2"

        />
<button

          onClick={handleAddContact}

          className="col-span-1 sm:col-span-4 bg-[#a8c700] text-white px-4 py-2 rounded hover:bg-[#a8c700]"
>

          Ajouter le contact
</button>
</div>
 
      {/* Tableau stylisé */}
<table className="min-w-full border rounded-lg overflow-hidden shadow-md bg-white">
<thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
<tr>
<th className="px-4 py-3">Nom</th>
<th className="px-4 py-3">Email</th>
<th className="px-4 py-3">Téléphone</th>
<th className="px-4 py-3">Statut</th>
</tr>
</thead>
<tbody className="text-sm text-gray-700">

          {contacts.map((c, i) => (
<tr key={i} className="border-t hover:bg-gray-50">
<td className="px-4 py-2 font-medium">{c.nom}</td>
<td className="px-4 py-2">{c.email}</td>
<td className="px-4 py-2">{c.telephone}</td>
<td className="px-4 py-2">{c.statut}</td>
</tr>

          ))}
</tbody>
</table>
</div>

  )

}

