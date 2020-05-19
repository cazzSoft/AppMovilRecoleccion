import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  private ipApi="http://181.196.136.7:8080/api/" ;
  
  constructor(private http:HttpClient) { }


  PostOpinion(opinios:any){
    const path=`${this.ipApi}postOpinion`;
  	return this.http.post(path,opinios,{responseType: 'text'});
  }
}
