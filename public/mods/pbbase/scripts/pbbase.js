const { set } = require('openpb/storage');
const { onEarlyGameStartup } = require('openpb/events');
const { OS } = require('openpb/osManager');

class PBBase extends OS {

}

set('PBBase', PBBase);
