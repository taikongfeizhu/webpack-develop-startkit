// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import Grid from './Grid'
import Charts from './Charts'
import Route from './Route'
import NotFound from './NotFound'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home(store),
  childRoutes : [
    Grid(store),
    Charts(store),
    Route(store),
    NotFound
  ]
})

export default createRoutes
