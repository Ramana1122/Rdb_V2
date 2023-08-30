import { Component ,Input,OnInit} from '@angular/core';
import { EmpDataService } from '../services/emp-data.service';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
@Input() sideNavStatus:boolean=false;
  list:any=[
  {
    number:'1',
    name1:'home',
    icon1:'fa-solid fa-house',
    disable:false
  },
  {
    number:'2',
    name2:'My-Details',
    icon2:'fa-solid fa-user',
    disable:false
  },
  {
    number:'3',
    name3:'My-Team',
    icon3:'fa-solid fa-users',
    disable:false
  },
  {
    number:'4',
    name4:'Add-New',
    icon4:'fa-solid fa-user-plus',
    disable:false
  },
  {
    number:'5',
    name5:'Reportees',
    icon5:"fa-sharp fa-solid fa-people-group",
    disable:false
  },
  {
    number:'6',
    name6:'Search',
    icon6:'fa-solid fa-magnifying-glass',
    disable:false
  },
  {

    number:'7',

    name7:'Reports',

    icon7:'fa-regular fa-file-lines'

  }

]
constructor(private services:EmployeeService,private employeeService:EmpDataService){}

ngOnInit():void{
  this.services.getReportee(this.employeeService.getId(),'reportee').subscribe((data)=>{
    console.log("side nav",data)
    if(data && data.length>0){
      this.list.find((a1:any)=>a1.number=="4").disable=true
      this.list.find((a2:any)=>a2.number=="5").disable=true
    }else{
      this.list.find((a3:any)=>a3.number=="4").disable=false
      this.list.find((a4:any)=>a4.number=="5").disable=false
    }
  })

}
ngAfterViewInit(): void {
  var bootstrap: any;

  setTimeout(()=>{

    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })    
  },2000)
}


toggleMode(event: any): void {
  let checked:any = event.target.checked;
  if(checked){
    document.body.setAttribute('data-theme', 'dark');
  }
  else{
    document.body.setAttribute('data-theme', 'light');
  }
  
  }
}
