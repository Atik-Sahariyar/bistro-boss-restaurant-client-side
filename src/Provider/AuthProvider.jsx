import {  createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    // create user with email and password
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // create user with google
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // update user profile
    const updateUserProfiole = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo
        })
    }

    // sign in user
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // current user
    useEffect( () => {
      const unsubscribe =  onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        if(currentUser){
            //get token and store client
            const userEmail = {email: currentUser.email};
            axiosPublic.post('/jwt', userEmail)
            .then(res => {
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token);
                    setLoading(false);
                }
            })
        }else {
            //
            localStorage.removeItem('access-token')
            setLoading(false)
        }
        console.log('current user --> : ', currentUser);
       })
       return () => {
        unsubscribe();
       }
    },[axiosPublic])
     
    // auth information
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfiole,
        googleSignIn  
    }

    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;