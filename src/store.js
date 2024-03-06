import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './features/todos/todos-slice'
import filtersReducer from './features/filters/filters-slice'

const store = configureStore({
  'reducer': {
    'todos': todosReducer,
    'filters': filtersReducer,
  },
})

export default store
