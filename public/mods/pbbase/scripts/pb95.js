const { get } = require('openpb/storage');
const { onGameStartup } = require('openpb/events');
const { menuRoot } = require('openpb/osManager');

class PB95 extends get('PBBase') {
    name = 'PB 95';

    async startUp(){

    }
}

onGameStartup(() => {
    menuRoot.get('PB').add(new PB95());
});
