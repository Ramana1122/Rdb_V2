import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://nhsappchna6210.cscidp.net/rdb/api/Employee?Pivot=Designation';

  apiUrl2 = 'http://nhsappchna6210.cscidp.net/rdb/api/Employee?Pivot=Release';

  apiUrl3 = 'http://nhsappchna6210.cscidp.net/rdb/api/Employee?Pivot=Resigned';

  apiUrl4 = 'http://nhsappchna6210.cscidp.net/rdb/api/Employee?Pivot=ONBOARDING';


  apiUrl5 = 'http://nhsappchna6210.cscidp.net/rdb/api/Employee?Pivot=PRODUCT_WORK_AREA'

 

  employeeCount: number = 0;
  baseUrl: any;

  constructor(private http:HttpClient) { }

 

  getData(status: string,): Observable<any>{

    const url = `${this.baseUrl}?Param=Status&OP=eq&Value=${status}`;

    return this.http.get<any>(url);

  }

 

  getDesignation(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

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

  getTeam(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl5);

  }
}
