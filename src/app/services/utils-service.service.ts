import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public setId(): string {
    var txt = ''
    let length = 10;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }

  private _getCircularReplacer = () => {
    const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
  }

  public store(key: string, any: any): void {
    localStorage[key] = JSON.stringify(any);
    console.log("🚀 ~ file: utils-service.service.ts ~ line 35 ~ UtilsService ~ store ~ localStorage[key]", localStorage[key])
    
  }

  public load(key: string): any {
    var str = localStorage[key] || null;
    
    return JSON.parse(str);
  }
}
                                                                                                                                                                                        