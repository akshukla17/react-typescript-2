import React from "react"
import { Todo } from "../model"
import SingleTodo from "./SingleTodo"
import "./styles.css"
import { Droppable } from "react-beautiful-dnd"

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const MyTodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  key={todo.id}
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                  key={todo.id}
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default MyTodoList
