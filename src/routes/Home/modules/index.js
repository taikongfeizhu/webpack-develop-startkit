import { take, put, call } from 'redux-saga/effects'
import Immutable from 'immutable'
import fetchAPI from 'api'
import { types, CUSTOMER_STATUS } from 'api/config'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_HOME_DATA = 'ADD_HOME_DATA'
export const REQUEST_HOME_DATA = 'REQUEST_HOME_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function addHomeData (payload = {}) {
  return {
    type    : ADD_HOME_DATA,
    payload : payload
  }
}

export function requestHomeData (body) {
  return {
    type    : REQUEST_HOME_DATA,
    payload : body
  }
}

export const actions = {
  addHomeData,
  requestHomeData
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  param: {},
  info: {}
})

export default function opportunity (state = initialState, action) {
  var map = {
    REQUEST_HOME_DATA: function () {
      return state.set('param', action.payload)
    },
    ADD_HOME_DATA: function () {
      return state.set('info', action.payload)
    }
  }

  if (map[action.type]) {
    return map[action.type]()
  } else {
    return state
  }
}

// ------------------------------------
// Sagas
// ------------------------------------
export function *fetchHomeData (type, body) {
  while (true) {
    const { payload } = yield take(REQUEST_HOME_DATA)
    const [ customerNum, untracks ] = yield [
      call(fetchAPI, types.getCustomerNum, payload.dashboard),
      call(fetchAPI, types.getCustomers, payload.list + `&status=${CUSTOMER_STATUS.UNTRACK}`)
    ]

    yield put(addHomeData({ customerNum, untracks }))
  }
}

export const sagas = [
  fetchHomeData
]
