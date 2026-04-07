export async function fileExists(directory, fileName){
    try{
        await directory.getFileHandle(fileName);
        return true;
    }catch(e){
        if(e.name == 'NotFoundError') return false;
        throw e;
    }
}

export async function dirExists(directory, dirName){
    try {
        await directory.getDirectoryHandle(dirName);
        return true;
    }catch(e){
        if(e.name == 'NotFoundError') return false;
        throw e;
    }
}

export async function getFile(directory, path, create = true){
    let splittedPath = path.split('/');
    let fileName = splittedPath.pop();

    for(let part of splittedPath){
        directory = await directory.getDirectoryHandle(part, { create });
    }

    return directory.getFileHandle(fileName, { create });
}

export async function readFile(directory, name, type = 'text'){
    const file = await (await directory.getFileHandle(name)).getFile();

    switch(type){
        case 'text': {
            return await file.text();
        }

        case 'blob': {
            return file;
        }

        case 'url': {
            return URL.createObjectURL(file);
        }
    }
}
