'use client'
import 'moment/locale/pt-br'

import {
  ArrowBigUpDash,
  ChevronRightIcon,
  Disc3,
  Dumbbell,
  GraduationCap,
  Users,
} from 'lucide-react'
import moment from 'moment'
import { ObjectId } from 'mongodb'
import { useState } from 'react'

import { Event } from '@/lib/mongodb/db'
import { promoteEvent } from '@/lib/mongodb/events'

import EventForms from './eventForms'

export interface EventProps {
  _id: ObjectId
  name: string
  description: string
  eventDate: Date
  type: string
  instagramURL?: string
  clerkId: string
}

export default function Event(props: {
  eventProps: EventProps
  edit: boolean
}) {
  moment.locale('pt-br')
  const date = moment(props.eventProps.eventDate).format('LL')
  const [showFullDescription, setShowFullDescription] = useState(false)
  // const [isPromoted, setIsPromoted] = useState(false)
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

  async function handlePromotion() {
    try {
      await promoteEvent(props.eventProps._id, props.eventProps.clerkId)
    } catch (error) {
      console.error('Error promoting event', error)
    }
  }

  return (
    <div className="relative flex flex-col items-start justify-start gap-1 rounded-lg border p-6 shadow-md">
      <div className="flex w-full items-center justify-between gap-8 pb-2">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            {' '}
            {/* Container for promotion button and count */}
            <button
              className={'text-green-500  hover:underline'}
              onClick={handlePromotion}
            >
              <ArrowBigUpDash className="mr-1 inline-block h-6 w-6" />{' '}
              {/* Up arrow icon */}
              {/* Button label */}
              <span className="ml-2 text-lg text-gray-500">{1}</span>{' '}
            </button>
          </div>
          {/* Promotion count */}
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
            <TypeIcon className="mr-1.5 h-4 w-4" />
            {TypeName}
          </span>
        </div>
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
        {showFullDescription
          ? props.eventProps.description
          : props.eventProps.description.slice(0, 100) + '...'}{' '}
        {/* Display only a portion of the description */}
        {props.eventProps.description.length > 100 && ( // Check if description is longer than 100 characters
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
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
