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
        <p>Set</p>
        <article>
          <button
            type="button"
            className=""
            onClick={() => fx.set({ setNameValue: 'set 1 level' })}
          >
            set Value
          </button>

          <button
            type="button"
            className=""
            onClick={() => fx.set({ myArray: [] })}
          >
            set Array
          </button>

          <button
            type="button"
            onClick={() =>
              fx.set({
                form: {
                  name: {
                    firstName: 'ppppppppppp',
                    lastName: '***********'
                  }
                }
              })
            }
          >
            set Json
          </button>
        </article>

        <p>Set levels</p>
        <article>
          <button
            type="button"
            onClick={() => fx.set({ 'form.name.lastName': 'BOUCHAN' })}
          >
            set levels (Value)
          </button>

          <button
            type="button"
            onClick={() => fx.set({ 'form.moreArray': [[[]]] })}
          >
            set levels (Array)
          </button>

          <button
            type="button"
            onClick={() =>
              fx.set({
                'form.name': { firstName: 'SINUHE', lastName: 'MACEDA' }
              })
            }
          >
            set levels (Json)
          </button>
        </article>

        <p>Toggle :</p>
        <article>
          <button type="button" onClick={() => fx.set({ crazy: !state.crazy })}>
            ('crazy')
          </button>
          <button
            type="button"
            onClick={() => fx.set({ 'form.funny': !state.form.funny })}
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
            onChange={(evt) => fx.change(evt)}
          />

          <select name="form.year" onChange={(evt) => fx.change(evt)}>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="33">33</option>
          </select>

          <input
            type="checkbox"
            name="form.funny"
            checked={state.form.funny}
            onChange={(evt) => fx.change(evt)}
          />
          <label htmlFor="form.funny">Funny</label>

          <input
            type="radio"
            name="form.gender"
            value="M"
            checked={state.form.gender === 'M'}
            onChange={(evt) => fx.change(evt)}
          />
          <label htmlFor="M">M</label>

          <input
            type="radio"
            name="form.gender"
            value="F"
            checked={state.form.gender === 'F'}
            onChange={(evt) => fx.change(evt)}
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
              fx.set({
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
            onClick={() => context.fx.set({ loading: !context.state.loading })}
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
