import EventsHeader from "./header";
import { ObjectId } from "mongodb";
import Events from "./events";

const event = {
  _id: new ObjectId(),
  name: "Evento Teste",
  description:
    "Descrição do evento teste aksjd  aksjdl jakl djalj alksjd lkajsdl jalks djlasjd lkajl kdjalsdj lakjsdlk jalskd jalksjdlkajs aksjd lj klasjd lajsldk jalsdj lkajdl jalskd jlasjd lajdl kjaslkd jalksjd lkajsdlk jalskd jlakdj lkajs dklajsdlk jadslk",
  eventDate: new Date(),
  type: "academico",
  instagramURL: "https://instagram.com",
  role: "Participante",
};

export default function EventsPage() {
  return (
    <div>
      <EventsHeader />
      <Events events={[event]} role="Participante" />
    </div>
  );
}
