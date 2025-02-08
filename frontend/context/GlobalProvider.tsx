// @ts-nocheck
// todo: useReducer
import { getCurrentUser, login } from '@/lib/appwrite';
import { createContext, useContext, useReducer } from 'react';
import { useState, useEffect } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        // login to the current user for every screen
        () => {
            // useEffect must not return a Promise => can only write an async function and execute it inside the arrow function
            getCurrentUser()
            .then ((currentUserInfo) => {
                setLoggedIn(true)
                setUser(currentUserInfo)
            })
            .catch((error) => {
                console.error("Error in GlobalProvider.", error)
                setLoggedIn(false)
                setUser(null)
            })
            .finally(
                setIsLoading(false)
            )
        }
        , []
    )

    return (
        <GlobalContext.Provider
            value={
                {
                    loggedIn, setLoggedIn,
                    user, setUser,
                    isLoading, setIsLoading
                }
            }>
                { children }

        </GlobalContext.Provider>
    )
}