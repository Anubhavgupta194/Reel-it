import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
export const Authstore = React.createContext();

export function AuthProvider({children}) {
    const [user, setuser] = useState();
    const [loading, setloading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout() {
        auth.signOut();
    }
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setuser(user);
            setloading(false);
        })
        return () => {
            unsub();
        };
    }, []);
    const store = {
        user,
        signup,
        login,
        logout,

    }
    return (
            <Authstore.Provider value={store}>
            {!loading && children}
             </Authstore.Provider>
    )

}