import { useState } from "react";
import { useUser } from "../../../../hooks/useUser";
import { supabase } from "../../../../api/supabase/supabase";

export const DeleteAccount = () => {
    const { user } = useUser()
    const [confirm, setConfirm] = useState(false);

    const getToken = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
          return null;
        }
        return session?.access_token; // El token de acceso
      };


      const handleDeleteAccount = async () => {
        try {
          const token = await getToken(); // Obtén el token de sesión
      
          if (token) {
            const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.');
      
            if (isConfirmed) {
              const response = await fetch('/.netlify/functions/delete-user', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Envía el token de acceso
                },
                body: JSON.stringify({ userId: user.id }), // Envía el ID del usuario
              });
      
              if (response.ok) {
                alert('Cuenta eliminada con éxito.');
                window.location.href = '/login';
              } else {
                const errorText = await response.json();
                console.error('Error al eliminar la cuenta:', errorText.error);
                alert('Error al eliminar la cuenta.');
              }
            }
          } else {
            alert('No se pudo obtener el token de sesión.');
          }
        } catch (error) {
          console.error('Error al eliminar la cuenta:', error);
          alert('Error al eliminar la cuenta.');
        }
      };
      
    

    return (
        <div className="mt-20">
            <div className="flex items-center gap-3 text-xs text-white">
              <input type="checkbox" id="confirmCheckbox" checked={confirm} onChange={() => setConfirm(!confirm)}/>
              <label title="Haz click en la casilla para activar el botón de Eliminar cuenta" htmlFor="confirmCheckbox">Deseo eliminar mi cuenta</label>
            </div>
            <div className="flex justify-center">
              <button className={`w-full p-3 mt-4 text-sm text-center text-white bg-red-600 rounded-lg shadow-md ${confirm && 'hover:bg-red-800'}`} onClick={handleDeleteAccount} disabled={!confirm} title="Haz click en la casilla para activar el botón de Eliminar cuenta" >Eliminar Cuenta
              </button>
            </div>
        </div>
    );
};
