import { request } from '@/utils/request'

// login
export const login = (url, data) => request.post(url, data)
