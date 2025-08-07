'use server'

import { GET, POST, PUT, DELETE } from './http'

const { API } = process.env

export async function getUser (p) { return GET(API + '/user/:id', p.path, p.body) }
export async function createUser (p) { return POST(API + '/user', p.path, p.body) }
export async function updateUser (p) { return PUT(API + '/user/:id', p.path, p.body) }
export async function deleteUser (p) { return DELETE(API + '/user/:id', p.path, p.body) }
