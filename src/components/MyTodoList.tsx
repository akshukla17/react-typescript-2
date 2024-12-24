import React from "react"
import { Todo } from "../model"
import SingleTodo from "./SingleTodo"

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const MyTodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="todos">
      {todos.map((todo) => {
        return <SingleTodo todo={todo} todos={todos} setTodos={setTodos} />
      })}
    </div>
  )
}

export default MyTodoList
