import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LottieService {

  constructor(private http: HttpClient) { }

  public async getLottieAnimation(): Promise<object> { 
    return this.http.get<{ answer: object }>('https://assets3.lottiefiles.com/packages/lf20_theoqtrl.json').toPromise()
    .then(data => {
      return data
    })
  }

}
