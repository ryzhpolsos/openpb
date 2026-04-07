import { fileExists, dirExists, getFile, readFile } from '../util/fs.js';
import { addTranslation } from '../i18n/translate.js';
import { evalInModAPIContext } from './api.js';

export class ModLoader {
    #root; 
    #modList = [];

    async init(){
        this.#root = await navigator.storage.getDirectory();
        const modsDir = await this.#root.getDirectoryHandle('mods', { create: true });

        if(/[?&]fmc/.test(location.search) || !await fileExists(modsDir, '.coreModsCopied')){
            await this.copyCoreMods(modsDir);
        }

        for await (let [ name, handle ] of modsDir.entries()){
            if(handle.kind != 'directory') continue;
            console.log(`Loading mod: ${name}`);
            
            try{
                await this.loadMod(handle);
                console.log(`Loaded mod: ${name}`);
            }catch(e){
                console.error(`Mod "${name}" loading failed: ${e}`);
            }
        }
    }

    async copyCoreMods(modsDir){
        const fileList = (await (await fetch('/mods/list.txt')).text()).split('\n');

        for(let file of fileList){
            console.log(`Copying file: ${file}`);

            const blob = await (await fetch(`/mods/${file}`)).blob();
            const stream = await (await getFile(modsDir, file)).createWritable();
            await stream.write(blob);
            await stream.close();
        }

        await modsDir.getFileHandle('.coreModsCopied', { create: true });
    }

    async loadMod(modDir){
        if(!await fileExists(modDir, 'mod.json')) return;
        
        if(await dirExists(modDir, 'css')){
            for await (let [ name, handle ] of (await modDir.getDirectoryHandle('css')).entries()){
                console.log(`Applying CSS: ${name}...`);
                const style = document.createElement('style');
                style.innerHTML = await (await handle.getFile()).text();
                document.head.appendChild(style);
            }
        }

        if(await dirExists(modDir, 'scripts')){
            for await (let [ name, handle ] of (await modDir.getDirectoryHandle('scripts')).entries()){
                try{
                    console.log(`Running script: ${name}...`);
                    evalInModAPIContext(await (await handle.getFile()).text());
                }catch(e){
                    console.error(`Script "${name}" failed: ${e}`);
                }
            }
        }

        if(await dirExists(modDir, 'translates')){
            for await (let [ name, handle ] of (await modDir.getDirectoryHandle('translates').entries())){
                let splittedName = name.split('.').pop();
                splittedName.pop();
                let langName = splittedName.join('.');

                addTranslation(langName, await (await handle.getFile()).text());
            }
        }
    }
}   
