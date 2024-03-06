import React from 'react'

import Header from './features/header/header'
import TodoList from './features/todos/todo-list'
import Footer from './features/footer/footer'

function App() {
  return (
    <div className="App">
      <nav>
        <section>
          <h1 className='
            text-purple-800
            my-5 text-3xl
            text-center
            font-bold
            italic'
          >
            Test task for April Tubbs by Hanna Paios
          </h1>
        </section>
      </nav>
      <main className='flex items-center justify-center'>
        <section className="w-2/4">
          <h2 className='text-purple-800 my-5 text-3xl text-center'>
            Todos
          </h2>
          <div>
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
