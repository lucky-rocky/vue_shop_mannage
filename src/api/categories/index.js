import { request } from '@/utils/request'

export const getCate = data => request.get('categories', { params: data })
