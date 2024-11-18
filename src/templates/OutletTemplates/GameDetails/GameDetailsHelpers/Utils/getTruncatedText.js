export const getTruncatedText = (text) => {
    const maxCharacters = window.innerWidth < 640 ? 200 : 500;
    return text?.length > maxCharacters 
        ? `${text.substring(0, maxCharacters)}...` 
        : text;
};