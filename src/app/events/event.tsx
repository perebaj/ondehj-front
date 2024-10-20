'use client'
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
import Link from 'next/link'

import ShowDescription from './showDescriptionClient'

export interface EventProps {
  _id: ObjectId
  name: string
  description: string
  eventDate: Date
  type: string
  instagramURL?: string
  role?: string
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
    <div className="relative flex flex-col items-start justify-start gap-1 rounded-lg border bg-white p-6 shadow-md">
      <div className="flex w-full items-center justify-between gap-8 pb-2">
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
          <TypeIcon className="mr-1.5 h-4 w-4" />
          {TypeName}
        </span>
      </div>
      <time className="self-start text-base font-extrabold  text-gray-500 dark:text-gray-400">
        {date}
      </time>
      <h3 className="text-3xl font-bold leading-tight text-primary">
        {props.eventProps.name}
      </h3>
      <ShowDescription description={props.eventProps.description} />
      {props.eventProps.instagramURL && (
        <Link
          className="inline-flex items-center no-underline hover:underline"
          href={props.eventProps.instagramURL}
        >
          Veja no Instagram
          <ChevronRightIcon className="ml-1.5 inline-block h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
