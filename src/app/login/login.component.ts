import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../services/log.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Update the import statement for FormGroup, FormControl, and Validators.
import { Toast, ToastrService } from 'ngx-toastr';
import { EmpDataService } from '../services/emp-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employeeid:any;
  password:string="";
  error?:string;
  userList:any[]=[];
  logform:boolean=true;
  errorEmpId?: string;
  errorPassword? :string;
  employeeDetails: any;
  currentPassword:string="";
  errorCurrentPassword?:string;
  newPassword:string="";
  errorNewPassword?:string;
  retypenewPassword:string="";
  errorRetypenewPassword?:string;


  desiginationdata:any[]=[]
  roledata:any[]=[]
  public titledata:any[]=[]
  public owingdata:any[]=[]
  public productdata:any[]=[]
  productgroup:any[]=[]
  productworkdata:any[]=[]
  unifieddata:any[]=[]
  unitdata:any[]=[]
  workgroupdata:any[]=[]
  dd:any[]=[];
  tempVar: any;
  disableLogin:boolean=false;
  
  constructor(private log :LogService,private route:Router,private toastr:ToastrService,private employeeService:EmpDataService) { 
  }

    
  ngOnInit(): void {
      // this.log.getUserDetails().subscribe( data => {
      //   this.employeeDetails = data; 
      //   this.userList=data;
      // })

  }
  

  toggle(){
    this.logform=this.logform?false:true;
    this.clear()
  }
 submit(): void{
  
  this.route.navigate(['/login']);
 }
clear(){
  this.errorEmpId ="";
  this.errorCurrentPassword ="";
  this.errorNewPassword ="";
  this.newPassword = ""
  this.retypenewPassword = ""
  this.employeeid = ""
  this.password=""
  this.currentPassword = ""
  this.errorRetypenewPassword ="";

}

