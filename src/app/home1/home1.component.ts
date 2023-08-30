import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { PopService } from '../services/pop.service';

import { FormBuilder, FormGroup } from '@angular/forms';

import { DashService } from '../services/dash.service';

 

@Component({

  selector: 'app-home1',

  templateUrl: './home1.component.html',

  styleUrls: ['./home1.component.css'],

})

export class Home1Component implements OnInit {

  gridViewActive = true;

  Locationdata: any[] = [];

  productdata: any[] = [];

  workgroupdata:any []=[];

  locationHolder:any = null;

  productHolder: any = null;

  GroupHolder: any = null;

  employeeCount : number = 0;

  employeeCountd  : number = 0;

 selectLocation:string="";

 selectGroup:string="";

 selectProduct:string="";

 filteredData: any[] = [];

  responses: any;

  details: any[] = [];

  details1: any[] = [];

  details2: any[] = [];

  details3: any[] = [];

  details4: any[] = [];

  totalCount: number = 0;

  totalCount1: number = 0;

  totalCount2: number = 0;

  totalCount3: number = 0;

  totalCount4: number = 0  ;

   // Set the default active state to grid vie

  // Define the FormGroup for your form
  filtersApplied: boolean = true;

  formGroup!: FormGroup;

  onLocationChange() {    

    console.log('Selected Location:', this.selectLocation);

  }

  ongroupChange() {    

    console.log('Selected Location:', this.selectLocation);

  }

    onproductChange() {    

    console.log('Selected Location:', this.selectLocation);

  }

  constructor(

    private router: Router,

    private popser: PopService,

    private formBuilder: FormBuilder,

    private dashservice:DashService

  ) {}

  cardsData: any[] = [

    { title: 'Designation', iconName: 'fa fa-certificate',

    details: []},

    { title: 'Team', iconName: 'fa fa-users', api:'PRODUCT_WORK_AREA',

    details: [] },

    { title: 'Release', iconName: 'fa fa-key',

  details:[] },

    { title: 'Resigned',iconName: 'fa fa-user-times',

  details:[] },

    { title: 'Onborded',iconName: 'fa fa-user-plus',api:'ONBOARDING',

  details:[] },

  ];


