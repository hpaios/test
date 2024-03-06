import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../todos/todos-slice'

const Header = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handleChange = (event) => setText(event.target.value)

  const handleKeyDown = async (event) => {
    const trimmedText = text.trim()
    if (event.which === 13 && trimmedText) {
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      setText('')
      setStatus('idle')
    }
  }

  const isLoading = status === 'loading'
  const placeholder = isLoading ? '' : 'What needs to be done?'
  const loaderElem = <div className='
    inline-block h-6 w-6 animate-spin
    rounded-full border-4 border-solid
    border-e-transparent
    align-[-0.125em]
    motion-reduce:animate-[spin_1.5s_linear_infinite]
    !absolute top-2 right-4 text-primary"
  role="status'>
  <span className='
    !absolute !-m-px !h-px !w-px !overflow-hidden
    !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] text-secondary'
  ></span>
  </div>
  const loader = isLoading ? loaderElem : ''

  return (
    <header className="relative">
      <input
        className='
          h-full w-full rounded-[7px] !border
          !border-gray-300 border-t-transparent bg-transparent
          px-3 py-2.5 text-md font-bold text-white
        '
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}

export default Header
