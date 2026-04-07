const dict = {};
let lang = navigator.language;
let fallbackLang = 'en-US';

export function setLanguage(langCode){
    lang = langCode;
}

export function setFallbackLanguage(langCode){
    fallbackLang = langCode;
}

export function addTranslation(langCode, data){
    if(!dict[langCode]) dict[langCode] = {};
    Object.assign(dict[langCode], data);
}

export function translate(string){
    if(!dict[lang]) return dict[fallbackLang][string];
    return dict[lang][string] ?? dict[fallbackLang][string];
}

export function tr(string){
    return translate(string);
}
