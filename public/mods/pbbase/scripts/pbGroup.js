const { onGameStartup } = require('openpb/events');
const { menuRoot, OSGroup } = require('openpb/osManager');

onGameStartup(() => {
    menuRoot.add(new OSGroup('PB'));
});