  ngOnInit(): void {

    this.popser.getdesigination('Location').subscribe({

      next: (data: any) => {

        console.log("Location",data)

        let allData=[{

          Code: 'All', Description: 'All'

        }]

       let all=[]

      all=[...allData,...data]

      console.log("location",allData)

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

    this.popser.getdesigination("Work_Group").subscribe({

      next: (data: any) => {

        this.workgroupdata = data;

      },

      error: () => { this.workgroupdata = [] }

    });

 

    this.fetchEmployeeCount();

    this.fetchResigned();

    this.dashservice.getDesignation()

      .subscribe((data: any) => {

        // Assuming the API response structure is similar to the "details" array structure

        this.cardsData[0].count = data.length;

        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[0].details = checked;

        console.log(checked);

      });

//Team........................

  this.dashservice.getTeam()

      .subscribe((data: any) => {

        // Assuming the API response structure is similar to the "details" array structure

        this.cardsData[1].count = data.length;
       
        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[1].details = checked;

        console.log(checked);

      });

 

      this.dashservice.getRelease()

      .subscribe((data: any) => {

        // Assuming the API response structure is similar to the "details" array structure

        this.cardsData[2].count = data.length;
        
        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[2].details = checked;

        console.log(checked);

      });

 

      this.dashservice.getResigned()

      .subscribe((data: any) => {

        // Assuming the API response structure is similar to the "details" array structure

        this.cardsData[3].count = data.length;
        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[3].details = checked;

        console.log(checked);

      });

     

 

      this.dashservice.getOnboard()

      .subscribe((data: any) => {

        // Assuming the API response structure is similar to the "details" array structure

        this.cardsData[4].count = data.length;
      

        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[4].details = checked;

        console.log(checked);

      });

     

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

    fetchEmployeeCount(): void {  

      this.dashservice.getData('A').subscribe(  

        (response) => {  

          this.employeeCount = response.length;  

        },

 

        (error) => {  

          console.error('Error fetching employee count:', error);  

        }  

      );  

      this.dashservice.getData('d').subscribe(  

        (response) => {  

          this.employeeCountd = response.length;  

        },  

        (error) => {  

          console.error('Error fetching employee count:', error);

        }  

      );  

    }

 

    // Initialize the FormGroup and define the form controls

 

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

 

    onClickMethod4() {  

      this.router.navigate(['/admin/team-graph']);  

    }

 

  onGridViewClick() {

    this.gridViewActive = false;

  }

 

  onListViewClick() {

    this.router.navigate(['/admin/listview']);

  }

  fetchDropdownValuesThree(): void {

    let params = {

 

      pivot: this.cardsData[0].title,

      product: this.productHolder,

      Location:this.locationHolder=="All"?'':this.locationHolder,

      Group: this.GroupHolder

 

    };

// if(this.locationHolder!="All"){

//   params.Location=this.locationHolder

// }

   console.log("locationHolder",this.locationHolder)

 

    this.dashservice.getEmployeesByDesignationAndLocation(params).subscribe(

 

      (data:any) => {

 

        console.log("Fetching values here",data)

 

        this.details=data;

        this.totalCount = this.details.reduce((total, detail) => total + detail.Count, 0);
        
       if(this.locationHolder=="All"){
        
        this.fetchEmployeeCount()
       }else{
        this.employeeCount=this.cardsData[0].count=data.length;
       }
       

// this.cardsData = data;

 this.cardsData[0].count = data.length;

        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[0].details = checked;

        console.log(checked);

 

        console.log(this.cardsData)

     

        //////////////

     
      
      },


 

      (error) => {

 

        console.error('Error fetching dropdown values:', error);

 

      }

 

    );

    const paramsResign = {

      pivot:this.cardsData[3].title,

      Location:this.locationHolder=="All"?'':this.locationHolder,

       product: this.productHolder,

       Group: this.GroupHolder

     };

     

 

    this.dashservice.getEmployeesByDesignationAndLocation(paramsResign).subscribe(

      (data: any) => {

        console.log('Fetching values here', data);

     

        this.details2=data;

        this.totalCount2 = this.details2.reduce((total, detail) => total + detail.Count, 0);

 

        this.cardsData[3].count = data.length;

        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[3].details = checked;

 

 

 

      },

      (error) => {

        console.error('Error fetching dropdown values:', error);

      }

    );

    const paramsPRODUCT_WORK_AREA = {

      pivot:this.cardsData[1].api,

      Location:this.locationHolder=="All"?'':this.locationHolder,

       product: this.productHolder,

       Group: this.GroupHolder

     };

 

    this.dashservice.getEmployeesByDesignationAndLocation(paramsPRODUCT_WORK_AREA).subscribe(

      (data: any) => {

        console.log('Fetching values here', data);

     

        this.details4=data;

        this.totalCount4 = this.details4.reduce((total, detail) => total + detail.Count, 0);

 

        this.cardsData[1].count = data.length;

        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[1].details = checked;

 

 

      },

      (error) => {

        console.error('Error fetching dropdown values:', error);

      }

    );

    const paramsonb = {

      pivot:this.cardsData[4].api,

      Location:this.locationHolder=="All"?'':this.locationHolder,

       product: this.productHolder,

       Group: this.GroupHolder

     };

 

    this.dashservice.getEmployeesByDesignationAndLocation(paramsonb).subscribe(

      (data: any) => {

        console.log('Fetching values here', data);

     

        this.details3=data;

        this.totalCount3 = this.details3.reduce((total, detail) => total + detail.Count, 0);

 

        this.cardsData[4].count = data.length;

        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[4].details = checked;

 

 

      },

      (error) => {

        console.error('Error fetching dropdown values:', error);

      }

    );

    const paramRelease = {

      pivot:this.cardsData[2].title,

      Location:this.locationHolder=="All"?'':this.locationHolder,

       product: this.productHolder,

       Group: this.GroupHolder

     };

 

    this.dashservice.getEmployeesByDesignationAndLocation(paramRelease).subscribe(

      (data: any) => {

        console.log('Fetching values here', data);

     

        this.details1=data;

        this.totalCount1 = this.details1.reduce((total, detail) => total + detail.Count, 0);

 

        this.cardsData[2].count = data.length;

        let checked= data.map((item: any) => ({

          label: item.Value,

          value: item.Count,

          count: item.Percentage

        }));

        this.cardsData[2].details = checked;

 

 

 

      },

      (error) => {

        console.error('Error fetching dropdown values:', error);

      }

    );

 

  }

}