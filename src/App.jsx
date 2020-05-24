import React from 'react';
import LoginForm from './components/LoginForm';
import CreateArticle from './components/CreateArticle'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <LoginForm></LoginForm>
      <CreateArticle/>
    </div>
  );
}

export default App;
