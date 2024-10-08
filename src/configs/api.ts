import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL! + '/api',
})

export const options = {
  multipart: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  json: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
}
