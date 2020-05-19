import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private ipApi="http://181.196.136.7:8080/api/" ;
  constructor(private http:HttpClient) { }

  PostRespuesta(request:any){
    const path=`${this.ipApi}postRespuesta`;
  	return this.http.post(path,request,{responseType: 'text'});
    //return this.http.post(this.ipApi,usuario,{responseType: 'text'});
  }
 
  PostReferencia(request:any){
    const path=`${this.ipApi}postPuntoReferencia`;
  	return this.http.post(path,request,{responseType: 'text'});
    //return this.http.post(this.ipApi,usuario,{responseType: 'text'});
  }
}
