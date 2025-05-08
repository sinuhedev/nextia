import { env } from 'utils'
import { GET, POST, PUT, DELETE } from './http'

const API = env.WEB_API

export const getUser = (p) => GET(API + '/user/:id', p.path, p.body)
export const createUser = p => POST(API + '/user', p.path, p.body)
export const updateUser = p => PUT(API + '/user/:id', p.path, p.body)
export const deleteUser = p => DELETE(API + '/user/:id', p.path, p.body)
