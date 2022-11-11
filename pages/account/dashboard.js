import { parseCookies } from '@/helpers/index'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'

const DashboardPage = ({ events, token }) => {
  const router = useRouter()
  // console.log(events)

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.reload()
      }
    }
  }

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          /* <h3 key={evt.id}>{evt.name}</h3> */
          <DashboardEvent key={evt.id} evt={evt} deleteEvent={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export default DashboardPage

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await res.json()

  return {
    props: {
      events,
      token,
    },
  }
}
