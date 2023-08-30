import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { EmpDataService } from '../services/emp-data.service';
import * as XLSX from 'xlsx';
import { server } from '../services/allservers';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  employeeData: any;
  employeeData2: any;
  employeeData3: any;
  Data2: any[] = [];
  isReportees = true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private empService: EmpDataService,
    public dataSer:server
  ) {}

  ngOnInit(): void {
    const employeeId = this.empService.getId();

    if (employeeId === '') {
      this.router.navigateByUrl('/login');
    } else {
      this.employeeService.getemployessDeta(employeeId, 'reportee', 'peer').subscribe(
        (data) => {
          console.log('Data:', data);
          this.employeeData = data[0];
          this.employeeData2 = data[1];
          this.employeeData3 = data[2];

          if (this.employeeData2.length === 0) {
            this.isReportees = false;
          } else {
            this.Data2 = this.employeeData2.map((employee: any) => ({
              'Employee Name': employee.EmployeeName,
              'Mail Id': employee.Employee_MailId
            }));
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.dataSer.setProfileObs(true);
  }

  downloadEmployeeDetails(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Data2);
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

  openpop(empId: any): void {
    sessionStorage.setItem('empId', empId);
    this.router.navigateByUrl('/admin/details');
  }

  openpop1(empId: any): void {
    sessionStorage.setItem('empId', empId);
    this.router.navigateByUrl(`/admin/editdetails/${empId}`);
  }
}
