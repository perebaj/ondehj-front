'use client'
import { usePathname, useRouter } from 'next/navigation' // Importando hooks corretos para usar URL
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const universities = ['UFScar', 'USP São Carlos', 'Unicamp', 'USP São Paulo']

export default function UniFilterClient() {
  const router = useRouter()
  const pathname = usePathname()
  const [university, setUniversity] = useState('')

  // Atualizar o valor da universidade com base no parâmetro da URL
  useEffect(() => {
    const pathUniversity = pathname.split('/')[2] // Extrair o valor da URL
    if (pathUniversity && universities.includes(pathUniversity)) {
      setUniversity(pathUniversity)
    }
  }, [pathname])

  const handleUniversityChange = (value: string) => {
    setUniversity(value)
    if (value) {
      router.replace(`/events/${value}`) // Navegar sem perder o estado
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
      <Select onValueChange={handleUniversityChange} value={university}>
        <SelectTrigger className="mx-auto w-full max-w-xs">
          <SelectValue placeholder="Selecione uma universidade" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          <SelectScrollUpButton />
          {universities.map((uni) => (
            <SelectItem key={uni} value={uni}>
              {uni}
            </SelectItem>
          ))}
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    </div>
  )
}
