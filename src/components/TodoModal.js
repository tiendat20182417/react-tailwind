/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'

import { addTodo, updateTodo } from '../slices/todoSlice'

const TodoModal = ({ setModalOpen, type, todo }) => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        )
      }
      if (type === 'update') {
        dispatch(
          updateTodo({
            ...todo,
            title,
            status,
            time: new Date().toLocaleString(),
          })
        )
      }
    }
    setModalOpen(false)
  }

  useEffect(() => {
    if (type === 'update') {
      setTitle(todo.title)
      setStatus(todo.status)
    } else {
      setTitle('')
      setStatus('incomplete')
    }
  }, [])

  useEffect(() => {
    const closeShow = (e) => {
      // eslint-disable-next-line no-empty
      if (e.target.closest('.modal-container')) {
      } else {
        setModalOpen(false)
      }
    }
    const wrapper = document.querySelector('.wrapper')
    wrapper.addEventListener('click', closeShow)
    return () => wrapper.removeEventListener('click', closeShow)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50  wrapper">
      <div className="bg-slate-200 rounded-xl relative p-6 modal-container">
        <button
          className="bg-slate-200 absolute top-[-40px] right-0 h-7 w-7 rounded-sm flex justify-center items-center"
          onClick={() => setModalOpen(false)}
        >
          <MdOutlineClose />
        </button>
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-slate-600 font-poppins font-bold text-2xl mb-5">
            Add TODO
          </h1>
          <label htmlFor="title" className="font-poppins">
            Title
            <input
              className="w-full mb-4 mt-1 h-8 pl-2 font-medium"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="status" className="font-poppins">
            Status
            <select
              className="w-full mb-8 mt-1 h-8 pl-1 font-medium"
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option className="bg-neutral-700 text-white" value="incomplete">
                Incomplete
              </option>
              <option className="bg-neutral-700 text-white" value="complete">
                Complete
              </option>
            </select>
          </label>
          <div className="">
            <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg mr-5">
              Add Task
            </button>
            <button
              className="bg-gray-300 text-slate-600 font-bold px-5 py-2 rounded-lg "
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoModal
