import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
function App() {
  const [user, setUser] = useState({});
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const handleGoogleSignOut = () =>{
    signOut(auth)
    .then(() => {
      setUser({});
    })
    .catch(error =>{
      setUser({});
    })
  }

  return (
    <div className="App">
      {
        user.email ? <button onClick={handleGoogleSignOut}>Sign Out</button> :
        <button onClick={handleGoogleSignIn}>Google sign in</button>
        
      }
      <h2>Name: {user.displayName}</h2>
      <h2>Email: {user.email}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
