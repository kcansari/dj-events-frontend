import styles from '@/styles/Event.module.css'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

const EventPage = ({ evt }) => {
  const router = useRouter()
  // console.log(evt)

  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events')
      }
    }
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
          {new Date(evt.attributes.date).toLocaleDateString('en-US')} at{' '}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer />
        {/* {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              alt={evt.attributes.image.data.attributes.name}
              src={evt.attributes.image.data.attributes.formats.large.url}
              width={960}
              height={600}
            />
          </div>
        )} */}

        {/* <Image
          src={
            evt.attributes.image
              ? '/images/event-default.png'
              : evt.attributes.image
          }
          alt={evt.name}
          width={960}
          height={600}
        /> */}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href={`/events`} className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`)
  const events = await res.json()
  let { data } = events

  console.log(data)
  const paths = data.map((evt) => ({
    params: { slug: evt.attributes.Slug },
  }))
  // const paths = []
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {
  // console.log(slug)
  const res = await fetch(
    `${API_URL}/api/events?filters[Slug][$eq]=${slug}&populate=*`
  )
  const events = await res.json()
  // console.log(events)
  return {
    props: {
      evt: events.data[0],
      relidate: 1,
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
