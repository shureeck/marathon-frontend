export const getTranslation = (obj) => {
    const loc = localStorage.getItem("loc");
    let text;
    switch (loc) {
        case "pl":
            text = obj.pl;
            break
        case "en":
            text = obj.en;
            break;
        default:
            text = obj.name;
    }

    return text || obj.name;
}