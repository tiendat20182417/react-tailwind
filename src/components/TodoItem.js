/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react'
import { format } from 'date-fns'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { checkStatusTodo, deleteTodo } from '../slices/todoSlice'
import TodoModal from './TodoModal'

const TodoItem = ({ todo }) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleEdit = () => {
    setIsOpenUpdate(true)
  }

  const handleCheckBox = (todo) => {
    dispatch(checkStatusTodo(todo))
  }

  return (
    <>
      <div className="bg-white rounded-lg flex items-center justify-between mb-6 h-16">
        <div className="flex ">
          <input
            type="checkbox"
            className="w-[27px] mx-3 rounded-lg"
            checked={todo.status === 'complete'}
            onChange={() => handleCheckBox(todo)}
          />
          <div className="flex flex-col">
            <p
              className={`font-bold text-sm ${
                todo.status === 'complete' ? 'line-through' : ''
              }`}
            >
              {todo.title}
            </p>
            <p className="text-xs font-normal">
              {format(new Date(todo.time), 'p, dd/MM/yyyy')}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center w-24 ">
          <button
            className="bg-gray-300 p-1 mx-2 rounded-sm"
            onClick={() => handleDelete(todo.id)}
          >
            <MdDelete />
          </button>
          <button
            className="bg-gray-300 p-1 mx-1 rounded-sm"
            onClick={() => handleEdit(todo.id)}
          >
            <MdEdit />
          </button>
        </div>
      </div>

      {isOpenUpdate && (
        <TodoModal type="update" setModalOpen={setIsOpenUpdate} todo={todo} />
      )}
    </>
  )
}

export default TodoItem
