import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


function App() {

  const [user, setUser] = useState({});


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }


  const handleGitSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        
        console.log(user);
      })
      .catch(error => {
        console.log('error ashtese', error);
      })
  }

  

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      })
  }

  return (
    <div className="App">
      {
        user.email ?
          <button onClick={handleGoogleSignOut}>Sign Out</button> :
          <div>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
            <button onClick={handleGitSignIn}>Github sign in</button>
          </div>

      }
      <h2>Name: {user.displayName}</h2>
      <h2>Email: {user.email}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
