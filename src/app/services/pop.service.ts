import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from './allservers';

@Injectable({
  providedIn: 'root'
})
export class PopService {


  httpOp : any;

  constructor(private http:HttpClient, private serverService:server) { }

getEmployees():Observable<any> {
return this.http.get(this.serverService.ServerUrls+"employee");
}
getDetails(id:number):Observable<any>{
  return this.http.get(this.serverService.ServerUrls+"employee"+id);
}
postEmployees(obj:any):Observable<any>{

 this.httpOp= new HttpHeaders({
'Content-Type':'application.json',
 })
 return this.http.post(this.serverService.ServerUrls+"employee",obj,this.httpOp);
 }
  httpOptions(arg0: string, obj: any, httpOptions: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
getdesigination(domaincode:string){
  return this.http.get(this.serverService.ServerUrls+"ValueSet?DomainCode="+domaincode)
}

}