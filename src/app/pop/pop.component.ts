import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MyapiService } from '../services/myapi.service';
import { PopService } from '../services/pop.service';
import { ToastrService } from 'ngx-toastr';
import { server } from '../services/allservers';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../services/log.service';
import { EmployeeService } from '../services/employee.service';
import { EmpDataService } from '../services/emp-data.service';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit {
  pop!: FormGroup;
  searchId: string = '';
  employee: any;
  ManagerNames: any;
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  formSubmitted: boolean = false;
  desiginationdata: any[] = [];
  roledata: any[] = [];
  titledata: any[] = [];
  owingdata: any[] = [];
  productdata: any[] = [];
  productgroup: any[] = [];
  productworkdata: any[] = [];
  unifieddata: any[] = [];
  unitdata: any[] = [];
  workgroupdata: any[] = [];
  Locationdata: any[] = [];
  dd: any[] = [];
  tempVar: any;
  DisabledData: boolean = false;
  Owning1 = null;
  CheckAuthentication: any;
  showForm: boolean = false;
  datePipe: any;
  employeeId1: any;

  constructor(
    private formBuilder: FormBuilder,
    private myApiService: MyapiService,
    private empservice: EmpDataService,
    private http: HttpClient,
    private popser: PopService,
    private toaster: ToastrService,
    private serverService: server,
    private log: LogService,
    public dataSer: server,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      searchId: ['', Validators.required]
    });
    this.employeeId1 = this.empservice.getId()

    if (this.employeeId1 == "") {
      this.router.navigateByUrl('/login');
    } else {
      this.popser.getdesigination("Product_Group").subscribe({
        next: (data: any) => {
          this.productgroup = data;
        },
        error: () => { this.productgroup = [] }
      });

      this.popser.getdesigination("HL_Title").subscribe({
        next: (data: any) => {
          this.titledata = data;
        },
        error: () => { this.titledata = [] }
      });

      this.popser.getdesigination("HL_Role").subscribe({
        next: (data: any) => {
          this.roledata = data;
        },
        error: () => { this.roledata = [] }
      });

      this.popser.getdesigination("Owning").subscribe({
        next: (data: any) => {
          this.owingdata = data;
        },
        error: () => { this.owingdata = [] }
      });

      this.popser.getdesigination("Product").subscribe({
        next: (data: any) => {
          this.productdata = data;
        },
        error: () => { this.productdata = [] }
      });

      this.popser.getdesigination("Product_Work_Area").subscribe({
        next: (data: any) => {
          this.productworkdata = data;
        },
        error: () => { this.productworkdata = [] }
      });

      this.popser.getdesigination("Unified_Roles").subscribe({
        next: (data: any) => {
          this.unifieddata = data;
        },
        error: () => { this.unifieddata = [] }
      });

      this.popser.getdesigination("Unit").subscribe({
        next: (data: any) => {
          this.unitdata = data;
        },
        error: () => { this.unitdata = [] }
      });

      this.popser.getdesigination("Location").subscribe({
        next: (data: any) => {
          this.Locationdata = data;
          console.log(this.Locationdata);
        },
        error: () => { this.Locationdata = [] }
      });

      this.popser.getdesigination("Work_Group").subscribe({
        next: (data: any) => {
          this.workgroupdata = data;
        },
        error: () => { this.workgroupdata = [] }
      });

      this.CheckAuthentication = this.log.getResponse();

      if (this.CheckAuthentication == "65") {
        this.DisabledData = false;
      } else {
        this.DisabledData = true;
      }

      this.pop = this.formBuilder.group({
        GET: [false],
        DedalusId: ['', Validators.required],
        EmployeeCode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        EmployeeName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+( [A-Za-z]+)*$')]],
        Employee_MailId: ['', [Validators.required, Validators.email]],
        Gender: [null, Validators.required],
        Location: [null, Validators.required],
        ManagerName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        ManagerMailId: ['', [Validators.required, Validators.email]],
        ManagerCode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        DateofJoin: ['', Validators.required],
        ProductGroup: [null, Validators.required],
        Product: [null, Validators.required],
        ProductWorkArea: [null, Validators.required],
        WorkGroup: [null, Validators.required],
        UnifiedRoles: [null, Validators.required],
        HLRole: [null, Validators.required],
        HLDesignation: [null, Validators.required],
        HLTitle: [null, Validators.required],
        Unit: [null, Validators.required],
        Owning: [null, Validators.required],
      });

      this.dataSer.setProfileObs(true);
    }
  }

  clearForm(): void {
    this.pop.reset();
    this.toaster.warning("Form Cleared!!");
  }

  submitForm(): void {
    if (this.pop.valid) {
      let formData = this.pop.value;
      formData.GET = formData.GET ? 'True' : 'False';
      this.http.post(this.serverService.ServerUrls + 'employee', formData)
        .subscribe(
          response => {
            console.log(this.pop);
            console.log('Success:', response);
            this.toaster.success("Success......");
            this.pop.reset();
            this.pop.value.Owning = null;
            this.pop.value.Unit = null;
            this.pop.value.Product = null;
            this.pop.value.ProductGroup = null;
            this.pop.value.ProductWorkArea = null;
            this.pop.value.HLRole = null;
            this.pop.value.HLTitle = null;
            this.pop.value.HLDesignation = null;
            this.pop.value.UnifiedRoles = null;
            this.pop.value.WorkGroup = null;
            this.pop.value.Location = null;
            this.pop.value.Gender = null;
            this.formSubmitted = false;
          },
          error => {
            console.error('Error:', error);
            this.toaster.error("Not Updated......");
          }
        );
    } else {
      this.toaster.warning("Please fill all mandatory fields ");
    }
  }

  getdomain(descode: any) {
    console.log("ProductWorkArea", this.pop.value.ProductWorkArea);
    this.popser.getdesigination(descode).subscribe((res: any) => {
      switch (descode) {
        case "HL_Designation":
          this.desiginationdata = res;
          break;
        case "HL_Role":
          this.roledata = res;
          break;
        case "HL_Title":
          this.titledata = res;
          break;
        case "Owning":
          this.owingdata = res;
          break;
        case "Product":
          this.productdata = res;
          break;
        case "Product_Work_Area":
          this.productworkdata = res;
          break;
        case "Unified_Roles":
          this.unifieddata = res;
          break;
        case "Unit":
          this.unitdata = res;
          break;
        case "Work_Group":
          this.workgroupdata = res;
          break;
        case "Product_Group":
          this.productgroup = res;
          break;
        default:
          console.log("It's wrong input!");
      }
    });
  }

  onkeypress(e: any) {
    console.log("ManagerName", e);
    if (e.target.value.length >= 3) {
      this.myApiService.getManageName(e.target.value).subscribe((res) => {
        let managernames: any = res
        this.ManagerNames = res;
        console.log("ManagerNames", managernames[0].EmployeeCode);
      });
    }
  }

  onselect(event: any, managerName: any) {
    this.pop.patchValue({
      ManagerCode: managerName.EmployeeCode,
      ManagerMailId: managerName.Employee_MailId
    });
    console.log("event", event, managerName)
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
        GET: this.employee['GET'],
        WorkGroup: this.employee['WorkGroup'],
        Status: this.employee['Status'] || ''
      });
    }
  }
  goToAddMultipleEmployees() {

    const url = 'http://nhsappchna6210.cscidp.net:8010/';
 
    window.open(url);
 
   }
  // this.showToaster = true;
  // this.toasterMessage = 'Employee updated successfully.'
}
