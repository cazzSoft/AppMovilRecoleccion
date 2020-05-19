import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private ipApi="http://181.196.136.7:8080/api/";
  private objectSource= new BehaviorSubject<{}>({});
  $getObjectSource=this.objectSource.asObservable();

  constructor(private http:HttpClient) { }


  sendObjectSource(data:any){
    this.objectSource.next(data);
  }

  Getencuesta(id:String){
    const path=`${this.ipApi}Getevaluacion/${id}`;
  	return this.http.get<[]>(path);
  }

  GetPreguntas(id:String){
    const path=`${this.ipApi}GetevaluacionPregunta/${id}`;
  	return this.http.get<[]>(path);
  }
}
