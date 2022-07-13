import styled from "styled-components"

export default function LoginPage({onLogin}){

  return <Grid>
    <button onClick={() => onLogin("toller-token")}>login</button>
  </Grid>

}

const Grid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  padding: 12px;
`
