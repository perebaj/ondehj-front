import { Copy } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

import { Button } from '@/components/ui/button'
import {
  // Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function Billing() {
  return (
    <DialogContent className="max-w-xs lg:max-w-2xl">
      <DialogHeader>
        <div className="flex flex-col  items-center justify-center gap-2 px-4 py-4">
          <DialogTitle className="text-2xl text-blue-500">
            Código Gerado com sucesso!
          </DialogTitle>
          <DialogDescription>
            O pagamento deve ser realizado até às 23:59 do dia 10/10/2021 antes
            que o código expire.
          </DialogDescription>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 ">
          <p className="flex flex-col items-center justify-center py-2 text-3xl">
            <span className=" font-extrabold  text-green-500">R$ 30,00</span>{' '}
            <span className="">
              Acesso <span className="font-extrabold">ilimitado!</span>
            </span>
          </p>
          <QRCodeSVG className="h-64 w-64" value="https://reactjs.org/" />
          <div className="pt-8">
            <Button
              variant={'outline'}
              className="gap-2 bg-green-500 text-white hover:bg-green-600"
            >
              Copiar código
              <Copy strokeWidth={2} size={18} />
            </Button>
          </div>
        </div>
      </DialogHeader>
      <DialogFooter></DialogFooter>
    </DialogContent>
  )
}
