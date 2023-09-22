import { Component, OnInit,Input} from '@angular/core';
import { EmpDataService } from '../services/emp-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { server } from '../services/allservers';
import { EmployeeService } from '../services/employee.service';
import { MyapiService } from '../services/myapi.service';

@Component({
  selector: 'app-mydetails',
  templateUrl: './mydetails.component.html',
  styleUrls: ['./mydetails.component.css']
})

export class MydetailsComponent implements OnInit {


  activeButton = 'profile';
  empId: string | null;
  employee10: any;
  resignedemployee: any;
  temp1: any;
  data1: any;
  empId1: any;
  mydata: any;
  totaldata: any;

  // ... (other properties and methods)

  setActiveButton(button: string) {
    this.activeButton = button;
  }


  employeeId: string = '';

  data: any;
  employee: any;

  dateString: string = '';

  myDetails: boolean = false;
  employeeData: any;
  employeeData2: any;
  employeeData3: any;
  isReportees = true;
  Data2: any[] = []

  showDetails: boolean = false;
  ReportDetails: boolean = false;
  currentPage: string = "";
  button: boolean = false;
  popDetails: boolean = false;
  editDetails: boolean = false;

  isActive: boolean = true;
  isActiveButtonActive: boolean = true; // Track the active button

  isResignedButtonActive: boolean = false;
  isaddButtonActive: boolean = false;
  // temp: any;



  constructor(private services: EmployeeService, private MyapiService:MyapiService,private employeeService: EmpDataService, private datePipe: DatePipe, private router: Router, public dataSer: server, private es: EmployeeService) {
    this.empId = sessionStorage.getItem("empId");
    this.readdata(this.empId)
  }
  ngOnInit(): void {
    this.data1 =  this.MyapiService.getId()

    this.services.getReportee(this.employeeService.getId(), 'reportee').subscribe((data) => {
      if (data && data.length > 0) {
        this.button = true;
      }
    })

    this.employeeId = this.employeeService.getId();
    if (this.employeeId == "") {
      this.router.navigateByUrl('/login');
    } else {
      console.log(this.employeeId);
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (data) => {
          // console.log(data);
          if (data) {
            this.employee = data;
          }
        },
        (error) => {
          console.error(error);
        }
      )
    }
    this.dataSer.setProfileObs(true);

    this.es.getResignedReportee(this.employeeId, 'reportee').subscribe(

      (data) => {

        this.resignedemployee = data;
        // this.temp = data;
        console.log(this.resignedemployee)

      },

      (error) => {

        console.error(error);

      }

    );

    this.es.getemployessDeta(this.employeeId, 'reportee', 'peer').subscribe(
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

    const storedEmpId = sessionStorage.getItem('empId');
    if (storedEmpId) {
      this.readdata(storedEmpId);
    }


  }

  openpop(empId1: any): void {
    // sessionStorage.setItem('empId', empId);
    // sessionStorage.setItem('empId', empId);
    this.empId1=this.data1;
    this.showDetails = true;
    this.popDetails = false;
    this.ReportDetails = true;
    this.editDetails=false;
    this.readdata(empId1)
  }
  openpop2(empId: any): void {
    // sessionStorage.setItem('empId', empId);
    // sessionStorage.setItem('empId', empId);
    this.editDetails = !this.editDetails;
    this.ReportDetails = false;
    this.popDetails = false;
    this.editDetails=true;
    console.log(empId);
    this.MyapiService.getdata(empId).subscribe(
      (data7:any) => {
        this.totaldata=data7;
        console.log("jycycys"+this.totaldata)
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  openpop1(empId: any): void {
    // sessionStorage.setItem('empId', empId);
    // sessionStorage.setItem('empId', empId);
    this.ReportDetails = true;
    this.popDetails = false;
    this.editDetails=false;

    this.readdata(empId)
  }

  

  readdata(empId: any) {
    this.MyapiService.getdata(empId).subscribe(
      (response: any) => {
        console.log("msg"+response.EmployeeCode)
        this.data1=response.EmployeeCode;
        this.MyapiService.setId(this.data1);
    
        //this.data1 =  this.MyapiService.getId()
    
        console.log("My"+this.data1)
        if (empId == response.EmployeeCode) {
          this.employee10 = response;
          console.log(this.employee10);
        }
      })
      // this.MyapiService.getId(this.response);
  }

  filterState: string = 'all'; // Default to 'all'

  // Define a function to add an employee (You can replace this with your actual implementation)
  addEmployee() {

    this.popDetails = !this.popDetails;
    // this.ReportDetails=this.ReportDetails;
    this.ReportDetails = false;
    this.isActiveButtonActive = false;
    this.editDetails=false;

    this.isResignedButtonActive = false;
    this.isaddButtonActive = true;



  }
  imageUploaded(sets:any){
this.editDetails = false;
  }

  // Define a function to filter active employees
  filterActive() {
    this.isActive = true;
    // this.temp1 = this.employeeData2;

    this.isActiveButtonActive = true;

    this.isResignedButtonActive = false;
    // this.temp = [];
    this.ReportDetails = false;
    this.editDetails=false;
    this.popDetails=false;
    this.isaddButtonActive = false;
  }

  // Define a function to filter resigned employees
  filterResigned() {
    // Add your logic to filter and display resigned employees
    // this.temp = this.resignedemployee;
    this.isActive = false;
    // this.temp1 = [];

    this.isActiveButtonActive = false;
    this.ReportDetails = false;

    this.isResignedButtonActive = true;
    this.popDetails = false;
    this.editDetails=false;
    this.isaddButtonActive = false;
  }
}