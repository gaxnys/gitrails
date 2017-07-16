import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import SendMessage from '../containers/SendMessage'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
    <div>
        <AddTodo />
        <SendMessage />
        <VisibleTodoList />
        <Footer />
    </div>
)

export default App
