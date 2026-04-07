const storage = {};

export function get(name){
    return storage[name];
}

export function set(name, value){
    storage[name] = value;
}
