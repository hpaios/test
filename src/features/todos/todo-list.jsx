import { useSelector } from 'react-redux'
import TodoListItem from './todo-list-item'

import { selectFilteredTodoIds } from './todos-slice'

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector((state) => state.todos.status)

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className='text-white'>Loading...</div>
      </div>
    )
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="my-5">{renderedListItems}</ul>
}

export default TodoList
