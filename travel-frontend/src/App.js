import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              //If user exists, go to home page, else login page
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path="/login"
              //If user exists, redirect to home page from login page
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/login"
              //If user exists, redirect to home page from login page
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup"
              //If user exists, redirect to home page from signup page
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;