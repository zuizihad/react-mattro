import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <h1>yes</h1>
    </div>
  );
}

export default App;
