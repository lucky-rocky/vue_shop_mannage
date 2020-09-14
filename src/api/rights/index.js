import { request } from '@/utils/request'

// get all rights list
export const getAllRights = type => request.get(`rights/${type}`)

// delete a right of a role
export const deleteRoleRight = (roleId, rightId) =>
  request.delete(`roles/${roleId}/rights/${rightId}`)

// dispatch rights
export const dispatchRoleRights = (roleId, rids) =>
  request.post(`roles/${roleId}/rights`, { rids })
