import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { StatusFilters } from '../filters/filters-slice'

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
  'status': 'idle',
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos')
  return response.todos
})

export const saveNewTodo = createAsyncThunk(
  'todos/saveNewTodo',
  async (text) => {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos',
      { 'todo': initialTodo })
    return response.todo
  },
)

const todosSlice = createSlice({
  'name': 'todos',
  initialState,
  'reducers': {
    todoToggled(state, action) {
      const todoId = action.payload
      const todo = state.entities[todoId]
      todo.completed = !todo.completed
    },
    'todoDeleted': todosAdapter.removeOne,
    allTodosCompleted(state) {
      for (const todo of Object.values(state.entities)) {
        todo.completed = true
      }
    },
    completedTodosCleared(state) {
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id)
      todosAdapter.removeMany(state, completedIds)
    },
  },
  'extraReducers': (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
  },
})

export const {
  allTodosCompleted,
  completedTodosCleared,
  todoAdded,
  todoDeleted,
  todoToggled,
} = todosSlice.actions

export default todosSlice.reducer

export const {
  'selectAll': selectTodos,
  'selectById': selectTodoById,
} = todosAdapter.getSelectors((state) => state.todos)

export const selectTodoIds = createSelector(
  selectTodos,
  (todos) => todos.map((todo) => todo.id),
)

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    return todos.filter((todo) => {
      return showAllCompletions || todo.completed === completedStatus
    })
  },
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id),
)
