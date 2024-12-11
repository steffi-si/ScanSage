import { useState } from 'react'
import './App.css'
import Header from './views/Header.jsx'
import LoginForm from './components/LoginForm.jsx'
import { AuthProvider } from './context/useAuthContext.jsx'

function App() {
 

  return (
   <>
    <AuthProvider>
      <Header />
      <LoginForm />
    </AuthProvider>
   </>
  )
}

export default App
