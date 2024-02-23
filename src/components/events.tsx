'use client'
import Event from '@/components/event'
import EventForms from '@/components/eventForms'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
export default function Events() {
  const bodyText = `
  Estão preparados para o role mais animado da semana de recepção????? Te esperamos na QUIMI REMEXE MUITO!!!

  🔥Fiquem atentos no nosso insta para acompanhar todas as novidades: @roles_da_química_ccq 🔥

  DATA: 29/02 às 16h

  OPEN
  • COROTE SABORES
  • VODKA
  • ENERGÉTICO
  • REFRI
  • ÁGUA

  BOOMS
  • TEQUILA 🧊
  • Pina Colada 🍹

  ATRAÇÕES
  • DJ GUMPIN
  • DJ Rick
  • Pagoderia

  ⛔ ATENÇÃO: HAVERÁ VENDA DE CHOPP 🍻 NO ROLÊ

  Então não pastela e já garanta o seu ingresso no precinho!!

  💸 LOTE BIXO: R$ 15,00
  💸 PRIMEIRO LOTE: R$ 21,00

  Compre sem taxa com um dos nossos promoters:

  Figs: https://wa.me/qr/QQYAF7C7HADNM1

  Fisk: https://wa.me/qr/Y44S3ZPCYNJ6O1

  Miranha: https://wa.me/qr/GISQMR2TKPUIB1

  Fuleco: https://wa.me/qr/ZVSCMF645WU6G1

  Ou direto pelo nosso site: https://cheers.com.br/evento/quimi-remexe-muito-13907
  `

  return (
    <div className="w-full py-10 lg:py-14">
      <div className="container grid items-center gap-4 px-4 py-4 text-center md:px-6 md:py-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            Próximos Eventos
          </h1>
          <p className="mx-auto max-w-[700px] py-4 text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Descubra e participe de eventos que acontecem no seu campus.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Criar Novo Evento</Button>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault()
              }}
              className="max-w-xs lg:max-w-2xl"
            >
              <DialogHeader>
                <DialogTitle>Criar Novo Evento</DialogTitle>
                <DialogDescription>
                  Preencha e compartilhe um novo evento com o seu campus.
                </DialogDescription>
              </DialogHeader>
              <EventForms />
              <DialogClose asChild></DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="container grid max-w-6xl justify-center gap-4 px-4 py-4 md:px-6 md:py-6">
        <div className="grid grid-cols-1 items-stretch justify-center gap-4 md:grid-cols-2">
          <Event
            date={Date.now()}
            description={bodyText}
            name="QUIMI REMEXE MUITO"
            instagramURL="https://www.instagram.com/repmoscou/"
            type="social"
          />
          <Event
            date={Date.now()}
            description="Descrição"
            name="Festa meteorica avassaladora open 192 horas na Moscou"
            instagramURL="https://www.instagram.com/repmoscou/"
            type="academico"
          />
          <Event
            date={Date.now()}
            description="Descrição"
            name="Festa na Moscou"
            instagramURL="https://www.instagram.com/repmoscou/"
            type="esportivo"
          />
          <Event
            date={Date.now()}
            description="Descrição"
            name="Festa na Moscou"
            instagramURL="https://www.instagram.com/repmoscou/"
            type="cultural"
          />
        </div>
      </div>
    </div>
  )
}
