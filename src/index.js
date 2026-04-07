import { ModLoader }  from './mod/loader.js';

window.addEventListener('load', async () => {
    const loader = new ModLoader();
    await loader.init();
});
