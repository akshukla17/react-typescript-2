import React, { useState } from "react"
import "./App.css"
import InputField from "./components/InputField"

import { Todo } from "./model"
import MyTodoList from "./components/MyTodoList"
import { DragDropContext, DropResult } from "react-beautiful-dnd"

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [isDropDisabled, setIsDropDisabled] = useState(false)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }
  const handleDragEnd = (result: DropResult) => {
    console.log(result)
    const { source, destination } = result
    if (!destination) return

    //if drag and drop at same place
    if (
      source.droppableId === destination.droppableId &&
      source.index == destination.index
    )
      return
    let add,
      active = todos,
      complete = completedTodos

    if (source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }
    setTodos(active)
    setCompletedTodos(complete)
  }
  const handleDragStart = () => {
    setIsDropDisabled(false)
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <MyTodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
