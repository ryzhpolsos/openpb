const escapeHTMLMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

export function escapeHTML(string){
    return string.replace(/[&<>"']/g, m => escapeHTMLMap[m]);
}

export function html(strings, ...values){
    return strings.reduce((acc, str, i) => acc + str + escapeHTML(values[i]), '');
}
