import { writable, Writable } from 'svelte/store';


export interface Data {
  counter:number;
  info:string;
}

const createWritableLocalStorageStore = <T>(key:string, startValue:T) => {
    const { subscribe, set, update } = writable(startValue);
    
      return {
      subscribe,
      update,
      set,
      useLocalStorage: () => {
        const json = localStorage.getItem(key);
        if (json) {
          var parsed = JSON.parse(json);
          set(parsed);
        }
        
        subscribe(current => {
          localStorage.setItem(key, JSON.stringify(current));
        });
      }
    };
  }
  
  export const data : Writable<Data[]> = createWritableLocalStorageStore('data',[]);

  export const positions: Writable<GeolocationPosition[]> = createWritableLocalStorageStore('positions',[]);
  
  