import { useState } from "react"
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config"
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null);
        setLoading(true);

        try {
            const response = await projectAuth.createUserWithEmailAndPassword(email, password);

            if (!response) {
                throw new Error('Could not complete sign up');
            }

            // upload user profile image
            const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`;
            const image = await projectStorage.ref(uploadPath).put(thumbnail);
            const imgUrl = await image.ref.getDownloadURL();

            // add display name to user
            await response.user.updateProfile({ displayName, photoURL: imgUrl });

            await projectFirestore.collection('users').doc(response.user.uid).set({
                online: true,
                displayName,
                photoURL: imgUrl
            })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: response.user });

            sessionStorage.setItem('user', JSON.stringify(response.user));

            setLoading(false)
            setError(null)

        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    return { error, loading, signup }
}