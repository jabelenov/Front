import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";


@Injectable({
    providedIn: 'root'
  })
  export class BikeService {

    baseUrl = environment.apiUrl + 'api/v1/bikes'

    constructor(private httpClient: HttpClient){}

    findAll(): Observable<any>{
        return this.httpClient.get<any>(this.baseUrl)
    }

    buyBike(request: any): Observable<any>{
        return this.httpClient.post<any>(this.baseUrl, request)
    }

    addCart(id: Number): Observable<any>{
        return this.httpClient.put<any>(this.baseUrl + '/cart/' + id, null)
    }

    deleteCart(id: Number): Observable<any>{
        return this.httpClient.put<any>(this.baseUrl + '/cart/delete/' + id, null)
    }

    findAllCart(): Observable<any>{
        return this.httpClient.get<any>(this.baseUrl + '/cart/bike')
    }


  }