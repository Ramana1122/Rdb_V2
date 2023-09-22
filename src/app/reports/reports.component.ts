import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../services/employee.service';
import { DataService } from '../services/dataservice.service';
import * as XLSX from 'xlsx';
import { server } from '../services/allservers';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  currentTab: string = 'tab1';
  employees: any[] = [];
  additionalData: any[] = [];
  operator: string = 'lt';
  selectedDate:  any;
  e1: any;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private reportsService: ReportsService,
    private datePipe: DatePipe,
    private datas: DataService,
    public dataSer:server
  ) {}

  ngOnInit() {
    this.dataSer.setProfileObs(true);
    this.getCurrentDate();
    this.getEmployees();
    this.getAdditionalData();
  }

  changeTab(tab: string) {
    this.currentTab = tab;
    if (tab === 'tab1') {
      this.getEmployees();
    } else if (tab === 'tab2') {
      if (this.selectedDate) {
        this.getEmployeesByDate();
      } else {
        this.getAdditionalData();
      }
    } else {
      this.getAdditionalData();
    }
  }

  onOperatorChange() {
    if (this.currentTab === 'tab2' && this.selectedDate) {
      this.getEmployeesByDate();
    }
  }

  onDateSelected(selectedDate: string) {
    this.selectedDate = selectedDate;
    if (this.currentTab === 'tab2') {
      this.getEmployeesByDate();
    }
  }

  getEmployees() {
    this.reportsService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  navigateToEmployeeDetails(employeeId: string) {
    console.log('Employee ID:', employeeId);
    this.router.navigate(['admin/active/', employeeId]);
    this.datas.getDetails1(employeeId).subscribe(data1 => {
      this.e1 = data1;
    });
  }

  navigateToEmployeeDetail(employeeId: string) {
    console.log('Employee ID:', employeeId);
    this.router.navigate(['admin/active/', employeeId]);
    this.datas.getDetails(employeeId).subscribe(data1 => {
      this.e1 = data1;
    });
  }

  getAdditionalData() {
    this.reportsService.getAdditionalData().subscribe(data => {
      this.additionalData = data;
    });
  }

  getEmployeesByDate() {
    this.reportsService.getEmployeesByDate(this.operator, this.selectedDate).subscribe(data => {
      this.additionalData = data;
    });
  }

  getCurrentDate() {
    const today: Date = new Date();
    this.selectedDate = this.datePipe.transform(today, 'yyyy/MM/dd') || ''; // Use the DatePipe to format the date
    console.log("selectedDate",this.selectedDate)
  }
  downloadEmployeeData(): void {
    let data: any[] = [];
    if (this.currentTab === 'tab1') {
      this.reportsService.getEmployees().subscribe(response => {
        data = response.map((employee: { EmployeeCode: any; EmployeeName: any; Product: any; ManagerName: any; }) => ({
          'Employee Code': employee.EmployeeCode,
          'Employee Name': employee.EmployeeName,
          'Project': employee.Product,
          'Manager Name': employee.ManagerName
        }));
        this.exportToExcel(data);
      });
    } else if (this.currentTab === 'tab2') {
      this.reportsService.getEmployeesByDate(this.operator,this.selectedDate).subscribe(response => {
        data = response.map((employee: { EmployeeCode: any; EmployeeName: any; Product: any; ManagerName: any; DateofLeaving:any}) => ({
          'Employee Code': employee.EmployeeCode,
          'Employee Name': employee.EmployeeName,
          'Project': employee.Product,
          'Manager Name': employee.ManagerName,
          'Date Of Leaving': this.datePipe.transform(employee.DateofLeaving, 'dd/MMM/yyyy')
        }));
        this.exportToExcel(data);
      });
    }
  }

  private exportToExcel(data: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'employee_data');
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
