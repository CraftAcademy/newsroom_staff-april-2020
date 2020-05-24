import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import CreateArticle from './components/CreateArticle'
import Header from './components/Header'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [uid, setUid] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <div className="App">
      <Header uid={uid} authenticated={authenticated}/>
      <Switch>
        <Route exact path="/" render={() => <LoginForm setAuthenticated={setAuthenticated} setUid={setUid} authenticated={authenticated}/>}  />
        <Route path="/login" render={() => <LoginForm setAuthenticated={setAuthenticated} setUid={setUid} authenticated={authenticated}/>} />
        <PrivateRoute authenticated={authenticated} path='/write' component={CreateArticle} />
      </Switch>
    </div>
  );
}

export default App;
