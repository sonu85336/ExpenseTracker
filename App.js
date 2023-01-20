import Counter from './components/Counter';
import { Fragment } from 'react';
import Header from './components/Header'
import Auth from './components/Auth'
import { useSelector } from 'react-redux';
function App() {
  const show_auth = useSelector((state)=>state.auth.isAuthenticated)
  return (
    <Fragment>
     {show_auth && <Header/>} 
     {!show_auth &&<Auth/>} 
      
    <Counter /></Fragment>
  );
}

export default App;
