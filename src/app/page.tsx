'use client'
import { motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div>
      <header className="bg-slate-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-center px-8 py-3">
          <div className="flex lg:flex-1">
            <a href="/" className="flex shrink-0 items-center gap-2">
              <PartyPopper size={28} />
              <span className="text-lg font-bold">Onde Hoje?</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-12">
            <a href="/#pricing" className="no-underline hover:underline">
              Preço
            </a>
            <a
              className="no-underline hover:underline"
              title="FAQ"
              href="/#faq"
            >
              FAQ
            </a>
            <a
              className="no-underline hover:underline"
              title="eventsPage"
              href="/events"
            >
              Eventos
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button size={'sm'}>
              <a href="/events">Entrar</a>
            </Button>
          </div>
        </nav>
      </header>
      <section id="info">
        <div className="relative z-10 mx-auto  flex w-full  flex-col items-center justify-center gap-16 px-0 py-2 lg:gap-20 lg:px-8 lg:py-32">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.0 }}
            transition={{ ease: 'easeOut', duration: 1 }}
          >
            <div className="relative flex flex-col items-center justify-center gap-8 text-center lg:gap-12">
              <h1 className="gap-2 tracking-tight ">
                <span className="max-w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-red-500 to-90% bg-clip-text px-2 text-5xl font-black italic tracking-tight text-transparent lg:text-9xl">
                  Todos os eventos, <span> </span>
                  <br />
                </span>
                <span className="text-4xl lg:text-8xl">
                  em um <span> só lugar</span>
                </span>
              </h1>
              <p className="max-w-72 text-center text-base font-extrabold leading-relaxed text-slate-500 lg:max-w-full lg:text-2xl ">
                <span>
                  Confuso com quantidade de coisas para fazer na sua faculdade?
                </span>
              </p>
              <ul className="max-w-xl space-y-1 text-sm text-slate-500 md:block lg:text-2xl">
                <li className="flex items-center justify-center gap-2 lg:justify-start">
                  <span>🎉</span> Fique por dentro do que está acontecendo
                </li>
                <li className="flex items-center justify-center gap-2 lg:justify-start">
                  <span>📢</span> Promova e compartilhe seus eventos favoritos
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button size={'lg'} className="">
                  <a href="/events" className="text-sm lg:text-base">
                    Onde é o rolê hoje?
                  </a>
                </Button>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* <section id="pricing" className="bg-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-24 md:flex-row">
          <div className=" relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center gap-8  px-8 py-12 lg:gap-12 lg:py-32">
            <div className="absolute inset-0 flex rotate-12 transform ">
              <span
                className="text-shadow border-text  p-4 text-8xl font-bold
              text-red-600"
              >
                De graça até o final de março
              </span>
            </div>
            <h1 className="text-4xl">
              Preço{' '}
              <span className="font-black italic tracking-tight text-primary">
                Único
              </span>{' '}
              <span>e</span>
              <span className="font-black italic tracking-tighter text-primary">
                Transparente
              </span>
            </h1>
            <div>
              <Card className="max-h-7xl mx-auto flex max-w-7xl flex-col items-center text-center shadow-lg">
                <CardHeader>
                  <CardTitle className="text-4xl">R$ 30 no PIX</CardTitle>
                  <CardDescription>
                    Pague{' '}
                    <span className="text-base font-extrabold text-green-600">
                      uma vez,
                    </span>{' '}
                    use para{' '}
                    <span className="text-base font-extrabold text-green-600">
                      sempre
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm lg:text-base">
                    <li className="flex items-center justify-center py-4">
                      <Check size={24} strokeWidth={1} />
                      <span>Acesso a todos os eventos da sua universidade</span>
                    </li>
                    <li className="flex items-center justify-center py-4">
                      <Check size={24} strokeWidth={1} />
                      <span>Promova e crie quantos eventos quiser</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={'outline'}>
                    <a href="/sign-up">Assine Agora</a>
                  </Button>
                </CardFooter>
                <p className="mb-2 mt-2 text-xs text-gray-500">
                  * Pagamento único
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section> */}
      <section id="faq">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-24 md:flex-row">
          <div className="flex basis-1/2 flex-col text-left">
            <p className="mb-4 inline-block font-semibold text-primary">FAQ</p>
            <p className="text-3xl font-extrabold sm:text-4xl">
              Perguntas Frequentes
            </p>
          </div>
          <ul className="basis-1/2">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-start font-bold text-primary">
                  O que é o Onde Hoje?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    O Onde Hoje é uma plataforma que reúne todos os eventos
                    esportivos, acadêmicos, culturais e festas da sua
                    universidade em um só lugar.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-start font-bold text-primary">
                  Para que público o Onde Hoje é destinado?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    O onde hoje é uma tentativa de aproximar os alunos de
                    universidades pelo Brasil, para que eles possam{' '}
                    <span className="font-bold">
                      compartilhar, criar e participar {''}
                    </span>
                    de eventos em suas universidades.
                  </p>
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="item-3">
                <AccordionTrigger className="text-start font-bold text-primary">
                  O Onde Hoje é pago?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    <span className="font-extrabold">
                      De graça até final de março, mas
                    </span>{' '}
                    <span className="font-bold">Sim. </span>
                    <br />O onde hoje cobra uma
                    <span className="font-bold">
                      {' '}
                      um valor único de R$ 30,00,{' '}
                    </span>
                    <span> por usuário. </span>
                    Pague uma vez, use para sempre
                  </p>
                </AccordionContent>
              </AccordionItem> */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-start font-bold text-primary">
                  É possivel vender ingressos no Onde Hoje?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    <span className="font-bold">Não. </span>O Onde Hoje é uma
                    <span className="font-bold">
                      {' '}
                      plataforma de divulgação de eventos,{' '}
                    </span>
                    não é possível vender ingressos diretamente pela plataforma.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ul>
        </div>
      </section>
    </div>
  )
}
