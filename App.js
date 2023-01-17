import React, { useContext } from 'react'
import AuthForm from './component/Auth/AuthForm'
import { Route} from 'react-router-dom'
import ExpensePage from './component/Auth/pages/ExpensePage'
import AuthContext from './component/Auth/store/AuthContext'
function App() {
  const authCtx = useContext(AuthContext)
  return (
    <div>
      <main>
   {authCtx.isLoggedIn &&  <Route path='/ExpensePage'>
        <ExpensePage/>
      </Route>}
     </main>
 
   {!authCtx.isLoggedIn&&<AuthForm/>}  
    </div>
  )
}

export default App
