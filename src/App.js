import {useEffect, useState} from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom"

import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";

export default function App() {
  const navigate = useNavigate()
  const [token, setToken] = useState()

  useEffect(() => {
    console.log({token})
  },[token])

  return <Routes>
    <Route>
      <Route index element={token ? <TodosPage onLogout={logout}/> : <Navigate to="/login"/>}/>
      <Route path="login" element={<LoginPage onLogin={login}/>}/>
    </Route>
  </Routes>

  function login(credentials) {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }).then(res => res.json())
      .then(token => setToken(token))
      .then(() => navigate("/"))
      .catch(error => console.log(error))
  }

  function logout() {
    console.log("logout")
  }
}

