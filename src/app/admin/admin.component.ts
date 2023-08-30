import { Component } from '@angular/core';
import { EmpDataService } from '../services/emp-data.service';
import { server } from '../services/allservers';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  sideNavStatus:boolean=false;
  userName:string='';
  a:boolean=false;
  toggleSideNav() {
    this.sideNavStatus = !this.sideNavStatus;
  }
  
  constructor(private employeeService: EmpDataService,public dataCom:server) { 

  }

  
  ngOnInit(): void {
    this.dataCom.getProfileObs().subscribe((data: any) => {
      console.log('data' + JSON.stringify(data));
      if(this.sideNavStatus){
         this.toggleSideNav();
      }
    });

    this.userName=this.employeeService.getName();
    console.log("jhjl",this.userName)
  }
apps(event:any){
  if(this.a==false){
    this.a=true
  }else{
    this.a=false
  }
  this.sideNavStatus=event;
}
}