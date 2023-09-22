import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopService } from '../services/pop.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashService } from '../services/dash.service';
import { server } from '../services/allservers';
import { MatSidenav } from '@angular/material/sidenav';
import { FilterService } from '../services/filter.service';
import { forkJoin } from 'rxjs';
import { ApiResponse, List1Service } from '../services/list1.service';
@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
})
export class Home1Component implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleSidenav(): void {
    this.sidenav.toggle();
  }
  closeSidenav(): void {
    this.sidenav.close();
  }
  Locationdata: any[] = [];
  productdata: any[] = [];
  workgroupdata: any[] = [];
  apiResponse: ApiResponse[] = [];
  apiResponseDesignation: ApiResponse[] = [];
  apiResponseResigned: ApiResponse[] = [];
  apiResponseOnboarding: ApiResponse[] = [];
  apiResponseTeam: ApiResponse[] = [];
  tableHeadings: string[] = ['Value', 'Count', 'Percentage'];
  locationHolder: any = null;
  productHolder: any = null;
  GroupHolder: any = null;
  employeeCount: number = 0;
  totalCount1: number = 0;
  totalCount2: number = 0;
  totalCount27: number = 0;
  totalCount3: number = 0;
  totalCount4: number = 0;
  totalCount5: number = 0;
  details2: any[] = [];
  totalCount6: number = 0;
  // This for Holding the options
  locationOptions: any[] = [];
  productOptions: any[] = [];
  workGroupOptions: any[] = [];
  combinedArray: any[] = [];
  combinedArray1:any[]=[];
  combinedArray2:any[]=[];
  constructor(
    private listService: List1Service,
    private filterService: FilterService,
    private dashservice: DashService,
    private router: Router,
    private popser: PopService
  ) {}
  deleteItem1(index: number): void {
    // Close the accordion
    this.filterService.isAccordionOpen = false;
    // Get the selected item
    const selectedItem = this.combinedArray[index];
    // If the item exists and is selected, uncheck the checkbox
    if (selectedItem && this.filterService.selectedLocations[selectedItem]) {
      this.filterService.selectedLocations[selectedItem] = false;
    }
    let data:any = {
      "row":1,
      "value":this.combinedArray[index],
      "index":index
    }
    this.filterService.deleteFilter.next(data);
    this.filterService.deleteFilter.next(this.combinedArray[index]);
    // Remove the item from the combinedArray
    if (index >= 0 && index < this.combinedArray.length) {
      this.combinedArray.splice(index, 1);
    }
    this.fetchInitialData()
  }
  deleteItem2(index: number): void {
    // Close the accordion
    this.filterService.isAccordionOpen = false;
    // Get the selected item
    const selectedItem1 = this.combinedArray1[index];
    // If the item exists and is selected, uncheck the checkbox
    if (selectedItem1 && this.filterService.selectedLocations[selectedItem1]) {
      this.filterService.selectedLocations[selectedItem1] = false;
    }
    let data:any = {
      "row":2,
      "value":this.combinedArray1[index],
      "index":index
    }
    this.filterService.deleteFilter.next(data);
    //this.filterService.deleteFilter.next(this.combinedArray1[index]);
    // Remove the item from the combinedArray
    if (index >= 0 && index < this.combinedArray1.length) {
      this.combinedArray1.splice(index, 1);
    }
    this.fetchInitialData()
  }
  deleteItem3(index: number): void {
    // Close the accordion
    this.filterService.isAccordionOpen = false;
    // Get the selected item
    const selectedItem2 = this.combinedArray2[index];
    // If the item exists and is selected, uncheck the checkbox
    if (selectedItem2 && this.filterService.selectedLocations[selectedItem2]) {
      this.filterService.selectedLocations[selectedItem2] = false;
    }
    let data:any = {
      "row":3,
      "value":this.combinedArray2[index],
      "index":index
    }
    this.filterService.deleteFilter.next(data);
    // Remove the item from the combinedArray
    if (index >= 0 && index < this.combinedArray2.length) {
      this.combinedArray2.splice(index, 1);
    }
    this.fetchInitialData()
  }
  ngOnInit() {
    // Subscribe to filter changes
    this.filterService.openMessage.subscribe((finalData) => {
      console.log(JSON.parse(finalData['data']), "finalData");
      let filterOpts = JSON.parse(finalData['data']);
      console.log('keyss' + filterOpts);
      this.locationOptions = filterOpts.Location;
      this.productOptions = filterOpts.Product;
      this.workGroupOptions = filterOpts.Work_Group;

      this.combinedArray= [...this.locationOptions];
      this.combinedArray1=[...this.productOptions];
      this.combinedArray2= [...this.workGroupOptions]
      // Create an array of observables for fetching data for all five pivots
      const observables = [
        this.fetchDataForPivot('Designation', this.apiResponseDesignation),
        this.fetchDataForPivot('Release', this.apiResponse),
        this.fetchDataForPivot('Resigned', this.apiResponseResigned),
        
        this.fetchDataForPivot('ONBOARDING', this.apiResponseOnboarding),
        this.fetchDataForPivot('PRODUCT_WORK_AREA', this.apiResponseTeam),
      ];

      // Use forkJoin to make parallel requests
      forkJoin(observables).subscribe((results) => {
        // Results will contain the data for all five pivots
        const [designationData, releaseData, resignedData, onboardingData, teamData] = results;

        // Update the corresponding arrays with the fetched data
        this.apiResponseDesignation = designationData;
        console.log("My Lwewq",this.apiResponseDesignation.length)
        this.totalCount6 = this.apiResponseDesignation.reduce((total, detail) => total + detail.Count, 0);


        this.apiResponse = releaseData;
        console.log("My Lwewq",this.apiResponse.length)
        this.totalCount4 = this.apiResponse.reduce((total, detail) => total + detail.Count, 0);


        this.apiResponseResigned = resignedData;
        this.totalCount2 = this.apiResponseResigned.reduce((total, detail) => total + detail.Count, 0);

        this.apiResponseOnboarding = onboardingData;
        this.totalCount1 = this.apiResponseOnboarding.reduce((total, detail) => total + detail.Count, 0);

        this.apiResponseTeam = teamData;
        this.totalCount3 = this.apiResponseTeam.reduce((total, detail) => total + detail.Count, 0);;

        // Perform any additional processing if needed
      });
    });

    // Fetch initial data and options
    this.fetchInitialData();
  }

  // Fetch initial data and options
  fetchInitialData() {
    const selectedOptions = this.filterService.getSelectedOptions();
    this.locationOptions = selectedOptions.Location;
    this.productOptions = selectedOptions.Product;
    this.workGroupOptions = selectedOptions.Work_Group;

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

    this.fetchDataForRelease();
    this.fetchDataForDesignation();
    this.fetchDataForResigned();
    this.fetchEmployeeCount();
    this.fetchResigned();
    this.fetchDataForOnboarding();
    this.fetchDataForTeam();
  }

  // Fetch data for a specific pivot
  fetchDataForPivot(pivot: string, targetArray: ApiResponse[]) {
    // Construct the filter parameters based on your requirements
    const designation: any = pivot; // Adjust this if needed

    // Use the FilterService to get filtered employees
    return this.filterService.getFilteredEmployees(designation, this.locationOptions, this.productOptions, this.workGroupOptions);
    
  }

  // Fetch total employee count
  fetchEmployeeCount() {
    this.dashservice.getData('A').subscribe(
      (response) => {
        this.employeeCount = response.length;
      },
      (error) => {
        console.error('Error fetching employee count:', error);
      }
    );
  }


  // Fetch data for Release
  fetchDataForRelease() {
    this.listService.fetchData().subscribe(
      (response) => {
        this.apiResponse = response;
        this.totalCount4 = this.apiResponse.reduce((total, detail) => total + detail.Count, 0);
      },
      (error) => {
        console.error('Error fetching data for Release:', error);
      }
    );
  }

  // Fetch data for Designation
  fetchDataForDesignation() {
    this.listService.fetchDataForDesignation().subscribe(
      (response) => {
        this.apiResponseDesignation = response;
        console.log("apiResponseDesignation",this.apiResponseDesignation);
        this.totalCount6 = this.apiResponseDesignation.reduce((total, detail) => total + detail.Count, 0);
        
        console.log("totalCount6",this.totalCount6)
        if (this.locationHolder === "All") {
          this.totalCount6;
        }
      },
      (error) => {
        console.error('Error fetching data for Designation:', error);
      }
    );
  }

  // Fetch data for Resigned
  fetchDataForResigned() {
    this.listService.fetchDataForResigned().subscribe(
      (response) => {
        this.apiResponseResigned =response;
        this.totalCount2 = this.apiResponseResigned.reduce((total, detail) => total + detail.Count, 0);
      },
      (error) => {
        console.error('Error fetching data for Resigned:', error);
      }
    );
  }

  // Fetch data for ONBOARDING
  fetchDataForOnboarding() {
    this.listService.fetchDataForOnboarding().subscribe(
      (response: any) => {
        this.apiResponseOnboarding = response;
        this.totalCount1 = this.apiResponseOnboarding.reduce((total, detail) => total + detail.Count, 0);
      },
      (error) => {
        console.error('Error fetching data for ONBOARDING:', error);
      }
    );
  }

  // Fetch data for Team
  fetchDataForTeam() {
    this.listService.fetchDataForTeam().subscribe(
      (response: any) => {
        this.apiResponseTeam = response;
        this.totalCount3 = this.apiResponseTeam.reduce((total, detail) => total + detail.Count, 0);;
      },
      (error) => {
        console.error('Error fetching data for Team:', error);
      }
    );
  }

  // Fetch Resigned data
  fetchResigned() {
    this.dashservice.getResigned().subscribe(
      (data) => {
        this.details2 = data;
        this.totalCount27 = this.details2.reduce((total, detail) => total + detail.Count, 0);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
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

  onClickMethod4() {
    this.router.navigate(['/admin/team-graph']);
  }

onGridViewClick() {

      this.router.navigate(['/admin/listview'])

    }
}