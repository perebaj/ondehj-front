import EventForms from '../events/eventFormsClient'

export default function CreatePage() {
  return (
    <div>
      <h1>Criar Evento</h1>
      <EventForms variant="create" />
    </div>
  )
}
