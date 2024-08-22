/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../../context/UserContext';

export function AccesoPrivado({ children }) {
  // Extrae el id del contexto de usuario
  const { id } = useContext(UserContext);

  // Si no hay id (usuario no autenticado), redirige a la página principal
  if (!id) return <Navigate to='/' />;

  // Si el usuario está autenticado, renderiza los hijos (children)
  return <>{children}</>;
}

AccesoPrivado.propTypes = {
  children: PropTypes.node.isRequired,
};
