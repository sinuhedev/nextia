import { useEffect } from 'react'
import { sum } from 'utils'
import useFunctions from './functions'

export default function HomePage() {
  const { state, initialState, fx, context } = useFunctions()

  useEffect(() => {
    console.info(sum(10, 10))
  }, [])

  return (
    <section className="flex">
      <div>
        <p>Put</p>
        <article>
          <button
            type="button"
            className=""
            onClick={() => fx.put({ setNameValue: 'put 1 level' })}
          >
            put Value
          </button>

          <button
            type="button"
            className=""
            onClick={() => fx.put({ myArray: [] })}
          >
            put Array
          </button>

          <button
            type="button"
            onClick={() =>
              fx.put({
                data: {
                  user: 'sinuhe_dev'
                },
                form: {
                  name: {
                    firstName: 'ppppppppppp',
                    lastName: '***********'
                  }
                }
              })
            }
          >
            put Json
          </button>
        </article>

        <p>Put levels</p>
        <article>
          <button
            type="button"
            onClick={() => fx.put({ 'form.name.lastName': 'BOUCHAN' })}
          >
            put levels (Value)
          </button>

          <button
            type="button"
            onClick={() => fx.put({ 'form.moreArray': [[[]]] })}
          >
            put levels (Array)
          </button>

          <button
            type="button"
            onClick={() =>
              fx.put({
                'form.name': {
                  firstName: 'SINUHE',
                  lastName: 'MACEDA',
                  company: {
                    codeName: 'sdev'
                  }
                }
              })
            }
          >
            put levels (Json)
          </button>
        </article>

        <p>Put empty</p>
        <article>
          <button type="button" onClick={() => fx.put({ data: {} })}>
            put empty
          </button>

          <button
            type="button"
            onClick={() => fx.put({ 'data.permissions': {} })}
          >
            put levels empty
          </button>

          <button
            type="button"
            onClick={() =>
              fx.put({
                data: { permissions: {} },
                ls: {}
              })
            }
          >
            put json empty
          </button>
        </article>

        <p>Put toggle :</p>
        <article>
          <button type="button" onClick={() => fx.put({ crazy: !state.crazy })}>
            ('crazy')
          </button>
          <button
            type="button"
            onClick={() => fx.put({ 'form.funny': !state.form.funny })}
          >
            ('form.funny')
          </button>
        </article>

        <p>Show and Hide :</p>
        <article>
          <button type="button" onClick={() => fx.show('form.funny')}>
            show
          </button>
          <button type="button" onClick={() => fx.hide('form.funny')}>
            hide
          </button>
        </article>

        <p>Reset :</p>
        <article>
          <button type="button" onClick={() => fx.reset('ls')}>
            ('ls')
          </button>
          <button type="button" onClick={() => fx.reset('form.name')}>
            ('form.name')
          </button>

          <button
            type="button"
            onClick={() => fx.reset(['channel', 'msg', 'form.name'])}
          >
            (['channel', 'msg', 'form.name'])
          </button>
        </article>

        <p>Simple actions</p>
        <article>
          <button type="button" onClick={(e) => fx.increment(e)}>
            +
          </button>
          <button type="button" onClick={(e) => fx.decrement(e)}>
            -
          </button>
        </article>

        <p>onChange:</p>
        <article>
          <input
            type="text"
            name="form.name.firstName"
            value={state.form.name.firstName}
            onChange={fx.change}
          />

          <select name="form.year" onChange={fx.change}>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="33">33</option>
          </select>

          <input
            type="checkbox"
            name="form.funny"
            checked={state.form.funny}
            onChange={fx.change}
          />
          <label htmlFor="form.funny">Funny</label>

          <input
            type="radio"
            name="form.gender"
            value="M"
            checked={state.form.gender === 'M'}
            onChange={fx.change}
          />
          <label htmlFor="M">M</label>

          <input
            type="radio"
            name="form.gender"
            value="F"
            checked={state.form.gender === 'F'}
            onChange={fx.change}
          />
          <label htmlFor="F">F</label>
        </article>
      </div>

      <div>
        <article style={{ textAlign: 'center' }}>
          <button type="button" onClick={() => fx.reset()}>
            RESET
          </button>

          <button
            type="button"
            onClick={() =>
              fx.put({
                channel: 256,
                msg: 256,
                data: { user: 256 },
                myArray: ['256', '256', '256'],
                setNameValue: '256',
                form: {
                  // funny: 256,
                  // gender: '256',
                  name: {
                    firstName: '256',
                    lastName: '256'
                  },
                  year: 256,
                  moreArray: [[[256, 256, 256]]]
                },
                ls: {
                  users: [
                    {
                      name: '256',
                      year: 256
                    },
                    {
                      name: '256',
                      year: 256
                    }
                  ]
                }
              })
            }
          >
            256
          </button>

          <button
            type="button"
            onClick={() => context.fx.put({ loading: !context.state.loading })}
          >
            loading
          </button>
        </article>

        <article style={{ display: 'flex' }}>
          <pre style={{ margin: '0 50px 0 50px', minHeight: '750px' }}>
            state = {JSON.stringify(state, undefined, 2)}
          </pre>
          <pre style={{ margin: '0 50px 0 50px', minHeight: '750px' }}>
            initialState = {JSON.stringify(initialState, undefined, 2)}
          </pre>
        </article>
      </div>
    </section>
  )
}
