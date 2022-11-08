import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'

export default function EventsPage({ events, page, total }) {
  // console.log(total)

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  const res = await fetch(
    `${API_URL}/api/events?populate=*&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
  )
  const events = await res.json()
  // console.log(total)
  return {
    props: {
      events: events.data,
      page: +page,
      total: events.meta.pagination.total,
    },
    // relidate: 1,
  }
}
