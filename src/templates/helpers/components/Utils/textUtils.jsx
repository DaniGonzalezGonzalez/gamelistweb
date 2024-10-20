// Función para dividir el texto 
export function formatTextAsParagraphs(text) {
    if (!text) return [];

    // Primero, dividir el texto en partes donde aparezca "El juego" o "La jugabilidad"
    const paragraphs = text.split(/(El juego\s|La jugabilidad\s)/g);

    let result = [];
    let currentParagraph = '';

    // Procesar las divisiones para combinar adecuadamente los textos sin separar innecesariamente
    paragraphs.forEach(part => {
        if (part === "El juego " || part === "La jugabilidad ") {
            // Si ya hay texto acumulado, agregamos lo que se ha juntado hasta ahora
            if (currentParagraph) {
                result.push(currentParagraph.trim());
            }
            // Reiniciar el párrafo con el marcador actual
            currentParagraph = part;
        } else {
            // Si no es un marcador, agregar el texto al párrafo actual
            currentParagraph += part;
        }
    });

    // Añadir el último párrafo si existe
    if (currentParagraph) {
        result.push(currentParagraph.trim());
    }

    return result;
}


// Función para poner en negrita las palabras clave
export const highlightKeywords = (text, keywordsWithStyles) => {
    let formattedText = text;

    keywordsWithStyles.forEach(([keyword, style]) => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        const replacement = `<span class="${style}">$1</span>`;
        formattedText = formattedText.replace(regex, replacement);
    });

    return formattedText;
};