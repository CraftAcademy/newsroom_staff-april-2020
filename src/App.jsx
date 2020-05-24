import React, { useState } from 'react';
import auth from './modules/auth'
import LoginForm from './components/LoginForm';
import CreateArticle from './components/CreateArticle'
import Header from './components/Header'

function App() {
  const [message, setMessage] = useState("")
  const [uid, setUid] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const logIn = async (e) => {
    try {
      const response = await auth.signIn(e.target.email.value, e.target.password.value)
      debugger
      setUid(response.data.uid)
      setAuthenticated(true)
    } catch(error) {
      debugger
      setMessage(error.response.data.errors[0])
    }
  }

  return (
    <div className="App">
      <Header uid={uid} authenticated={authenticated}/>
      <LoginForm logIn={logIn} errorMessage={message}/>
      <CreateArticle/>
    </div>
  );
}

export default App;
