import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

const SlugEvent = () => {
  const router = useRouter()
  return (
    <Layout>
      <h1>Slug Event</h1>
      <h3>{router.query.slug}</h3>
    </Layout>
  )
}

export default SlugEvent
