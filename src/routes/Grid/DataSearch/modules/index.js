import { put, take, call } from 'redux-saga/effects'
import Immutable from 'immutable'
import { singleton } from 'constant/single'
import fetchAPI from 'api'
import { apis } from 'api/config'

const single = singleton.setKey('GRID')

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_OPPOR_DATA = single.add('REQUEST_OPPOR_DATA')
export const ADD_OPPOR_DATA = single.add('ADD_OPPOR_DATA')
export const CHANGE_FIELD = single.add('CHANGE_FIELD')
export const RESET_DATA = single.add('RESET_DATA')

console.log('GRID', single)

// ------------------------------------
// Actions
// ------------------------------------
export function requestOpportunityData (body) {
  return {
    type    : REQUEST_OPPOR_DATA,
    payload : body
  }
}

export function addOpportunityData (body) {
  return {
    type    : ADD_OPPOR_DATA,
    payload : body
  }
}

export function changeField (body) {
  return {
    type    : CHANGE_FIELD,
    payload : body
  }
}

export function resetData () {
  return {
    type    : RESET_DATA
  }
}

export const actions = {
  requestOpportunityData,
  changeField,
  resetData
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  opporList: [],
  params: ''
})

export default function grid (state = initialState, action) {
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

// ------------------------------------
// Sagas
// ------------------------------------
export function *fetchOpportunityList (type, body) {
  while (true) {
    const { payload } = yield take(REQUEST_OPPOR_DATA)
    const [follow] = [
      yield call(fetchAPI, apis.getOpporList, payload)
    ]

    yield put(addOpportunityData(follow.data))
  }
}

export const sagas = [
  fetchOpportunityList
]
