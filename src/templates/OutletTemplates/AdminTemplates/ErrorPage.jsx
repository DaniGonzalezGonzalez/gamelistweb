import { Link, useRouteError } from "react-router-dom";
import { HomeIcon } from "../../../assets/Icons/HomeIcon";

export function ErrorPage() {
  const error = useRouteError();
  const { data, status } = error
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Lo siento, ha ocurrido un error inesperado.</p>
      <p>
        <i>Error {status}: {data}</i>
      </p>
      <div className="flex flex-col items-center gap-4 p-4 mt-8 bg-gray-100 rounded hover:bg-green-300">
        <p>Volver a la página principal</p>
        <Link to='/'><HomeIcon/></Link>
      </div>
    </div>
  );
}