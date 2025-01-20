import { createGlobalStyle } from "styled-components"
import { MainPage } from "./pages/MainPage"

function App() {
  return (
    <>
      <GlobalStyle />
      <MainPage />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  #root {
    height: 100%;
    background-color: #f5f5f5;
    padding: 20px;
  }

  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`

export default App
