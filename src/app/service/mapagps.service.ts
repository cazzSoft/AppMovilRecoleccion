import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PuntoRuta } from "../interfaces/punto-ruta";

@Injectable({
  providedIn: 'root'
})
export class MapagpsService {

  constructor(private http:HttpClient) { }
  private ipApi="http://181.196.136.7:8080/api/";

  private objectSourcePuntoInteres= new BehaviorSubject<{}>({});
  $getObjectSourcePI=this.objectSourcePuntoInteres.asObservable();

  sendObjectSourcePuntoInteres(data:any){
    this.objectSourcePuntoInteres.next(data);
  }

  GetCarros(id:String){
    const path=`${this.ipApi}carrosUser/${id}`;
  	return this.http.get<[]>(path);
    //return this.http.post(this.ipApi,usuario,{responseType: 'text'});
  }

  GetpuntoInteres(id:String){
    const path=`${this.ipApi}puntoInteres/${id}`;
  	return this.http.get<[]>(path);
    
  }

  GetpuntoRutaId(id:any){
    const path=`${this.ipApi}obtenerRutId/${id}`;
  	return this.http.get<[]>(path);
  }
   
  GetRuta(ruta:String){
    const path=`${this.ipApi}obtenerRuta/${ruta}`;
  	return this.http.get<PuntoRuta>(path);
  }
  postPunto(data:any){
    const path=`${this.ipApi}postPuntoReferencia`;
  	return this.http.post(path,data,{responseType: 'text'});
  }

  postPuntoRuta(data:any){
    const path=`${this.ipApi}postPuntoReferenciaRuta`;
  	return this.http.post(path,data,{responseType: 'text'});
  }

  postNotificacion(data:any){
    const path=`${this.ipApi}notificacion`;
  	return this.http.post(path,data,{responseType: 'text'});
  }
  
  getNotificacion(id:any){
    const path=`${this.ipApi}obtenerNotificacion/${id}`;
  	return this.http.get<[]>(path);
  }
  
  getPuntoInteres(id:any){
    const path=`${this.ipApi}puntoInteres/${id}`;
  	return this.http.get<[]>(path);
  } 
  updateNotificacionPunto(data:any){
    const path=`${this.ipApi}postPuntoReferencia/${data.idpunto_de_referencia}`;
  	return this.http.put(path,data,{responseType: 'text'});
  }

  updateNotificacionRuta(data:any){
    const path=`${this.ipApi}notificacion/${data.idnotificacion}`;
  	return this.http.put(path,data,{responseType: 'text'});
  }

  updateNotificacionDistancia(data:any){
    const path=`${this.ipApi}postNotificacionDistancia`;
  	return this.http.post(path,data,{responseType: 'text'});
  }

  getHorarios(id:any){
    const path=`${this.ipApi}obtenrHorario/${id}`;
  	return this.http.get<[]>(path);
  } 

  deletePuntoRuta(id:any){
    const path=`${this.ipApi}postPuntoReferenciaRuta/${id}`;
  	return this.http.delete(path);
  }

  GetRutaCercana(lat:String,lng:String,idp:any,idr:any){
    const path=`${this.ipApi}rutaCercana/${lat}/${lng}/${idp}/${idr}`;
  	return this.http.get<PuntoRuta>(path);
  }
}
