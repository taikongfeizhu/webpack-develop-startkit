import Immutable from 'immutable'
import fetchAPI from 'api'
import { singleton } from 'constant/single'
import { apis } from 'api/config'

const single = singleton.setKey('THUNK')

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_OPPOR_DATA = single.add('REQUEST_OPPOR_DATA')
export const ADD_OPPOR_DATA = single.add('ADD_OPPOR_DATA')
export const REQUEST_OPPOR_FETCHING = single.add('REQUEST_OPPOR_FETCHING')

console.log('THUNK', single)

// ------------------------------------
// Actions
// ------------------------------------

export const addOpportunityData = (payload) => ({
  type    : ADD_OPPOR_DATA,
  payload : payload
})

export const requestOpportunityFetching = (payload) => ({
  type    : REQUEST_OPPOR_FETCHING,
  payload : payload
})

export const requestOpportunityData = () => async (dispatch, getState) => {
  dispatch(requestOpportunityFetching(true))
  try {
    let response = await fetchAPI(apis.getOpporList)
    await dispatch(addOpportunityData(response.data))
    dispatch(requestOpportunityFetching(false))
    return response
  } catch (error) {
    dispatch(requestOpportunityFetching(false))
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
  opporList: [],
  isFetching: false
})

export default function thunkDemo (state = initialState, action) {
  const map = {
    [REQUEST_OPPOR_DATA]: function () {
      return state.set('params', action.payload)
    },
    [ADD_OPPOR_DATA]: function () {
      return state.set('opporList', action.payload)
    },
    [REQUEST_OPPOR_FETCHING]: function () {
      return state.set('isFetching', action.payload)
    }
  }

  if (map[action.type]) {
    return map[action.type]()
  } else {
    return state
  }
}
