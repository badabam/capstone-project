import {useState} from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom"

import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";

export default function App() {
  const [token,setToken] = useState()
  const navigate = useNavigate()

  const login = (token) => {
    setToken(token)
    navigate("/")
  }

  const logout = () => {
    setToken(undefined)
    navigate("/login")
  }

  return <Routes>
    <Route>
      <Route index element={token ? <TodosPage onLogout={logout}/> : <Navigate to="/login"/>} />
      <Route path="login" element={<LoginPage onLogin={login}/>}/>
    </Route>
  </Routes>
}

