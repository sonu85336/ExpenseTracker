import { useState } from 'react';
 
import AuthContext from './AuthContext';

const AuthProvider = (props)=>{

    const [token,setToken] = useState(null)
  const   userIsLoggedIn = !!token;
    const loginHandler  =(token)=>{
setToken(token)
 
    }
    const logoutHandler =()=>{
        setToken(null)
    }

    const  authcontext = {
        isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler,
    tokenid:token,
    }
    console.log(token)
return (
    <AuthContext.Provider value={ authcontext}>
        {props.children}
    </AuthContext.Provider>
)


}
export default AuthProvider;