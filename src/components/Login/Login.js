import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: false
    });

    const handleGoogleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const newUserInfo = {
                    name: displayName,
                    email: email
                };
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                updateUserName(user.name)
                history.replace(from)
            }).catch((error) => {
                console.log(error)
            });
    }

    const handleChange = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            if (user.password === user.confirmPassword) {

                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        const newUserInfo = { ...user };
                        newUserInfo.error = '';
                        newUserInfo.success = true;
                        setUser(newUserInfo);
                        setLoggedInUser(newUserInfo);
                        updateUserName(user.name)
                        history.replace(from)
                    })
                    .catch(error => {
                        const newUserInfo = { ...user };
                        newUserInfo.error = error.message;
                        newUserInfo.success = false;
                        setUser(newUserInfo);
                    })
            }
            else { alert('password dont match') }
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from)
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                })
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('user name updated successfully')
        }).catch(function (error) {
            console.log(error)
        });
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>

            <form onSubmit={handleSubmit} >
                <div className="col-md-4 mx-auto">
                    {newUser && <input name="name" type="text" class="form-control" onBlur={handleChange} placeholder="Your name" />}
                    <br />
                    <input class="form-control" type="text" name="email" onBlur={handleChange} placeholder="Your Email address" required />
                    <br />
                    <input class="form-control" type="password" name="password" onBlur={handleChange} placeholder="Your Password" required />
                    <br />
                    {newUser && <input class="form-control" type="password" name="confirmPassword" onBlur={handleChange} placeholder="Confirm Password" required />}
                    <br />
                    <input className="btn btn-success" type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                </div>
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
            <button className="btn btn-success" onClick={handleGoogleLogin}>continue with google</button>
        </div>
    );
};

export default Login;