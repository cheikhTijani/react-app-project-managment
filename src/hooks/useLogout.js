import { useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch, user } = useAuthContext();

    const logout = async () => {
        setError(null);
        setLoading(true);

        try {
            // change online status 
            const { uid } = user;
            await projectFirestore.collection('users').doc(uid).update({ online: false });

            await projectAuth.signOut();
            dispatch({ type: 'LOGOUT' });
            sessionStorage.removeItem('user');
            setLoading(false);
            setError(null);

        } catch (err) {
            setError(err.message);
            setLoading(false);

        }
    }

    return { logout, error, loading }
}