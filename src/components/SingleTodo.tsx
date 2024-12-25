import React, { useEffect, useRef, useState } from "react"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import { Todo } from "../model"
import "./styles.css"
import { Draggable } from "react-beautiful-dnd"

//instead of interface, using type (both way is correct)
type Props = {
  index: number
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState(todo.todo)

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    )
    setEdit(false)
  }
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus() //put focus when edit box open
  }, [edit]) //on edit change

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "draga" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text" style={{ color: "blue" }}>
              <b>{todo.todo}</b>
            </s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit) //toggle b/w edit is done or not
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
