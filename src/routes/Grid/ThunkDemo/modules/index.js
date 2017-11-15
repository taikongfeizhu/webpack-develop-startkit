import Immutable from 'immutable'
import fetchAPI from 'api'
import { singleton } from 'constant/single'
import { apis } from 'api/config'

const single = singleton.setKey('THUNK')

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_OPPOR_DATA = single.make('REQUEST_OPPOR_DATA')
export const ADD_OPPOR_DATA = single.make('ADD_OPPOR_DATA')

// ------------------------------------
// Actions
// ------------------------------------

export const addOpportunityData = (payload) => ({
  type    : ADD_OPPOR_DATA,
  payload : payload
})

export const requestOpportunityData = () => async (dispatch, getState) => {
  try {
    let response = await fetchAPI(apis.getOpporList)
    await dispatch(addOpportunityData(response.data))
    return response
  } catch (error) {
    console.log('error: ', error)
  }
}

export const actions = {
  requestOpportunityData
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  opporList: []
})

export default function thunkDemo (state = initialState, action) {
  var map = {
    [REQUEST_OPPOR_DATA]: function () {
      return state.set('params', action.payload)
    },
    [ADD_OPPOR_DATA]: function () {
      return state.set('opporList', action.payload)
    }
  }

  if (map[action.type]) {
    return map[action.type]()
  } else {
    return state
  }
}
