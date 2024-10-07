'use client'
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [name, setName] = useState(null);
    const [token, setToken] = useState(null);
    const [isGoogle, setIsGoogle] = useState(null);
    const [rememberMe, setRememberMe] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedName = localStorage.getItem("name")
        const storedToken = localStorage.getItem("token")
        const storedIsGoogle = localStorage.getItem("isGoogle")

        if(storedName && storedToken && storedIsGoogle) {
            setName(storedName)
            setToken(storedToken)
            setIsGoogle(storedIsGoogle)
        }
        setLoading(false)
    }, [])

    const setAuthData = (name, token, isGoogle, rememberMe) => {
        setName(name);
        setToken(token);
        setIsGoogle(isGoogle);
        if(rememberMe == true){
            localStorage.setItem("name", name);
            localStorage.setItem("token", token);
            localStorage.setItem("isGoogle", isGoogle);
        }
    };

    const clearAuthData = () => {
        setName(null);
        setToken(null);
        setIsGoogle(null);
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("isGoogle");
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ name, token, isGoogle, rememberMe, loading, setAuthData, clearAuthData }}>
        {children}
      </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}