import { handleActions } from 'redux-actions'
import produce from 'immer'
import * as actions from '../actions'

const initialState = []

const reducer = handleActions(
  {
    [actions.receiveComment]: (state, action) => {
      const { payload } = action
      console.log(payload)
      return produce(state, draftState => {
        if (payload.type === 'message') {
          draftState.push(payload)
          return draftState
        }
        return state
      })
    }
  },
  initialState
)

export default reducer
