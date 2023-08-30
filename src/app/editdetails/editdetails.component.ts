import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyapiService } from '../services/myapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/Auth.service';
import { LogService } from '../services/log.service';
import { EmpDataService } from '../services/emp-data.service';



@Component({
  selector: 'app-editdetails',
  templateUrl: './editdetails.component.html',
  styleUrls: ['./editdetails.component.css']
})
export class EditdetailsComponent implements OnInit {
  searchId: string = '';
  employee: any;
  
  ManagerNames:any;
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  showForm: boolean = false; // Flag to control form visibility

  // showToaster: boolean = false;
  // toasterType: string = '';
  // toasterMessage: string = '';
 formSubmitted:boolean=false;
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
  Locationdata:any[]=[]
  CheckAuthentication:any;
  DisabledData:boolean = false;
  employeeId : string='';

  constructor(
    
    private route: Router,
    private myApiService: MyapiService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private log: LogService,
    private router:ActivatedRoute,
    private employeeService: EmpDataService
  ) {}

  ngOnInit() {
    this.employeeId = this.employeeService.getId();
    if (this.employeeId == '') {
      this.route.navigateByUrl('/login');
    } else {
      this.searchId = '';
      this.employee = null;
      this.employeeForm = this.formBuilder.group({
        searchId: ['', Validators.required]
      });
      this.CheckAuthentication = this.log.getResponse();
      if (this.CheckAuthentication == '134') this.DisabledData = false;
      else this.DisabledData = true;

      this.myApiService.getdesigination('Product_Group').subscribe({
        next: (data: any) => {
          this.productgroup = data;
        },
        error: () => {
          this.productgroup = [];
        }
      });

    this.myApiService.getdesigination("HL_Designation").subscribe({
      next:(data:any)=>{
        this.desiginationdata = data;
      },
      error:()=>{this.desiginationdata= []}
    });

    this.myApiService.getdesigination("Location").subscribe({
      next:(data:any)=>{
        this.Locationdata = data;
      },
      error:()=>{this.Locationdata= []}
    });


    this.myApiService.getdesigination("HL_Title").subscribe({
      next:(data:any)=>{
        this.titledata = data;
      },
      error:()=>{this.titledata= []}
    });

    this.myApiService.getdesigination("HL_Role").subscribe({
      next:(data:any)=>{
        this.roledata = data;
      },
      error:()=>{this.roledata= []}
    });

    this.myApiService.getdesigination("Owning").subscribe({
      next:(data:any)=>{
        this.owingdata = data;
      },
      error:()=>{this.owingdata= []}
    });

    this.myApiService.getdesigination("Product").subscribe({
      next:(data:any)=>{
        this.productdata = data;
      },
      error:()=>{this.productdata= []}
    });

    this.myApiService.getdesigination("Product_Work_Area").subscribe({
      next:(data:any)=>{
        this.productworkdata = data;
      },
      error:()=>{this.productworkdata= []}
    });

    this.myApiService.getdesigination("Unified_Roles").subscribe({
      next:(data:any)=>{
        this.unifieddata = data;
      },
      error:()=>{this.unifieddata= []}
    });

    this.myApiService.getdesigination("Unit").subscribe({
      next:(data:any)=>{
        this.unitdata = data;
      },
      error:()=>{this.unitdata= []}
    });

    this.myApiService.getdesigination("Work_Group").subscribe({
      next:(data:any)=>{
        this.workgroupdata = data;
      },
      error:()=>{this.workgroupdata= []}
    
    });
  }


 
  this.editForm = this.formBuilder.group({
    DedalusId: ['', Validators.required],
    EmployeeCode: ['', Validators.required],
    EmployeeName: ['', Validators.required],
    DateofJoin: ['', Validators.required],
    Gender: ['', Validators.required],
    Location: ['', Validators.required],
    ProductGroup: ['', Validators.required],
    Product: ['', Validators.required],
    UnifiedRoles: ['', Validators.required],
    HLRole: ['', Validators.required],
    HLDesignation: ['', Validators.required],
    HLTitle: ['', Validators.required],
    ManagerCode: ['', Validators.required],
    ManagerMailId: ['', Validators.required],
    Unit: ['', Validators.required],
    Owning: ['', Validators.required],
    Employee_MailId: ['', Validators.required],
    ManagerName: ['', Validators.required],
    ProductWorkArea: ['', Validators.required],
    WorkGroup: ['', Validators.required],
    Status: [''],
    GET: [''],
    Unallocated: [''],
    ADId: [''],
    AdditionalComments: ['']
  });

    // fetching route param ID value

    let id = this.router.snapshot.params['id'];

    if(id) this.employeeForm.controls['searchId'].setValue(id);
    this.searchEmployee();
  }

  searchEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }
  
    // Check if the user is authorized as a manager
    // if (!this.authService.isManager()) {
    //   this.toastr.error('You are not authorized to perform this action.');
    //   return;
    // }
  
    console.log("searchId", this.searchId)
    this.myApiService.searchEmployeeById(this.employeeForm.value.searchId).subscribe((response: any) => {
      console.log(response);
      console.log("data from", this.editForm)
      if (response) {
        this.employee = response;
        console.log("werty" + this.employee);
  
        this.populateEditForm();
        this.showForm = true; // Show the form after populating data
      } else {
        this.toastr.error('Invalid Employee Id');
        this.employee = null;
        this.editForm.reset();
        this.showForm = false; // Hide the form if no employee found
        this.formSubmitted=false;
      }
    });
  }
  

  updateEmployee() {
    if (this.editForm.invalid) {
      // Mark form controls as touched to display validation errors
      Object.values(this.editForm.controls).forEach(control => control.markAsTouched());
      this.toastr.error('Invalid Form....');
      return;
    }
    if (this.employee) { 
      console.log(this.editForm.value)
      let formData = this.editForm.value; 
      formData.GET=formData.GET?'True':'False' 
      this.myApiService.updateEmployee(this.employee.EmployeeCode, this.editForm.value).subscribe(() => {
        // Update successful
        console.log('Update successful');
        this.toastr.success('Update Successful....');
        //this.searchEmployee();
        this.showForm = false; // Hide the form after updating
        this.employee = null;
        this.searchId = '';
        this.editForm.reset();
        this.route.navigate(['/admin/report']);
        // this.showToaster = true;
        // this.toasterMessage = 'Employee updated successfully.';
      }, error => {
        console.error('Error updating employee:', error);
        this.toastr.error('Error updating employee. Please try again.');
        this.employee = null;
        this.searchId = '';
        this.editForm.reset();
      });

     
    }
  }
  // showToasterMessage(type: string, message: string) {
  //   this.showToaster = true;
  //   this.toasterType = type;
  //   this.toasterMessage = message;
  //   console.log(message)

  //   setTimeout(() => {
  //     this.hideToaster();
  //   }, 3000);
  // }

  // hideToaster() {
  //   this.showToaster = false;
  //   this.toasterType = '';
  //   this.toasterMessage = '';
  // }

  onkeypress(e: any) {
    console.log("ManagerName",e)
    if (e.target.value.length >= 3) {
      this.myApiService.getManageName(e.target.value).subscribe((res) => {
        let managernames:any = res
        this.ManagerNames = res;
        console.log("ManagerNames",managernames[0].EmployeeCode);
       
        // this.editForm.controls['EmployeeCode'].setValue(managernames[0].EmployeeCode)
        // this.editForm.value.EmployeeCode = managernames[0].EmployeeCode;
        // this.editForm.value.ManagerCode = managernames[0].ManagerCode;
        // this.editForm.value.ManagerMailId = managernames[0].Employee_MailId;
      });
    }
  }
  
  

  private populateEditForm() {
    if (this.employee) {
      console.log('Populating edit form...');
      this.editForm.patchValue({
        DedalusId: this.employee['DedalusId'],
        EmployeeCode: this.employee['EmployeeCode'],
        EmployeeName: this.employee['EmployeeName'],
        DateofJoin: this.datePipe.transform(this.employee?.DateofJoin, 'dd-MMM-yyyy'),
        Gender: this.employee['Gender'],
        Location: this.employee['Location'],
        ProductGroup: this.employee['ProductGroup'],
        Product: this.employee['Product'],
        UnifiedRoles: this.employee['UnifiedRoles'],
        HLRole: this.employee['HLRole'],
        HLDesignation: this.employee['HLDesignation'],
        HLTitle: this.employee['HLTitle'],
        ManagerCode: this.employee['ManagerCode'],
       ManagerMailId: this.employee['ManagerMailId'],
        Unit: this.employee['Unit'],
        Owning: this.employee['Owning'],
        Employee_MailId: this.employee['Employee_MailId'],
       ManagerName: this.employee['ManagerName'],
        ProductWorkArea: this.employee['ProductWorkArea'],
        GET:this.employee['GET'],
        WorkGroup: this.employee['WorkGroup'],
        Status: this.employee['Status'] || '' // Include the Status field with a default value of ''
      });
    }
  }

  getdomain(descode: any) {
    this.myApiService.getdesigination(descode).subscribe((res: any) => {
      switch (descode) {
        case 'HL_Designation':
          this.desiginationdata = res;
          break;
        case 'HL_Role':
          this.roledata = res;
          break;
        case 'HL_Title':
          this.titledata = res;
          break;
        case 'Owning':
          this.owingdata = res;
          break;
        case 'Product':
          this.productdata = res;
          break;
        case 'Product_Work_Area':
          this.productworkdata = res;
          break;
        case 'Unified_Roles':
          this.unifieddata = res;
          break;
        case 'Unit':
          this.unitdata = res;
          break;
        case 'Work_Group':
          this.workgroupdata = res;
          break;
        case 'Product_Group':
          this.productgroup = res;
          break;
        default:
          console.log("It's the weekend!");
      }
    }, (error) => {
      console.error('Error retrieving data:', error);
      this.toastr.error('Error retrieving data. Please try again.');
    });
  }

  onselect(event:any,managerName:any){
    this.editForm.patchValue({
      ManagerCode: event.EmployeeCode,
      ManagerMailId: event.Employee_MailId
    })
console.log("event",event,managerName)
  }
  
}
