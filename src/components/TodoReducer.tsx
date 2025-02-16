import React from "react"
import { Todo } from "../model"
import { stat } from "fs"

type Actions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "done"; payload: number }

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: "false" },
      ]
    case "remove":
      return state.filter((todo) => todo.id !== action.payload)
    case "done":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      )
  }
}

export default TodoReducer
