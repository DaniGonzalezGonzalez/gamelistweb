import React from "react"

export const ResumenJuego = ({
  juego,
  keywordStyles,
  formatTextAsParagraphs,
  highlightKeywords,
  truncatedText,
  isExpanded,
  setIsExpanded,
}) => {
  return (
    <div className="p-4 mt-4 border border-gray-500 lg:p-6 lg:mt-10 rounded-xl">
      <h3 className="text-base font-bold lg:text-2xl text-start">Resumen</h3>
      {/* Mostramos el resumen del juego, con más o menos info */}
      <div className={`text-container relative ${isExpanded ? "expanded" : ""}`}>
        {isExpanded
          ? formatTextAsParagraphs(
              highlightKeywords(juego.datosExtraJuego, keywordStyles)
            ).map((paragraph, index) => (
              <p
                key={index}
                className={`mt-4 text-[13px] text-justify sm:text-sm ${
                  index === 0 ? "first-paragraph" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></p>
            ))
          : formatTextAsParagraphs(
              highlightKeywords(truncatedText, keywordStyles)
            ).map((paragraph, index) => (
              <p
                key={index}
                className={`mt-4 text-[13px] text-justify sm:text-sm ${
                  index === 0 ? "first-paragraph" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></p>
            ))}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-black to-transparent"></div>
        )}
      </div>
      <button
        className="mt-2 text-xs text-blue-500 text-link-underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <span className="text-blue-500">Leer menos</span>
        ) : (
          <span className="text-blue-500">Leer más</span>
        )}
      </button>
    </div>
  )
}
