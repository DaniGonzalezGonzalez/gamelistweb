/* eslint-disable react/prop-types */

export function FAQNavBar({activeTab, setActiveTab}) {

  return (
    <div>                    {/* Barra de navegación por pestañas */}
    <nav className="flex justify-center p-4 text-xs rounded bg-slate-800">
        <ul className="flex items-center gap-4">
            <li>
                <button
                    className={`text-white hover:underline ${activeTab === "categories" ? "underline" : ""}`}
                    onClick={() => setActiveTab("categories")}
                >
                    Categorías o colecciones
                </button>
            </li>
            <li>
                <button
                    className={`text-white hover:underline ${activeTab === "icons" ? "underline" : ""}`}
                    onClick={() => setActiveTab("icons")}
                >
                    Significado de los iconos
                </button>
            </li>
            <li>
                <button
                    className={`text-white hover:underline ${activeTab === "problems" ? "underline" : ""}`}
                    onClick={() => setActiveTab("problems")}
                >
                    Problemas e información
                </button>
            </li>
        </ul>
    </nav></div>
  )
}
