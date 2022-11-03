import styles from '@/styles/Event.module.css'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

const EventPage = ({ evt }) => {
  const deleteEvent = (e) => {
    console.log('delete')
  }
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Detele Event
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image alt={evt.name} src={evt.image} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href={`/events`} className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }))
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`)

  const events = await res.json()
  return {
    props: {
      evt: events[0],
    },
  }
}
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)

//   const events = await res.json()
//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }

export default EventPage
