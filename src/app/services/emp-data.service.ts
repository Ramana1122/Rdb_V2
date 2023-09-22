import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server } from './allservers';

@Injectable({
  providedIn: 'root'
})
export class EmpDataService {
  sendDataEmp(employee10: any) {
    throw new Error('Method not implemented.');
  }
  getReportee(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  private empId: string = "";
  private  empName:EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient, private serverService:server) {}

  getEmployeeById(employeeId: string): Observable<any> {
    const apiUrl = this.serverService.ServerUrls +'employee/' + employeeId;
    return this.http.get(apiUrl);
  }

  getId(): string {
    return this.empId;
  }

  setName(empName: string): void {
    this.empName.emit(empName);
  }
  
  getName(): any {
    return this.empName;
  }

  setId(empId: string): void {
    this.empId = empId;
  }
}
