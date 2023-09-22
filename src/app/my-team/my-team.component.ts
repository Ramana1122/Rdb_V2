import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EmpDataService } from '../services/emp-data.service';
import * as XLSX from 'xlsx';
import { server } from '../services/allservers';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  showPrintButton:boolean=true;
  Employees: any;
  selectedEmployee: any;
  currentUser:any;
  Employees1:any;
  Employeesby:any;
  Employees2:any;
  dialog: any;

  logged:any;
  isReportees=true;

  //for api
  employeeData: any;
  employeeData2:any;
  employeeData3:any;
  employeeId1: any;

constructor(private employeeService: EmployeeService,private router: Router,private empservice : EmpDataService,public dataSer:server) { 
   
}

ngOnInit(): void {

  this.employeeId1 =  this.empservice.getId()// 1553640; 

  ///////////////////////for merge

 

if(this.employeeId1=="" ){

    this.router.navigateByUrl('/login');

  }else{

        ///////////////////////for merge

  this.employeeService.getemployessDeta(

    this.employeeId1, 'reportee',

   'peer'

   ).subscribe(

     (data) => {

       console.log('Logger api Data:', data);

       this.employeeData = data[0];

       this.employeeData2 = data[1];

       this.employeeData3 = data[2];

   

       if (this.employeeData2.length === 0) {

         this.isReportees = false;

       }

     },

     (error) => {

       console.error(error);

     }

   );

  }
  this.dataSer.setProfileObs(true);
 
} 

openpop(empId: any) {
  sessionStorage.setItem('empId', empId);
  this.router.navigateByUrl('/admin/details');
}
  openpop1(empId: any) {

    sessionStorage.setItem('empId', empId);

    this.router.navigateByUrl(`/admin/editdetails/${empId}`);

}


downloadEmployeeDetails(): void {
  const selectedData = this.employeeData3.map((employee: any) => ({
    'Employee Name': employee['EmployeeName'],
    'Mail Id': employee['Employee_MailId']
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, 'employee_details');
}

private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  const url: string = window.URL.createObjectURL(data);
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = fileName + '.xlsx';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

}