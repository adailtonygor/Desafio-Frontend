import UserForm from './components/Cadastro/Cadastro'
import { BrowserRouter as Router } from 'react-router-dom'
import Menu from './components/Menu'
import './App.css'


function App() {
  return (
    <div className="App">
      <Router>
      <Menu/>
      <UserForm/>
      </Router>
    </div>
   
  )
}

export default App
