import React from 'react'
import Interview_page from './pages/Interview_page'
import Upload_resume from './pages/Upload_resume'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <Routes>
  <Route path='/' element={<Upload_resume />}/>
  <Route path='/ai-interview' element={<Interview_page />}/>
    </Routes>
  )
}

export default App