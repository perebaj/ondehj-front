import 'moment/dist/locale/pt-br'

import {
  ChevronRightIcon,
  Disc3,
  Dumbbell,
  GraduationCap,
  Users,
} from 'lucide-react'
import moment from 'moment'
import { ObjectId } from 'mongodb'

import { Event } from '@/lib/mongodb/db'

import EventForms from './eventForms'
// export type EventProps = {
//   id: string
//   name: string
//   description: string
//   eventDate: Date
//   instagramURL?: string
//   type: string
//   key: string
// }
export interface EventProps {
  _id: ObjectId
  name: string
  description: string
  eventDate: Date
  type: string
  instagramURL?: string
}

export default function Event(props: EventProps) {
  moment.locale('pt-br')
  const date = moment(props.eventDate).format('LLL')

  let TypeIcon
  let TypeName
  switch (props.type) {
    case 'academico':
      TypeIcon = GraduationCap
      TypeName = 'Acadêmico'
      break
    case 'esportivo':
      TypeIcon = Dumbbell
      TypeName = 'Esportivo'
      break
    case 'social':
      TypeIcon = Users
      TypeName = 'Social'
      break
    case 'cultural':
      TypeIcon = Disc3
      TypeName = 'Cultural'
      break
    default:
      TypeIcon = GraduationCap
      TypeName = 'Acadêmico'
  }

  return (
    <div className="relative flex flex-col items-start justify-start gap-1 rounded-lg border p-6 shadow-md">
      <div className="flex w-full items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
          <TypeIcon className="mr-1.5 h-4 w-4" />
          {TypeName}
        </span>
        <EventForms defaultValues={props} variant="edit" />
      </div>
      <h3 className="text-2xl font-bold leading-tight text-blue-500">
        {props.name}
      </h3>
      <p className="whitespace-pre-wrap text-sm/relaxed text-gray-500 dark:text-gray-400">
        {props.description}
      </p>
      <time className="mt-auto self-start text-sm font-medium text-gray-500 dark:text-gray-400">
        {date}
      </time>
      {props.instagramURL && (
        <a
          className="inline-flex items-center no-underline hover:underline"
          href={props.instagramURL}
        >
          Veja no Instagram
          <ChevronRightIcon className="ml-1.5 inline-block h-4 w-4" />
        </a>
      )}
    </div>
  )
}
