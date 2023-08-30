//Charuu..............................
import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  id: any;
  details: any;
  empId:any;
  e:any;
  employee: any;
  
  constructor(private fs : EmployeeService){
    this.empId = sessionStorage.getItem("empId");
    this.readdata(this.empId);
  }
  
  readdata(empId: any) {
    this.fs.getEmployeeById(empId).subscribe(
      (response: any) => {
        if (empId == response.EmployeeCode){
          this.employee = response;
        }
      })

  }
}