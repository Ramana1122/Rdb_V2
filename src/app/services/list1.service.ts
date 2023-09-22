// list.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse {
  Value: string;
  Count: number;
  Percentage: string;
  Count1: number;
  ShortValue:string;
  Count2: number;
  Count3: number;
  Count4: number;
  Count5: number;
  Count6: number;
  Count7: number;
  Count8: number;
  Count9: number;
  Count10: number;
}

@Injectable({
  providedIn: 'root'
})
export class List1Service {
  private apiUrl = 'http://nhsappchna6210.cscidp.net/rdb/api/employee';
  private readonly pivotValue = 'Release';
  private readonly pivotValue1 = 'Designation';
  private readonly pivotValue2 = 'Resigned';
  private readonly pivotValue3 = 'ONBOARDING';
  private readonly pivotValue4 = 'PRODUCT_WORK_AREA';

 
  constructor(private http: HttpClient) { }
  fetchData(): Observable<ApiResponse[]> {

    const url = `${this.apiUrl}?pivot=${this.pivotValue}`;

    return this.http.get<ApiResponse[]>(url);

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
    let url1 = 'http://nhsappchna6210.cscidp.net/rdb/api/Employee?pivot=${params.pivot}&product=${params.product}&${params.Location}&group=${params.Group}'
    return this.http.get<any[]>(url1);

  }

  

  fetchDataForDesignation(): Observable<ApiResponse[]> {

    const url = `${this.apiUrl}?pivot=${this.pivotValue1}`;

    return this.http.get<ApiResponse[]>(url);

  }

  getDropdownValues(domaincode: string): Observable<any> {

    return this.http.get('http://nhsappchna6210.cscidp.net/rdb/api/ValueSet?DomainCode=' + domaincode);

  }

 

  fetchDataForResigned(): Observable<ApiResponse[]> {

    const url = `${this.apiUrl}?pivot=${this.pivotValue2}`;

    return this.http.get<ApiResponse[]>(url);

  }

 

  fetchDataForOnboarding(): Observable<ApiResponse[]> {

    const url = `${this.apiUrl}?pivot=${this.pivotValue3}`;

    return this.http.get<ApiResponse[]>(url);

  }
  fetchDataForTeam(): Observable<ApiResponse[]> {

    const url = `${this.apiUrl}?pivot=${this.pivotValue4}`;

    return this.http.get<ApiResponse[]>(url);

  }

  // getDataWithTodaysDate(): Observable<any> {
  //   const currentDate = new Date();
  //   const formattedDate = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1)
  //     .toString()
  //     .padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}`;

  //   const url = `${this.apiUrl}?Param=date_of_leaving&OP=ge&Value=${formattedDate}`;
  //   return this.http.get(url);
  // }

 
  
}