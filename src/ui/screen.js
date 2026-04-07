const screens = {};

class Screen {
    element = null;

    constructor(name){
        this.element = document.createElement('div');
        this.element.className = 'openpb-core--screen';
        this.deactivate();
        screens[name] = this;
    }

    activate(){
        for(let screen of Object.values(screens)) screen.deactivate();
        this.element.style.display = 'block';
    }

    deactivate(){
        this.element.style.display = 'none';
    }

    setHTML(html){
        this.element.innerHTML = html;
    }
}

export function getScreen(name){
    return screens[name];
}
