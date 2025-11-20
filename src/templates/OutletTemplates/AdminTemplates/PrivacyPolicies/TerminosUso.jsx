import { Link } from "react-router-dom";
import { HomeIcon } from "../../../../assets/Icons";
import { useUser } from "../../../../hooks/useUser";

export function TerminosUso() {
  const { user } = useUser()

  return (
    <div className="min-h-screen px-4 pt-20 pb-10 sm:pt-28 sm:px-10 bg-slate-950">
        {!user.id && 
          <div className="flex items-center justify-center w-10 mb-3">
            <Link to='/'><div className="p-1 transition duration-500 bg-gray-200 rounded-lg hover:bg-gray-600"><HomeIcon/></div></Link>
         </div>}
        <div className="flex flex-col gap-8 p-4 text-xs text-justify text-gray-900 bg-gray-100 xl:pb-8 xl:px-8 sm:text-sm rounded-2xl font-montserrat">
            <h1 className="mt-8 text-4xl text-center text-gray-900 uppercase font-montserrat">Términos de Uso</h1>
            <p className="mt-8">Por favor, lea detenidamente estos términos antes de usar GameListWeb. Al acceder o registrarse, acepta cumplir con estos términos.</p>
            <p>Estos Términos de Uso rigen el uso de GameListWeb (web creada por Daniel González González) y establecen las reglas y condiciones para el uso de nuestro sitio web.</p>
            <section>
                <header className="mb-2 font-bold">1. Uso del Sitio:</header>
                <p>Usted acepta utilizar nuestro sitio web de acuerdo con estos términos y todas las leyes y regulaciones aplicables.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">2. Registro de Usuario:</header>
                <p>Al registrarse en nuestro sitio web, usted proporciona información precisa y completa.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">3. Privacidad:</header>
                <p>Consulte nuestra <span className="font-bold text-link-underline"><Link to='/privacy-policies'>Política de Privacidad</Link></span> para obtener información sobre cómo recopilamos, utilizamos y protegemos sus datos personales.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">4. Cookies o similares:</header>
                <p>Nuestro sitio web utiliza cookies o tecnologías similares para un buen rendimiento de la aplicación. Actualmente, no utilizamos cookies, pero almacenamos datos en el navegador mediante tecnologías como *localStorage* para garantizar el correcto funcionamiento del sitio. Al usar nuestro sitio, usted acepta el uso de dichas tecnologías de acuerdo con nuestra Política de Privacidad.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">5. Derechos de Propiedad Intelectual:</header>
                <p>Todas las imágenes, logotipos y marcas utilizadas en GameListWeb son propiedad de sus respectivos dueños. Este sitio no está afiliado, asociado ni respaldado por las compañías titulares de dichas marcas. El uso de estos elementos se realiza exclusivamente con fines informativos y divulgativos, sin ningún propósito comercial o lucrativo.</p>

                <p className="mt-3">Si los titulares de los derechos consideran que el uso de alguna imagen o contenido vulnera sus derechos, pueden solicitar su retirada escribiendo a la administración de la web a través del correo electrónico gamelistwebsoporte@gmail.com. Se procederá a su eliminación inmediata, en base a la buena voluntad de la administración, cuyo único objetivo es ofrecer un servicio informativo y de divulgación sobre videojuegos.</p>

                <p className="mt-3">El sitio no ha contactado individualmente con los propietarios de cada imagen debido a que no se trata de un uso comercial ni con ánimo de lucro, y a la complejidad que supondría gestionar solicitudes individuales para un proyecto sin impacto económico, de alcance limitado y con un volumen considerable de contenido visual.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">6. Limitación de Responsabilidad:</header>
                <p>No somos responsables de ningún daño o pérdida causada por el uso de nuestro sitio web. El contenido y los datos proporcionados son de carácter informativo y personal, y no garantizamos su precisión o integridad.</p>
            </section>            
            <section>
                <header className="mb-2 font-bold">7. Terminación de la Cuenta:</header>
                <p>Nos reservamos el derecho de suspender o cerrar su cuenta si viola estos términos.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">8. Cambios en los Términos:</header>
                <p>Estos Términos de Uso pueden actualizarse ocasionalmente. Le notificaremos sobre cambios significativos a través de nuestro sitio web o por correo electrónico.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">9. Cumplimiento de la Legislación Española y Europea:</header>
                <p>
                    Los puntos anteriores se establecen con el objetivo de cumplir con todas las leyes y regulaciones de protección de datos en la Unión Europea y España, incluido el Reglamento General de Protección de Datos{" "}
                    <a href="https://www.boe.es/doue/2016/119/L00001-00088.pdf" target="_blank" rel="noopener noreferrer" className="font-bold text-link-underline">(RGPD)
                    </a>
                    {" "}y la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales{" "}
                    <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673" target="_blank" rel="noopener noreferrer" className="font-bold text-link-underline">(LOPDGDD)</a>
                    . Puede consultar dichas leyes para obtener más información.
                    </p>
            </section>
        </div>
    </div>
  )
}
