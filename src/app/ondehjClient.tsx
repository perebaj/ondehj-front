import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OndeHjSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-2 py-16 lg:px-32 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-y-8">
        <h1 className="flex flex-col text-center text-4xl font-bold lg:text-8xl">
          <span className="bg-gradient-to-r from-orange-400 from-20% to-orange-600 to-70% bg-clip-text pb-6 text-transparent">
            Todos os eventos,
          </span>
          <span className="text-slate-900">em um só lugar</span>
        </h1>
        <div>
          <Button size={"lg"} className="bg-primary py-8">
            <Link className="text-sm font-bold lg:text-3xl" href="/events">
              Onde é o rolê hoje?
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
