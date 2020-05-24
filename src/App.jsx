import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import CreateArticle from './components/CreateArticle'
import Header from './components/Header'

function App() {
  const [uid, setUid] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <div className="App">
      <Header uid={uid} authenticated={authenticated}/>
      <LoginForm setAuthenticated={setAuthenticated} setUid={setUid}/>
      <CreateArticle/>
    </div>
  );
}

export default App;
