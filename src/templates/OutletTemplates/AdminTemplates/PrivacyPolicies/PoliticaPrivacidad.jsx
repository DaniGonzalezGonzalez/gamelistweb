import { Link } from "react-router-dom";
import { HomeIcon } from "../../../../assets/Icons";
import { useUser } from "../../../../hooks/useUser";

export function PoliticaPrivacidad() {
  const { user } = useUser()


  return (
    <div className="min-h-screen px-4 pt-20 pb-10 sm:pt-28 sm:px-10 bg-slate-950">
         {!user.id && <div className="flex items-center justify-center w-10 mb-3">
             <Link to='/'><div className="p-1 transition duration-500 bg-gray-200 rounded-lg hover:bg-gray-600"><HomeIcon/></div></Link>
         </div>}
        <div className="flex flex-col gap-8 p-4 text-xs text-justify text-gray-900 bg-gray-100 xl:pb-8 xl:px-8 sm:text-sm rounded-2xl font-montserrat">
            <h1 className="mt-8 text-4xl text-center text-gray-900 uppercase font-montserrat">Política de Privacidad</h1>
            <p className="mt-8">Esta Política de Privacidad describe cómo GameListWeb (web creada por Daniel González González) recopila, utiliza y protege la información personal que usted proporciona cuando utiliza nuestro sitio web.</p>
            <section>
                <header className="mb-2 font-bold">1. Información que Recopilamos:</header>
                <p>Cuando se registra en nuestro sitio web, recopilamos su dirección de correo electrónico. Estos datos son necesarios para proporcionarle una experiencia personalizada en nuestro sitio.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">2. Uso de la Información:</header>
                <p>Utilizamos la información proporcionada exclusivamente para el correcto funcionamiento de nuestro sitio web. No compartimos esta información con terceros ni la utilizamos con fines de marketing.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">3. Seguridad de los Datos:</header>
                <p>Implementamos medidas de seguridad adecuadas para proteger sus datos personales y garantizar que estén seguros.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">4. Cookies y Tecnologías de Rastreo:</header>
                <p>En nuestro sitio web es posible que utilicemos cookies o tecnologías similares, como *localStorage*, para mejorar la experiencia del usuario. Estas tecnologías nos permiten almacenar datos en su navegador para que el sitio funcione de manera más eficiente. Al usar nuestro sitio, usted acepta el uso de estas tecnologías según lo dispuesto en esta Política de Privacidad.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">5. Derechos de los Sujetos de Datos:</header>
                <p>Usted tiene derecho a acceder, rectificar, eliminar, limitar el tratamiento o solicitar la portabilidad de sus datos personales. Para ejercer estos derechos o para cualquier pregunta relacionada con sus datos, contáctenos a través de gamelistwebsoporte@gmail.com.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">6. Cambios en esta Política:</header>
                <p>Esta Política de Privacidad puede actualizarse ocasionalmente para reflejar cambios en nuestras prácticas de recopilación y uso de datos. Le notificaremos sobre cambios significativos a través de nuestro sitio web o por correo electrónico.</p>
            </section>
            <section>
                <header className="mb-2 font-bold">7. Cumplimiento de la Legislación Española y Europea:</header>
                <p>Los puntos anteriores se establecen con el objetivo de cumplir con todas las leyes y regulaciones de protección de datos en la Unión Europea y España, incluido el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD). Puede consultar dichas leyes para obtener más información:</p>
                <ul className="pl-6 list-disc">
                    <li><a href="https://www.boe.es/doue/2016/119/L00001-00088.pdf" target="_blank" rel="noopener noreferrer" className="font-bold text-link-underline">(RGPD)</a></li>
                    <li><a href="https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673" target="_blank" rel="noopener noreferrer" className="font-bold text-link-underline">(LOPDGDD)</a></li>
                </ul>
            </section>
        </div>
    </div>
  )
}
