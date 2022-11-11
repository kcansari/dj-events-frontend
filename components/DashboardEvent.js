import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from '@/styles/DashboardEvent.module.css'

const DashboardEvent = ({ evt, deleteEvent }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>{evt.name}</Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <FaPencilAlt /> <span>Edit Event</span>
      </Link>
      <a href='#' className={styles.delete} onClick={() => deleteEvent(evt.id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  )
}

export default DashboardEvent
