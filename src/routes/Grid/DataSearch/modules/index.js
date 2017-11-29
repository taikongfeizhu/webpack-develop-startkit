import { put, take, call } from 'redux-saga/effects'
import Immutable from 'immutable'
import { singleton } from 'constant/single'
import fetchAPI from 'api'
import { apis } from 'api/config'

const single = singleton.setKey('GRID')

// ------------------------------------
// Constants
// ------------------------------------
export const GET_LIST_DATA = single.add('GET_LIST_DATA')
export const ADD_LIST_DATA = single.add('ADD_LIST_DATA')
const PAGE_SIZE = 10

// ------------------------------------
// Actions
// ------------------------------------
export function getOpportunityData (body) {
  return {
    type    : GET_LIST_DATA,
    payload : body
  }
}

export function addOpportunityData (body) {
  return {
    type    : ADD_LIST_DATA,
    payload : body
  }
}

export const actions = {
  getOpportunityData
}

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = Immutable.fromJS({
  list: [],
  fieldsValue: {},
  auth: {},
  serial: '',
  loading: false
})

export default function grid (state = initialState, action) {
  const map = {
    [GET_LIST_DATA]: function () {
      let { params = {} } = action.payload
      return state.mergeIn(
        ['pagination'], {
          current: +(params.current || 1),
          pageSize: +(params.limit || PAGE_SIZE)
        }
      ).set(
        'loading', true
      )
    },
    [ADD_LIST_DATA]: function () {
      let { list } = action.payload
      return state.mergeIn(
        ['pagination'], { total: list.total }
      ).merge({
        loading: false,
        list: list.data
      })
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
    const { payload = {} } = yield take(GET_LIST_DATA)
    const { params } = payload
    const [follow] = [
      yield call(fetchAPI, apis.getOpporList, params)
    ]
    yield put(addOpportunityData({ list: follow }))
  }
}

export const sagas = [
  fetchOpportunityList
]
