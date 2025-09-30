import { createContext, useContext } from "react";

export const AuthContext = createContext();

// provider para expor para aplicação
export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () => useContext(AuthContext);
