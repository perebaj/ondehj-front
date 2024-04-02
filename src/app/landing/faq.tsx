import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQ() {
  return (
    <section id="faq">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-32 md:flex-row">
        <div className="flex basis-1/2 flex-col text-left">
          <p className="mb-4 inline-block text-2xl font-semibold text-primary">
            FAQ
          </p>
          <p className="text-3xl font-extrabold sm:text-4xl">
            Perguntas Frequentes
          </p>
        </div>
        <ul className="basis-1/2">
          <Accordion type="single" collapsible className="text-xl">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-start font-bold text-primary">
                O que é o Onde Hoje?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xl">
                  O Onde Hoje é uma plataforma que reúne todos os eventos
                  esportivos, acadêmicos, culturais e festas da sua universidade
                  em um só lugar.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-start font-bold text-primary">
                Para que público o Onde Hoje é destinado?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xl">
                  O onde hoje é uma tentativa de aproximar os alunos de
                  universidades pelo Brasil, para que eles possam{' '}
                  <span className="font-bold">
                    compartilhar, criar e participar {''}
                  </span>
                  de eventos em suas universidades.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-start font-bold text-primary">
                Como posso compartilhar um evento no onde hoje?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xl">
                  <span className="font-bold">É simples. </span> Basta{' '}
                  <Link
                    href="https://www.instagram.com/ondehoje/"
                    className="font-bold text-primary no-underline hover:underline"
                  >
                    entrar em contato
                  </Link>
                  , passar as informações do evento e pronto!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-start font-bold text-primary">
                É possivel vender ingressos no Onde Hoje?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xl">
                  <span className="font-bold">Não. </span>
                  Por enquanto o Onde Hoje é uma
                  <span className="font-bold">
                    {' '}
                    plataforma de divulgação de eventos.{' '}
                  </span>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ul>
      </div>
    </section>
  )
}
