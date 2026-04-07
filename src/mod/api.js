import * as utilHtml from '../util/html.js';
import * as utilStorage from '../util/storage.js';
import * as uiScreen from '../ui/screen.js';
import * as i18nTranslate from '../i18n/translate.js';

const modMap = {
    'openpb/util/html': utilHtml,
    'openpb/util/storage': utilStorage,
    'openpb/ui/screen': uiScreen,
    'openpb/i18n/translate': i18nTranslate
};

export function evalInModAPIContext(code){
    const require = function(modName){
        return modMap[modName];
    }

    return eval(code);
}
