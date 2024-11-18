import { useEffect, useState } from "react"
import { supabase } from "../api/supabase/supabase"
import { INITIAL_VALUE } from "../templates/helpers/constants/constants"

const STORAGE_KEY = "user"
// console.log(localStorage.getItem(STORAGE_KEY))

export function useUser() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem(STORAGE_KEY)
        return storedUser ? JSON.parse(storedUser) : INITIAL_VALUE
    })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const { message } = error || false

    const loadUser = async () => {
        const { data: { user: supabaseUser } } = await supabase.auth.getUser()
        if (supabaseUser) {
            setUser(supabaseUser)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseUser)) // Guardar en localStorage
        } else {
            // User is signed out
            setUser(INITIAL_VALUE)
            localStorage.removeItem(STORAGE_KEY) // Limpiar localStorage
        }
    };

    useEffect(() => {
        // Subscribir a cambios en el estado de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user)
                localStorage.setItem(STORAGE_KEY, JSON.stringify(session.user)) // Guardar en localStorage
            } else {
                setUser(INITIAL_VALUE)
                localStorage.removeItem(STORAGE_KEY) // Limpiar localStorage
            }
        });

        // Cargar el usuario actual
        loadUser()

        // Limpieza
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const _signInWithEmailAndPassword = async (email, password) => {
        setError(null)
        setSuccess(null)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            const { user: supabaseUser } = data
            setUser(supabaseUser);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseUser)) // Guardar en localStorage
            setSuccess(true)
        } catch (error) {
            setError(error)
        }
    };

    const _signOut = async () => {
        setError(null);
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            setUser(INITIAL_VALUE)
            localStorage.removeItem(STORAGE_KEY) // Limpiar localStorage
        } catch (error) {
            setError(error)
        }
    };

    return {
        _signInWithEmailAndPassword,
        _signOut,
        user,
        ...user,
        error,
        message,
        success
    }
}
