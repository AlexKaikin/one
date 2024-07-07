import { isAxiosError } from 'axios'
import { redirect } from 'next/navigation'

export function ApiError(error: any) {
  if (isAxiosError(error)) {
    if (error.response?.status === 404) {
      redirect('/notfound')
    }

    if (error.response?.status === 403) {
      redirect('/forbidden')
    }
  }
}
