import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

 private ipApi="http://181.196.136.7:8080/api/";
  // private ipApi="http://apprecoleccion.test/api/";
  constructor(private http:HttpClient) { }

  getPuntosFerencia(id:string){
    const path=`${this.ipApi}puntoInteres/${id}`;
  	return this.http.get<[]>(path);
  }
}
