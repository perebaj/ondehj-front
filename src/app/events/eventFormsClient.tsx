"use client";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "@/lib/mongodb/db";
import { deleteEvent, editEvent, saveEvent } from "@/lib/mongodb/events";
import { getUserById } from "@/lib/mongodb/user";
import { cn } from "@/lib/utils";

const universities = ["UFScar", "USP São Carlos", "USP São Paulo", "Unicamp"];

import { EventProps } from "./event";
const formSchema = z.object({
  name: z.string().min(1, "Nome do evento é obrigatório"),
  description: z.string().min(1, "Descrição do evento é obrigatória"),
  eventDate: z.date({ required_error: "Data do evento é obrigatória" }),
  instagramURL: z
    .string()
    .regex(
      /^https:\/\/www\.instagram\.com\/.*\/$/,
      "A url do instagram deve ser algo como https://www.instagram.com/usuario/",
    )
    .optional()
    .or(z.string().length(0)),
  type: z.string(),
  university: z.string(),
});
export default function EventForms(props: {
  defaultValues?: EventProps;
  variant: "create" | "edit";
}) {
  const defaultValue = props.defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });
  const [open, setOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const router = useRouter();

  const { userId } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsButtonLoading(true);
      if (!userId) redirect("/sign-in");

      const mongdbUser = await getUserById(userId);
      const event: Event = {
        _id: defaultValue?._id,
        name: values.name,
        description: values.description,
        instagramURL: values.instagramURL,
        type: values.type,
        eventDate: values.eventDate,
        createdAt: new Date(),
        clerkId: mongdbUser?.clerkId,
        email: mongdbUser?.email,
        university: values.university,
      };

      if (props.variant === "edit") {
        await editEvent(event);
        toast.success("Evento editado com sucesso!");
        setOpen(false);
        router.refresh();
        setIsButtonLoading(false);
        return;
      } else {
        await saveEvent(event);
      }

      toast.success("Evento criado com sucesso!");
      form.reset(
        {
          name: "",
          description: "",
          instagramURL: "",
          type: "",
        },
        { keepValues: false },
      );
      setOpen(false);
      router.refresh();
      setIsButtonLoading(false);
    } catch (error) {
      toast.error("Erro ao criar evento");
    } finally {
      setIsButtonLoading(false);
    }
  }

  async function onDelete() {
    try {
      setIsButtonLoading(true);
      if (defaultValue?._id) {
        await deleteEvent(defaultValue._id);
        toast.success("Evento deletado com sucesso!");
        setOpen(false);
        router.refresh();
      } else {
        throw new Error("Evento não encontrado");
      }
    } catch (error) {
      toast.error("Erro ao deletar evento");
    } finally {
      setIsButtonLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.variant === "edit" ? (
          <a
            href="#"
            className="text-xs no-underline hover:underline hover:decoration-primary md:text-sm"
          >
            Editar Evento
          </a>
        ) : (
          <Button>Criar Novo Evento</Button>
        )}
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="max-h-[75vh] max-w-[90vw] overflow-y-auto lg:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>
            {props.variant === "edit" ? "Editar Evento" : "Criar Novo Evento"}
          </DialogTitle>
          <DialogDescription>
            {props.variant === "edit"
              ? "Edite as informações do evento."
              : "Preencha e compartilhe um novo evento com o seu campus."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do evento</FormLabel>
                  <FormControl>
                    <Input placeholder="nome do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="instagramURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram @</FormLabel>
                  <FormControl>
                    <Input placeholder="Instagram @ " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de evento</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tipo Evento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academico">Acadêmico</SelectItem>
                        <SelectItem value="esportivo">Esportivo</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Universidade</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Universidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((university) => (
                          <SelectItem key={university} value={university}>
                            {university}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data do evento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-4">
              <Button
                variant="default"
                type="submit"
                disabled={isButtonLoading}
              >
                {props.variant === "edit"
                  ? "Editar evento"
                  : "Criar novo evento"}
                <FormField
                  name="filterUniversity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Filtrar por Universidade</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione uma universidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {universities.map((university) => (
                              <SelectItem key={university} value={university}>
                                {university}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Button>
            </div>
          </form>
          {props.variant === "edit" && (
            <Button
              variant="destructive"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Deletar evento
            </Button>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
