import { useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setLoading(true);
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            dispatch({ type: 'LOGIN', payload: res.user });
            sessionStorage.setItem('user', JSON.stringify(res.user));

            // online status
            await projectFirestore.collection('users').doc(res.user.uid).update({ online: true });

            setLoading(false);
            setError(null);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return { login, error, loading }
}