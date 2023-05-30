import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"

@Injectable({
    providedIn: 'root'
  })
  export class BuyBikeService {

    baseUrl = environment.apiUrl + 'api/v1/buy'

    constructor(private httpClient: HttpClient){}

    findAll(): Observable<any>{
        return this.httpClient.get<any>(this.baseUrl)
    }

    buyBike(request: any): Observable<any>{
        return this.httpClient.post<any>(this.baseUrl, request)
    }

    buyProductCar(clientId: Number, productId: Number[]): Observable<any>{
        return this.httpClient.post<any>(this.baseUrl + '/cart/' + clientId, productId);
      }


  }