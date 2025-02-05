/* eslint-disable react/prop-types */

export function FAQNavBar({activeTab, setActiveTab}) {

  return (
    <div>                    {/* Barra de navegación por pestañas */}
    <nav className="flex justify-center p-4 text-xs rounded lg:text-sm bg-slate-800">
        <ul className="flex items-center gap-4">
            <li>
                <button
                    className={`text-white hover:font-bold ${activeTab === "categories" ? "font-bold" : ""}`}
                    onClick={() => setActiveTab("categories")}
                >
                    <span className="text-white">Estados o listas</span>
                </button>
            </li>
            <li>
                <button
                    className={`text-white hover:font-bold ${activeTab === "icons" ? "font-bold" : ""}`}
                    onClick={() => setActiveTab("icons")}
                >
                    <span className="text-white">Significado de los iconos</span>
                </button>
            </li>
            <li>
                <button
                    className={`text-white hover:font-bold ${activeTab === "problems" ? "font-bold" : ""}`}
                    onClick={() => setActiveTab("problems")}
                >
                    <span className="text-white">Problemas e información</span>
                </button>
            </li>
        </ul>
    </nav></div>
  )
}
