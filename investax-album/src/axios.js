import axios from 'axios'

const baseURL = 'http://localhost:8888'

export default axios.create({
  baseURL
})
