import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

import { server } from './allservers';




@Injectable({

  providedIn: 'root'

})




export class ReportsService {

 




  // private apiUrl = this.serverService.ServerUrls+'employee?Param=status&OP=eq&Value=A';

  // private additionalDataUrl = this.serverService.ServerUrls+'employee?Param=status&OP=eq&Value=d';

  // private dataUrl = this.serverService.ServerUrls+'employee';

 




  constructor(private http: HttpClient, private serverService:server) { }





  getEmployees(): Observable<any> {

    return this.http.get<any>(this.serverService.ServerUrls +'employee?Param=status&OP=eq&Value=A');

  }




  getAdditionalData(): Observable<any> {

    return this.http.get<any>(this.serverService.ServerUrls+'employee?Param=status&OP=eq&Value=d');

  }

  getEmployeesByDate(operator: string, value: any): Observable<any> {

    const params = new HttpParams()

      .set('Param', 'date_of_leaving')

      .set('OP', operator)

      .set('Value', value);




    return this.http.get<any>(this.serverService.ServerUrls+'employee', { params });

  }





  ////////////////////////////////////////




  searchEmployeeById(employeeId: string) {

    return this.http.get(this.serverService.ServerUrls + 'employee' + `/${employeeId}`).pipe(

      catchError((error: HttpErrorResponse) => {

        // Handle the error appropriately

        console.error('An error occurred:', error.message)

        // You can perform additional error handling here, such as displaying an error message to the user

        // Modify the error message as needed

        const errorMessage = 'An internal server error occurred. Please try again later.';

        // Rethrow the error to propagate it further

        return throwError(errorMessage);

      })

    );

  }

}