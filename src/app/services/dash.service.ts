import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';

import { server } from './allservers';
 

@Injectable({

  providedIn: 'root'

})

export class DashService {

  baseUrl = this.serverService.ServerUrls+'employee';

  apiUrl = this.serverService.ServerUrls+'Employee?Pivot=Designation';

  apiUrl2 = this.serverService.ServerUrls+'Employee?Pivot=Release';

  apiUrl3 = this.serverService.ServerUrls+'Employee?Pivot=Resigned';

  apiUrl4 = this.serverService.ServerUrls+'Employee?Pivot=ONBOARDING';

  apiUrl5 = this.serverService.ServerUrls+'Employee?Pivot=PRODUCT_WORK_AREA';

 

  employeeCount: number = 0;
  constructor(private http: HttpClient, private serverService:server) { }

 

  getData(status: string,): Observable<any>{

    const url = `${this.baseUrl}?Param=Status&OP=eq&Value=${status}`;

    return this.http.get<any>(url);

  }

 

  getDesignation(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }

  getTeam(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl5);

  }

 

  getRelease(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl2);

  }

 

  getResigned(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl3);

  }

 

  getOnboard(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl4);

  }
  getEmployeesByDesignationAndLocation(params:any): Observable<any> {

    if(!params.product){

      params.product = "";

    }

 

        if(!params.Location){

      params.Location = "";

    }

 

        if(!params.Group){

      params.Group = "";

    }

let url = `http://nhsappchna6210.cscidp.net/rdb/api/Employee?pivot=${params.pivot}&product=${params.product}&Location=${params.Location}&group=${params.Group}`

    return this.http.get<any[]>(url);

  }
}
