export class ModLoader {
    #root; 
    #modList = [];

    async init(){
        this.#root = await navigator.storage.getDirectory();
        
        const modsDir = await this.#root.getDirectoryHandle('mods', { create: true });
        await modsDir.getFileHandle('1', { create: true });
        await modsDir.getFileHandle('2', { create: true });

        for await (let entry of modsDir.entries()){
            console.log(entry);
        }
    }
}   
