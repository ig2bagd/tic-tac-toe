import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

import Game from "./Game.jsx";


// https://react.dev/learn/tutorial-tic-tac-toe
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
