import React from 'react'
import PageTitle from './components/PageTitle'

import AppHeader from './components/AppHeader'
import AppContent from './components/AppContent'

function App() {
  return (
    <div className="p-5 rounded-xl  bg-gray-200 h-[100vh]">
      <PageTitle>TODO LIST</PageTitle>
      <div className="mx-72">
        <AppHeader />
        <AppContent />
      </div>
    </div>
  )
}

export default App
