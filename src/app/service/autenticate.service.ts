import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Autenticate } from '../interfaces/autenticate';

@Injectable({
  providedIn: 'root'
})
export class AutenticateService {

  private ipApi="http://181.196.136.7:8080/api/";
  private _headers=new HttpHeaders({'Content-Type':'application/json'});
  private _params=new HttpParams();
  constructor( private http:HttpClient ) { }

  // GetAutenticate(){
  // 	return this.http.get<Autenticate[]>(this.ipApi+'ObtenerDatosGps');
  	
  // }
   
  GetAutenticateValidate(id :Autenticate){
    const path=`${this.ipApi}loqinAutenticate/${id.usuario}/${id.clave}`;
  	return this.http.get<[]>(path);
  	
  } 

  // GetUserInsert(users:any){
  //   const path=`${this.ipApi}crear`;
  // 	return this.http.post(path,users,{headers:this._headers});
  	
  // }

}
