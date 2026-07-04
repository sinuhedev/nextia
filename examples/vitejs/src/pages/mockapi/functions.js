import { useFx } from 'nextia'
import api from 'services/api'

export default () => {
  const initialState = {
    users: [],
    user: {},
    status: '',
    form: {
      id: 0,
      name: ''
    }
  }

  async function users({ payload, set }) {
    const { ok, status, data } = await api.getUser({
      path: { id: payload }
    })

    if (ok) {
      if (payload) set({ status, users: [], user: data })
      else set({ status, users: data, user: [] })
    } else {
      set({ status, users: {}, user: {} })
    }
  }

  async function createUser({ state, set }) {
    const { data, ok, status } = await api.createUser({
      body: {
        username: state.form.name,
        profile: {
          firstName: state.form.name,
          lastName: state.form.name
        }
      }
    })

    if (ok) set({ status, users: {}, user: data })
  }

  async function updateUser({ payload, state, set }) {
    const { ok, data, status } = await api.updateUser({
      path: { id: payload },
      body: {
        username: state.form.name,
        profile: {
          firstName: state.form.name,
          lastName: state.form.name
        }
      }
    })

    if (ok) set({ status, users: {}, user: data })
  }

  async function deleteUser({ payload, set }) {
    const { ok, status } = await api.deleteUser({ path: { id: payload } })

    if (ok) set({ status, users: [], user: {} })
  }

  return useFx({
    initialState,
    users,
    createUser,
    updateUser,
    deleteUser
  })
}