login(): void {
  //  this.toastr.success('Login success');
  // this.toastr.error('Not login');
  
  // console.log('toaster')
  this.disableLogin = true;
  this.errorEmpId = '';
  this.errorPassword = '';
  localStorage.setItem("userid","Welcome user")
  if (!this.employeeid) {
    this.errorEmpId = 'Please enter the emp code';
  }
  if (!this.password) {
    this.errorPassword = 'Please enter the password';
  }else{
    this.log.getData(this.employeeid,this.password).subscribe((data)=>{
      if(data&&data!=""){

        sessionStorage.setItem("empid",this.employeeid)
        this.employeeService.setId( this.employeeid)
        this.route.navigate(['/admin'], { queryParams: { employeeId: this.employeeid } });
        this.log.checkData=data;
        // this.toastr.success('Login success');

        this.route.navigate(['/admin']);
      }else{
        // if (this.employeeid !== this.employeeid) {
        //   this.toastr.error('Wrong employee code');
        // } else if (this.password !== this.password) {
        //   this.toastr.error('Wrong password');
        // } else {
          this.toastr.error('Invalid Username or password');
        // }
      }
      console.log(data);
    })
  }
  const storedEmployeeId = sessionStorage.getItem('employeeId');
  console.log(storedEmployeeId);
}
 isNumberKey(evt:any){
  var charCode = (evt.which) ? evt.which : evt.keyCode
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

validate(): void {
  this.errorEmpId = '';
  this.errorCurrentPassword = '';
  this.errorNewPassword = '';
  this.errorRetypenewPassword = '';

  let isEmpIdEmpty = true;
  let isPassIdEmpty = true;
  let isCurrentPassIdEmpty = true;
  let isRetypePassIdEmpty = true;

  if (!this.employeeid) {
    isEmpIdEmpty = false;
    this.errorEmpId = 'Please enter the emp code';
  }
  if (!this.newPassword || this.newPassword.trim().length < 4) {
    this.errorNewPassword = 'Password should be at least 4 characters long';
    isPassIdEmpty = false;
  }

  if (!this.retypenewPassword || this.retypenewPassword.trim().length < 4) {
    this.errorRetypenewPassword = 'Password should be at least 4 characters long';
    isRetypePassIdEmpty = false;
  }

  if (!this.currentPassword) {
    isCurrentPassIdEmpty = false;
    this.errorCurrentPassword = 'Please enter the current password';
  }

  if (isCurrentPassIdEmpty && isEmpIdEmpty && isPassIdEmpty && isRetypePassIdEmpty) {
    let user = {
      EmployeeCode: this.employeeid,
      Password: this.newPassword,
      CurrentPassword: this.currentPassword
    };

    this.log.putData(user).subscribe((data) => {
      if (data && data !== '') {
        this.toastr.success('Password updated successfully');
        this.route.navigate(['/login']);
      } else {
        this.toastr.error('Invalid current password');
      }
    });
  } else if (!isCurrentPassIdEmpty && isEmpIdEmpty && isPassIdEmpty && isRetypePassIdEmpty) {
    this.toastr.error('Please enter the current password');
  }
  if (!this.newPassword || this.newPassword.trim().length === 0) {
    this.errorNewPassword = 'Please enter the new password';
    isPassIdEmpty = false;
  } else if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"|,.<>/?]+$/.test(this.newPassword)) {
    this.errorNewPassword = 'Password can only contain letters, numbers, and special characters';
    isPassIdEmpty = false;
  }

  if (!this.retypenewPassword || this.retypenewPassword.trim().length === 0) {
    this.errorRetypenewPassword = 'Please enter the retype newPassword';
    isRetypePassIdEmpty = false;
  } else if (this.newPassword !== this.retypenewPassword) {
    this.errorRetypenewPassword = 'Passwords do not match';
  }

  if (isCurrentPassIdEmpty && isEmpIdEmpty && isPassIdEmpty && isRetypePassIdEmpty) {
    let user = {
      EmployeeCode: this.employeeid,
      Password: this.newPassword,
      CurrentPassword: this.currentPassword
    };

    this.log.putData(user).subscribe((data) => {
      if (data && data !== '') {
        this.toastr.success('Password updated successfully');
        this.route.navigate(['/login']);
      } else {
        this.toastr.error('Invalid current password');
      }
      console.log("dmk",data);
    });
  }

}


     

  

  
  

  

      // let user={
      //   "EmployeeCode":this.employeeid,
      //   "Password":this.newPassword
      // }
      
  



onchange(n:any){
  this.disableLogin=false;
  switch(n){
    case 0:
        this.errorEmpId="";
        break;
    case 1:
        this.errorCurrentPassword="";
        break;
    case 2:
          this.errorNewPassword="";
          break;
    case 3:
            this.errorRetypenewPassword="";
            break;
    case 4:
              this.errorPassword="";
              break;
  }
 
  
 
 
}






















































































































 //new User Registration 

//  register():void{
//     alert("Called");
//      this.rerror="";
//      let emailregex:RegExp=/^[a-z][a-z0-9_\.]+@[a-z]{2,5}\.[a-z]{3,5}$/


//      if(this.rusername.length==0 || this.rpassword.length==0 || this.vpassword.length==0 )
//      this.rerror="Fill all the fields";

//      else if(this.rusername.length<4)
//      this.rerror="Username should be atleast 4 charectars long"

//      else if(this.rpassword.length<6)
//      this.rerror="password should be atleast 6 charectars long"

//      else if(this.rpassword!=this.vpassword)
//      this.rerror="Username and password should match"
     
//      else if(!emailregex.test(this.remail))
//      this.rerror="not in email format"

    
//      else{
//          this.rstatus=true;
       
//                   this.rstatus=true;
//                   let obj={username:this.rusername,password:this.rpassword,type:"user",email: this.remail}
//                   this.log.register(obj).subscribe({
//                     next: (result:any)=>{
//                          if(result.success == false)
//                            alert("User already exists")
//                          else{
//                          alert("User successfully registered");
//                          this.logform=true;
//                          this.rstatus=false;
//                          }
//                      },
//                      error: ()=>{
//                          alert("There is problem , Please try again or later")
//                          this.rstatus=false;
//                      }}
//                   )
//               }
}