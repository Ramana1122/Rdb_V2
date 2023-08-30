import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { server } from '../services/allservers';
import { EmpDataService } from '../services/emp-data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchQuery: string = '';
  employees: Employee[] = [];

  showNoEmployeesFound: boolean = false;
  searchClicked: boolean = false;
  searchErrorMessage: string = '';
  showList: boolean = false;
  employeeId1: any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private empservice : EmpDataService,
    public dataSer:server
  ) { }

  ngOnInit() {
    this.dataSer.setProfileObs(true);
    this.employeeId1 =  this.empservice.getId()


   }
   
   

  change() {
    if (this.searchQuery.length >= 3) {
      this.searchErrorMessage = '';
      this.searchClicked = false; // Reset the search result
    } else {
      this.searchErrorMessage = '';
      this.searchClicked = false;
      this.employees = []; // Reset the employee data
    }
  }

  employeeID: any;
  isViewSelect: boolean = false;

  navigateToEmployeeDetails(employee: any) {
    this.isViewSelect = true;
    this.employeeID = employee.EmployeeCode;
  }

  onSearch() {
    this.isViewSelect = false;
    this.showList = true;

    if (this.searchQuery.trim().length >= 3) {
      this.employeeService.getData(this.searchQuery).subscribe(
        (data: Employee[]) => {
          this.employees = data;
          this.showNoEmployeesFound = this.employees.length === 0;
          this.searchClicked = true;

          if (this.showNoEmployeesFound) {
            this.toastr.warning('No employee details found.');
          }
        },
        (error: any) => {
          console.error('Error fetching employee data:', error);
          this.employees = [];
          this.showNoEmployeesFound = true;
          this.searchClicked = true;
        }
      );

      this.searchErrorMessage = '';
    } else {
      if (this.searchQuery.trim().length === 0) {
        this.toastr.error('Minimum 3 characters are required for search.');
      } else {
        this.toastr.error('Minimum 3 characters are required for search.');
      }

      this.employees = [];
      this.showNoEmployeesFound = false;
      this.searchClicked = true;
    }
  }

  downloadEmployeeDetails(): void {
    const selectedData = this.employees.map((employee: Employee) => ({
      'Employee Name': { v: employee.EmployeeName, s: { font: { bold: true } } },
              'Job Role': { v: employee.HLRole, s: { font: { bold: true } } },
              'Email ID': { v: employee.Employee_MailId, s: { font: { bold: true } } }
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

  openpop2(employee:any) {

    sessionStorage.setItem("hempId",employee.EmployeeCode);

    this.router.navigateByUrl('/admin/hist');

  }
}
