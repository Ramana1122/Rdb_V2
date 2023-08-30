import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListService, ApiResponse } from '../services/list1.service';
import { PopService } from '../services/pop.service';
import { DashService } from '../services/dash.service';
@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent {
  Locationdata: any[] = [];
  productdata: any[] = [];
  workgroupdata: any[] = [];
  apiResponse: ApiResponse[] = [];
  apiResponseDesignation: ApiResponse[] = [];
  apiResponseResigned: ApiResponse[] = [];
  apiResponseOnboarding: ApiResponse[] = [];
  apiResponseTeam:ApiResponse[] = [];
  tableHeadings: string[] = ['Value', 'Count', 'Percentage'];
  locationHolder: any = null;
  productHolder: any = null;
  GroupHolder: any = null;
  employeeCount : number = 0;
  totalCount1: number = 0;
  totalCount2: number = 0;
  totalCount3: number = 0;
  totalCount4: number = 0;
  totalCount5: number = 0;
  details2: any[] = [];


  totalCount6: number = 0;
  constructor(private listService: ListService,private dashservice:DashService,private router: Router,private popser: PopService) {}
  ngOnInit() {
    this.popser.getdesigination('Location').subscribe({
      next: (data: any) => {
        // console.log("Location",data)
        let allData=[{
          Code: 'All', Description: 'All'
        }]
      let all=[]
      all=[...allData,...data]
      // console.log("location",allData)
        this.Locationdata = all;
      },
      error: () => {
        this.Locationdata = [];
      },
    });
  
    this.popser.getdesigination('Product').subscribe({
      next: (data: any) => {
        this.productdata = data;
      },
      error: () => {
        this.productdata = [];
      }
    });
    this.popser.getdesigination('Work_Group').subscribe({
      next: (data: any) => {
        this.workgroupdata = data;
      },
      error: () => {
        this.workgroupdata = [];
      }
    });
    this.fetchDropdownValues('Location');
    this.fetchDropdownValues('Product');
    this.fetchDropdownValues('Work_Group');
    this.fetchDataForRelease();
    this.fetchDataForDesignation();
    this.fetchDataForResigned();
    this.fetchEmployeeCount();
    this.fetchResigned();

    this.fetchDataForOnboarding();
    this.fetchDataForTeam();
  }
  onListViewClick() {
    this.router.navigate(['/admin/home1']);
  }
  onClickMethod() {
    this.router.navigate(['/admin/graph']);
  }
  onClickMethod1() {
    this.router.navigate(['/admin/desig-graph']);
  }
  onClickMethod2() {
    this.router.navigate(['/admin/onborard-graph']);
  }
  onClickMethod3() {
    this.router.navigate(['/admin/resign-graph']);
  }
  onClickMethod4(){
    this.router.navigate(['/admin/team-graph']);

  }
  fetchDropdownValues(domainCode: string): void {
    this.listService.getDropdownValues(domainCode).subscribe(
      (data: any) => {
        if (domainCode === 'Location') {
          let allData=[{
            code:'All',Description:'All'
          }]
          let all=[]
          all=[...allData,...data]
          this.Locationdata = all;
        } else if (domainCode === 'Product') {
          this.productdata = data;
        } else if (domainCode === 'Work_Group') {
          this.workgroupdata = data;
        }
      },
      (error) => {
        console.error('Error fetching dropdown values:', error);
      });
  }

  fetchEmployeeCount(): void {  
    this.dashservice.getData('A').subscribe(  
      (response) => {  
        this.employeeCount = response.length;  
      },
      (error) => {  
        console.error('Error fetching employee count:', error);  
      });  
  }

 
  
  fetchDropdownValuesThree(): void {
    const paramsDesig = {
     pivot:'Designation',
     Location:this.locationHolder=="All"?'':this.locationHolder,
     product: this.productHolder,
     Group: this.GroupHolder
    };
    this.listService.getEmployeesByDesignationAndLocation(paramsDesig).subscribe(
      (data: any) => {
        console.log('Fetching values here', data);
        this.apiResponseDesignation = data;  
        this.totalCount6 = this.apiResponseDesignation.reduce((total, apiResponseDesignation) => total + apiResponseDesignation.Count, 0);
      },
      (error) => {
        console.error('Error fetching dropdown values:', error);
      });
    const paramsonb= {
       pivot:'ONBOARDING',
       Location:this.locationHolder=="All"?'':this.locationHolder,
       product: this.productHolder,
       Group: this.GroupHolder
     };
     this.listService.getEmployeesByDesignationAndLocation(paramsonb).subscribe(
       (data: any) => {
         console.log('Fetching values here', data);
         this.apiResponseOnboarding=data;
         this.totalCount1 = this.apiResponseOnboarding.reduce((total, apiResponseOnboarding) => total + apiResponseOnboarding.Count, 0);
       },
       (error) => {
         console.error('Error fetching dropdown values:', error);
       });
     const paramRelease= {
      pivot:'Resigned',
      Location:this.locationHolder=="All"?'':this.locationHolder,
      product: this.productHolder,
      Group: this.GroupHolder
     };
     this.listService.getEmployeesByDesignationAndLocation(paramRelease).subscribe(
       (data: any) => {
         console.log('Fetching values here', data);
         this.apiResponseResigned=data;
         this.totalCount2 = this.apiResponseResigned.reduce((total, apiResponseResigned) => total + apiResponseResigned.Count, 0);
       },
       (error) => {
         console.error('Error fetching dropdown values:', error);
       });
    const paramsResign = {
      pivot:'PRODUCT_WORK_AREA',
      Location:this.locationHolder=="All"?'':this.locationHolder,
       product: this.productHolder,
       Group: this.GroupHolder
     };
    this.listService.getEmployeesByDesignationAndLocation(paramsResign).subscribe(
      (data: any) => {
        console.log('Fetching values here', data);
        this.apiResponseTeam=data
        this.totalCount3 = this.apiResponseTeam.reduce((total, apiResponseTeam) => total + apiResponseTeam.Count, 0);
      },
      (error) => {
        console.error('Error fetching dropdown values:', error);
      });
    const paramsRel = {
      pivot:'Release',
      Location:this.locationHolder=="All"?'':this.locationHolder,
       product: this.productHolder,
       Group: this.GroupHolder
     };
    this.listService.getEmployeesByDesignationAndLocation(paramsRel).subscribe(
      (data: any) => {
        console.log('Fetching values here', data);
        this.apiResponse=data
        this.totalCount4 = this.apiResponse.reduce((total, apiResponse) => total + apiResponse.Count, 0);
      },
      (error) => {
        console.error('Error fetching dropdown values:', error);
      });
  }
  fetchDataForRelease() {
    this.listService.fetchData().subscribe(
      (response) => {
        this.apiResponse = this.apiResponse.concat(response);
      },
      (error) => {
        console.error('Error fetching data for Release:', error);
      });
  }
  fetchDataForDesignation() {
    this.listService.fetchDataForDesignation().subscribe(
      (response) => {
        this.apiResponseDesignation = this.apiResponseDesignation.concat(response);
      },
      (error) => {
        console.error('Error fetching data for Designation:', error);
      });
  }
  fetchDataForResigned() {
    this.listService.fetchDataForResigned().subscribe(
      (response) => {
        this.apiResponseResigned = this.apiResponseResigned.concat(response);
      },
      (error) => {
        console.error('Error fetching data for Resigned:', error);
      });
  }
  fetchDataForOnboarding() {
    this.listService.fetchDataForOnboarding().subscribe(
      (response: any) => {
        this.apiResponseOnboarding = this.apiResponseOnboarding.concat(response);
      },
      (error) => {
        console.error('Error fetching data for ONBOARDING:', error);
      }
    );
  }
  fetchResigned() {

    this.dashservice.getResigned().subscribe(

      (data) => {

        this.details2 = data;

        this.totalCount2 = this.details2.reduce((total, detail) => total + detail.Count, 0);

      },

      (error) => {

        console.error('Error fetching data:', error);

      }

    );

  } 

  fetchDataForTeam() {
    this.listService.fetchDataForTeam().subscribe(
      (response: any) => {
        this.apiResponseTeam = this.apiResponseTeam.concat(response);
      },
      (error) => {
        console.error('Error fetching data for Team:', error);
      }
    );
  }
}