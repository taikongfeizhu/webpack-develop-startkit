// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import DataSearch from './DataSearch'
import DataSearch2 from './DataSearch2'
import NotFound from './NotFound'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/apps/',
  component   : CoreLayout,
  indexRoute  : Home(store),
  childRoutes : [
    DataSearch,
    DataSearch2,
    NotFound
  ]
})

export default createRoutes
