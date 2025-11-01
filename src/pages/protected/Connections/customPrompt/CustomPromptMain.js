import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CustomPromptDashboard from './CustomPromptDashboard';
import CreateCustompromptPage from './CreateCustomPrompt';
const CustomPromptMain = () => {
  return (
    <div>
    <Routes>
    <Route path="/" element={<CustomPromptDashboard/>} />
    <Route path="/:id" element={<CreateCustompromptPage update={true} />} />
  </Routes>
    </div>
  )
}

export default CustomPromptMain