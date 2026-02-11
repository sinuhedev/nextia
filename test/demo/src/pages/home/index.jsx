import React, { useEffect } from 'react'
import './style.css'
import { useFx, css } from 'nextia'
import functions from './functions'
import { sum } from 'utils'

export default function HomePage() {
  const { state, initialState, fx, context } = useFx(functions)

  useEffect(() => {
    console.info(sum(10, 10))
  }, [])

  return (
    <section className={css('HomePage', 'container')}>
      <div>
        <div>
          <p>set</p>
          <button
            className=""
            onClick={() => fx.set({ setNameValue: 'set 1 level' })}
          >
            set Value
          </button>
          <button
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
        </div>

        <div>
          <button onClick={() => fx.set({ 'form.name.lastName': 'BOUCHAN' })}>
            set mulit level (Value)
          </button>

          <button
            onClick={() =>
              fx.set({
                'form.name': { firstName: 'SINUHE', lastName: 'MACEDA' }
              })
            }
          >
            set mulit level (Json)
          </button>
        </div>

        <div>
          <p>Show and Hide :</p>
          <button onClick={() => fx.show('form.funny')}>show</button>
          <button onClick={() => fx.hide('form.funny')}>hide</button>
        </div>

        <div>
          <p>Reset :</p>
          <button onClick={() => fx.reset('ls')}>Reset (ls)</button>
          <button onClick={() => fx.reset('form.name')}>
            Reset (form.name)
          </button>
          <button onClick={() => fx.reset(['channel', 'msg', 'form.name'])}>
            Reset ([channel,msg,form.name])
          </button>
        </div>

        <div>
          <p>Simple actions/Reducer:</p>
          <button onClick={(e) => fx.increment(e)}>+</button>
          <button onClick={(e) => fx.decrement(e)}>-</button>

          <button
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
        </div>

        <div>
          <p>onChange:</p>

          {/* input text */}
          <input
            type="text"
            name="form.name.firstName"
            value={state.form.name.firstName}
            onChange={(evt) => fx.change(evt)}
          />

          {/* checkbox */}
          <input
            type="checkbox"
            name="form.funny"
            checked={state.form.funny}
            onChange={(evt) => fx.change(evt)}
          />
          <label htmlFor="form.funny">Funny</label>

          {/* radio */}
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

          {/* select */}
          <select name="form.year" onChange={(evt) => fx.change(evt)}>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="33">33</option>
          </select>
        </div>
      </div>

      <div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => fx.reset()}>RESET</button>
          <button
            onClick={() => {
              if (context.state.loading) context.fx.hide('loading')
              else context.fx.show('loading')
            }}
          >
            loading
          </button>
        </div>

        <div style={{ display: 'flex' }}>
          <pre style={{ margin: '0 50px 0 50px' }}>
            state = {JSON.stringify(state, undefined, 2)}
          </pre>
          <pre style={{ margin: '0 50px 0 50px' }}>
            initialState = {JSON.stringify(initialState, undefined, 2)}
          </pre>
        </div>
      </div>
    </section>
  )
}
