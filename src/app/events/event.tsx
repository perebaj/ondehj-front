import 'moment/locale/pt-br'

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

export interface EventProps {
  _id: ObjectId
  name: string
  description: string
  eventDate: Date
  type: string
  instagramURL?: string
}

export default function Event(props: {
  eventProps: EventProps
  edit: boolean
}) {
  moment.locale('pt-br')
  const date = moment(props.eventProps.eventDate).format('LL')

  let TypeIcon
  let TypeName
  switch (props.eventProps.type) {
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
      <div className="flex w-full items-center justify-between gap-8 pb-2">
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
          <TypeIcon className="mr-1.5 h-4 w-4" />
          {TypeName}
        </span>
        {props.edit ? (
          <EventForms defaultValues={props.eventProps} variant="edit" />
        ) : null}
      </div>
      <time className="self-start text-base font-extrabold  text-gray-500 dark:text-gray-400">
        {date}
      </time>
      <h3 className="text-3xl font-bold leading-tight text-blue-500">
        {props.eventProps.name}
      </h3>
      <p className="max-w-72 whitespace-pre-wrap break-words text-sm/relaxed text-gray-500 dark:text-gray-400 md:max-w-max">
        {props.eventProps.description}
      </p>
      {props.eventProps.instagramURL && (
        <a
          className="inline-flex items-center no-underline hover:underline"
          href={props.eventProps.instagramURL}
        >
          Veja no Instagram
          <ChevronRightIcon className="ml-1.5 inline-block h-4 w-4" />
        </a>
      )}
    </div>
  )
}
