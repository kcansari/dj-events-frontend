const { events } = require('./data.json')

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(events)
  } else {
    // Sets a single header value for implicit headers.
    // If this header already exists in the to-be-sent headers,
    //  its value will be replaced.
    // Use an array of strings here to send multiple headers with the same name.
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
