import { useReducer } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document: null,
    loading: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true, success: null, error: null, document: null }
        case 'ADD_DOCUMENT':
            return { ...state, loading: false, success: true, document: action.payload, error: null }
        case 'UPDATED_DOCUMENT':
            return { ...state, loading: false, document: action.payload, success: true, error: null }
        case 'DELETE_DOCUMENT':
            return { ...state, loading: false, document: null, success: true, error: null }
        case 'ERROR':
            return { ...state, loading: false, document: null, success: false, error: action.payload }
        default:
            return state;
    }
}

export const useFirestore = (collecion) => {
    const [state, dispatch] = useReducer(firestoreReducer, initialState);

    // collection ref
    const ref = projectFirestore.collection(collecion);


    // add document
    const addDocument = (doc) => {
        dispatch({ type: 'LOADING' });

        const createdAt = timestamp.fromDate(new Date());

        const addedDoc = { ...doc, createdAt };

        ref.add(addedDoc)
            .then((docRef) => {
                dispatch({ type: 'ADD_DOCUMENT', payload: docRef });
            })
            .catch((err) => {
                dispatch({ type: 'ERROR', payload: err.message });
            })
    }

    // update document
    const updateDocument = async (id, updates) => {
        dispatch({ type: 'LOADING' })
        try {
            const updatedDocument = await ref.doc(id).update(updates);
            dispatch({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
            return updatedDocument
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message });
            return null;
        }
    }
    // delete document
    const deleteDocument = async (id) => {
        dispatch({ type: 'LOADING' });
        try {
            await ref.doc(id).delete();
            dispatch({ type: 'DELETE_DOCUMENT' })

        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message });
        }
    }

    return { addDocument, updateDocument, deleteDocument, state }
}