import { Component, OnInit } from '@angular/core';
import { EmpDataService } from '../services/emp-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { server } from '../services/allservers';

@Component({
  selector: 'app-mydetails',
  templateUrl: './mydetails.component.html',
  styleUrls: ['./mydetails.component.css']
})

export class MydetailsComponent implements OnInit{
  
employeeId : string='';

employee: any;

dateString:string='';

myDetails:boolean = false;




constructor(private employeeService: EmpDataService,private datePipe: DatePipe,private router: Router,public dataSer:server) {
 }
ngOnInit(): void {
 this.employeeId = this.employeeService.getId();
 if(this.employeeId=="" ){
  this.router.navigateByUrl('/login');
}else{
    console.log(this.employeeId);
  this.employeeService.getEmployeeById(this.employeeId).subscribe(
    (data) => {
      // console.log(data);
      if(data){
        this.employee = data;
      }
    },
    (error) => {
      console.error(error);
    }
  )}
  this.dataSer.setProfileObs(true);
}
}

  



  // this.employeeService.getEmployeeById(this.employeeId).subscribe(
  //   (data) => {
  //     console.log(data);
  //     if(data && data!=undefined){
  //       this.employee = data;
  //       this.isNodata=true;
  //     }else{
  //       this.isNodata=false;
  //     }
     
  //   },
  //   (error) => {
  //     console.error(error);
  //   }

  // )