import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import TablePage from '@/pages/TablePage'
import AddStudent from '@/pages/AddStudent'
import wavyLinesBg from '@/assets/wavy-lines.svg'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden bg-background">
        <main
          className="flex-grow overflow-hidden relative z-0"
          style={{
            backgroundImage: `url(${wavyLinesBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
          <div className="relative z-10 h-full overflow-auto">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/table" element={<TablePage />} />
              <Route path="/add-student" element={<AddStudent />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
