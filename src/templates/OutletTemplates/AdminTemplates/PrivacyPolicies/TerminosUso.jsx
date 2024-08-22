import { Link } from "react-router-dom";

export function TerminosUso() {
  return (
    <div className="min-h-screen pt-20 pb-10 bg-slate-950">
        <div className="container flex flex-col gap-8 p-4 mx-auto text-sm text-justify text-white font-montserrat">
            <h1 className="mt-8 text-4xl text-center text-gray-100 uppercase font-montserrat">Términos de Uso</h1>
            <p className="mt-8">Estos Términos de Uso rigen el uso de GameListWeb (web creada por Daniel González González) y establecen las reglas y condiciones para el uso de nuestro sitio web.</p>
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
                <p>Nuestro sitio web utiliza cookies o tecnologías similares para un buen rendimiento de la aplicación. Al usar nuestro sitio, usted acepta el uso de dichas tecnologías de acuerdo con nuestra Política de Privacidad.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">5. Derechos de Propiedad Intelectual:</header>
                <p>Todas las imágenes utilizadas tienen derechos de autor pertenecientes a compañías indicadas en cada uno de los juegos.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">6. Limitación de Responsabilidad:</header>
                <p>No somos responsables de ningún daño o pérdida causada por el uso de nuestro sitio web.</p>
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
                <p>{'Los puntos anteriores se establecen con el objetivo de cumplir con todas las leyes y regulaciones de protección de datos en la Unión Europea y España, incluido el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD). Puede consultar dichas leyes para obtener más información.'}</p>
            </section>
        </div>
    </div>
  )
}
