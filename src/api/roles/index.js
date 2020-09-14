import { request } from '@/utils/request'

// roles
export const getRoles = url => request.get(url)

// add role
export const addRole = data => request.post('roles', data)

// query role by id
export const queryRoleById = editId => request.get(`roles/${editId}`)

// edited
export const editRole = (editId, data) => request.put(`roles/${editId}`, data)

// deleteRole
export const deleteRole = deleteId => request.delete(`roles/${deleteId}`)
