/* eslint-disable react/button-has-type */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoModal from './TodoModal'
import { updateFilterStatusTodo } from '../slices/todoSlice'

const AppHeader = () => {
  const dispatch = useDispatch()
  const selectStatus = useSelector((state) => state.todo.filterStatus)
  const handleFilterStatus = (e) => {
    dispatch(updateFilterStatusTodo(e.target.value))
  }
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="flex justify-between h-10 mb-5">
      <button
        className="bg-blue-500 px-4 font-poppins font-bold text-base text-white rounded-lg"
        onClick={() => setModalOpen(true)}
        variant="primary"
      >
        Add Task
      </button>
      <select
        className="bg-neutral-400 rounded-lg text-base font-bold cursor-pointer"
        value={selectStatus}
        onChange={handleFilterStatus}
      >
        <option className="bg-neutral-700 text-white " value="all">
          ALL
        </option>
        <option className="bg-neutral-700 text-white" value="incomplete">
          Incomplete
        </option>
        <option className="bg-neutral-700 text-white" value="complete">
          Complete
        </option>
      </select>
      {modalOpen && <TodoModal type="add" setModalOpen={setModalOpen} />}
    </div>
  )
}

export default AppHeader
