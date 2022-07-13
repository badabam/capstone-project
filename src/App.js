import {Routes, Route} from "react-router-dom"

import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";

export default function App() {

  return <Routes>
    <Route>
      <Route index element={<TodosPage onLogout={logout}/>} />
      <Route path="login" element={<LoginPage onLogin={login}/>}/>
    </Route>
  </Routes>

  function login(){
    console.log("login")
  }

  function logout(){
    console.log("logout")
  }
}

