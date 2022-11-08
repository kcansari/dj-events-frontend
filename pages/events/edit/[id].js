import { FaImage } from 'react-icons/fa'
import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import slugify from 'slugify'
import moment from 'moment'

const EditEventPage = ({ evt, eventId }) => {
  const [values, setValues] = useState({
    name: evt.name,
    Slug: evt.Slug,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })

  const [imagePreview, setImagePreview] = useState(
    evt.image.data ? evt.image.data.attributes.formats.thumbnail.url : null
  )
  console.log(imagePreview)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: values }),
    })

    if (!res.ok) {
      toast.error('Something Went Wrong')
      // console.log(res.ok)
    } else {
      const evt = await res.json()
      // console.log(evt.data.attributes)
      router.push(`/events/${evt.data.attributes.Slug}`)
      // router.push('/events')
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title={'Add Event'}>
      <Link href={`/events`}>{'<'} Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='slug'>Slug Name</label>
            <input
              type='text'
              id='slug'
              name='slug'
              disabled
              value={(values.Slug = slugify(values.name, { lower: true }))}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Update Event' className='btn' />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image
          alt={'imagePreview'}
          src={imagePreview}
          height={100}
          width={170}
        />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          className='btn-secondary'
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Set Image <FaImage style={{ marginLeft: 10 }} />
        </button>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
  const evt = await res.json()

  return {
    props: {
      evt: evt.data.attributes,
      eventId: evt.data.id,
    },
  }
}

export default EditEventPage
