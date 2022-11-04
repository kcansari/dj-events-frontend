import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SearchPage({ events }) {
  const router = useRouter()
  return (
    <Layout title={'Search Results'}>
      <Link href={`/events`}>{'<'} Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  )
}

// export async function getServerSideProps({ query: resolvedUrl }) {
//   const term = qs.stringify(resolvedUrl)
//   let searchedWord = term.slice(0, term.length - 1)

//   //   name,performers,description, venue
//   const res = await fetch(
//     `${API_URL}/api/events?filters[name][$contains]=${searchedWord}&populate=*`
//   )
//   const events = await res.json()

//   //   console.log(query)

//   return {
//     props: { events: events.data }, // will be passed to the page component as props
//   }
// }

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          {
            description: {
              $contains: term,
            },
          },
          {
            venue: {
              $contains: term,
            },
          },
        ],
      },
    },
    { encode: false }
  )
  //   name,performers,description, venue
  const res = await fetch(`${API_URL}/api/events?${query}&[populate]=*`)
  const events = await res.json()

  console.log(query)
  console.log(events)

  return {
    props: { events: events.data }, // will be passed to the page component as props
  }
}
