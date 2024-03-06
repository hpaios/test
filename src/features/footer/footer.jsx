import { useSelector, useDispatch } from 'react-redux'

import {
  StatusFilters,
  statusFilterChanged,
} from '../filters/filters-slice'
import {
  completedTodosCleared,
  allTodosCompleted,
  selectTodos,
} from '../todos/todos-slice'

export const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div>
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

export const StatusFilter = ({ 'value': status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const outlineStyle = `py-2 px-4 block rounded-md my-2
    border-2 border-purple-800`
    const fullStyle = 'py-2 px-4 bg-purple-800 block rounded-md my-2'
    const className = value === status ? fullStyle : outlineStyle

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div>
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const Footer = () => {
  const dispatch = useDispatch()

  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed,
    )
    return uncompletedTodos.length
  })

  const { status } = useSelector((state) => state.filters)

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted())
  const onClearCompletedClicked = () => dispatch(completedTodosCleared())

  const onStatusChange = (newStatus) => dispatch(
    statusFilterChanged(newStatus),
  )

  return (
    <footer className="flex justify-between text-white font-bold my-4">
      <div className="actions">
        <h5>Actions:</h5>
        <div>
        <button className='
          py-2
          px-4
          block
          rounded-md
          my-2
          border-2
          border-purple-800
        '
        onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button className='
          py-2
          px-4
          block
          rounded-md
          my-2
          border-2
          border-purple-800'
          onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
        </div>
      </div>
      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
    </footer>
  )
}

export default Footer
