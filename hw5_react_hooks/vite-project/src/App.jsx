import './App.css'
import UserForm from './components/UserForm'
import ChildForm from './components/ChildForm'
import UserProfile from './components/UserProfile'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <h2>Привет!</h2>
    <UserForm />
    <ChildForm />
    <br/>

    <UserProfile />

    </>

  )
}

export default App
