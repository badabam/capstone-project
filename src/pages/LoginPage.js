import {useState} from "react";
import styled from "styled-components"

export default function LoginPage({onLogin}){
  const [credentials,setCredentials] = useState({
    username: "",
    password: ""
  })

  return <Grid>
    <Form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" name="username" value={credentials.name} onChange={handleChange}/>
      </label>
      <label>
        Password
        <input type="password" name="password" value={credentials.password} onChange={handleChange}/>
      </label>
      <button>login</button>
    </Form>
  </Grid>

  function handleSubmit(event) {
    event.preventDefault()
    onLogin(credentials)
  }

  function handleChange(event) {
    const {name,value} = event.target
    setCredentials({...credentials, [name]: value})
  }
}

const Grid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  padding: 12px;
`

const Form = styled.form`
  display: grid;
  gap: 12px;

  input {
    width: 100%;
  }
`
