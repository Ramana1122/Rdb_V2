import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { server } from './allservers';


@Injectable({
  providedIn: 'root'
})
export class LogService {
 httpOptions:any;
 username:String='';
 usertype:String='';
 token:any='';
 email:any='';
 status:boolean=false;
 checkData = new BehaviorSubject(0);
 
  constructor(private http:HttpClient, private serverService:server) {
      let username=sessionStorage.getItem("username");
      let usertype=sessionStorage.getItem("usertype");
      let token=sessionStorage.getItem("token");
      let email=sessionStorage.getItem("email");
      if(username&&usertype){
        this.status=true;
        this.username=username;
        this.usertype=usertype;
        this.token=token;
        this.email=email;
      }
   }

   getResponse(){
    return this.checkData;
   }

  getStatus():boolean{
    return this.status;
  }

  // To Register a User
  register(obj:any):Observable<object>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    }
    return this.http.post("http://localhost:3004/users",obj,this.httpOptions);
  }

  //To check avalailability of mail id and username

  check(str:any):Observable<object>{
    return this.http.get("http://localhost:3004/users?username"+str,this.httpOptions);
  }

// to Login
  login(id:any,password:any):Observable<object>{
 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
  
      })
    }
    return this.http.get("http://localhost:3004/users");
  }

  logout():void{
     this.token="";
     this.username="";
     this.usertype="";
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("username");
     sessionStorage.removeItem("usertype");
     sessionStorage.removeItem("email");
  }

  getUserDetails(){
    return this.http.get("http://localhost:3004/users").pipe(map( (data:any) => {
      return data
    }))

    
  }

  updatePassword(newPassword: string): Observable<object> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}` // Assuming you have a token stored
      })
    };

    const body = { password: newPassword };

    return this.http.put("http://localhost:4567/users", body, this.httpOptions);
  }


  getData(employeeid: number, password:any): Observable<any> {
    
    const url = this.serverService.ServerUrls+"login?ID="+employeeid+"&Password="+password;

    return this.http.get<any>(url);

  }

  putData(employee:any): Observable<any> {
    
    const url = this.serverService.ServerUrls+"employee"

    return this.http.put<any>(url,employee);

  }
}