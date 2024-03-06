import { useSelector, useDispatch } from 'react-redux'

import {
  todoDeleted,
  todoToggled,
  selectTodoById,
} from './todos-slice'

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id))
  const { text, completed } = todo

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id))
  }

  const onDelete = () => {
    dispatch(todoDeleted(todo.id))
  }

  return (
    <li>
    <div className="flex justify-between my-2">
      <div className="flex gap-2">
      <input checked={completed}
              onChange={handleCompletedChanged}
              type="checkbox" id={id}
              className="
              relative peer shrink-0
              appearance-none w-4 h-4 border-2 border-green-500 rounded-sm
              mt-1
              checked:bg-green-500 checked:border-0"
      />
      <label htmlFor={id} className='text-white font-bold'>{text}</label>
      <svg
        className="
          absolute
          w-4 h-4 mt-1
          hidden peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
      <div className="segment buttons">
          <button className="text-red-500 font-bold" onClick={onDelete}>
            &#10005;
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
