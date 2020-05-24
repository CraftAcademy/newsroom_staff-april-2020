import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import CreateArticle from './components/CreateArticle'
import Header from './components/Header'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import auth from "./modules/auth"

function App() {
  const [uid, setUid] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function validate() {
      if (localStorage.hasOwnProperty("J-tockAuth-Storage")) {
        const tokenParams = JSON.parse(localStorage.getItem("J-tockAuth-Storage"))
        try {
          const response = await auth.validateToken(tokenParams)
          setAuthenticated(response.success)
        } catch (error) {
          console.log(error)
        }
      }
    }
    validate();
  },[])

  return (
    <div className="App">
      <Header uid={uid} authenticated={authenticated} setAuthenticated={setAuthenticated}/>
      <Switch>
        <Route exact path="/" render={() => <LoginForm setAuthenticated={setAuthenticated} setUid={setUid} authenticated={authenticated}/>}  />
        <Route path="/login" render={() => <LoginForm setAuthenticated={setAuthenticated} setUid={setUid} authenticated={authenticated}/>} />
        <PrivateRoute authenticated={authenticated} path='/write' component={CreateArticle} />
      </Switch>
    </div>
  );
}

export default App;
