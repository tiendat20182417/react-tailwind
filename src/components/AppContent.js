import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const AppContent = () => {
  const dataFilterStatus = useSelector((state) => state.todo.filterStatus)
  const todolist = useSelector((state) => state.todo.todolist)

  useEffect(() => {
    console.log(dataFilterStatus)
  }, [dataFilterStatus])

  const todoListCp = [...todolist]
  const todoListCpSort = todoListCp.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  )

  const todoListMain = todoListCpSort.filter((item) => {
    if (dataFilterStatus === 'all') {
      return true
    }
    return item.status === dataFilterStatus
  })

  return (
    <div className="bg-gray-300 px-8 pt-8 pb-2 rounded-lg box-border">
      {todoListMain && todoListMain.length > 0 ? (
        todoListMain.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      ) : (
        <div className="flex justify-center items-center">
          <p className="bg-gray-400 font-bold p-2 rounded-lg text-lg mb-5">
            No Todos
          </p>
        </div>
      )}
    </div>
  )
}

export default AppContent
