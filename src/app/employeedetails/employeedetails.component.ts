import { Component, Input, OnInit } from '@angular/core';

import { DataService, Employee } from '../services/dataservice.service';

import { ActivatedRoute, Router } from '@angular/router';




@Component({

  selector: 'app-employee-details-1',

  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css'],

})

export class EmployeeDetailComponent implements OnInit {

  OID: any;

  searchQuery: string = '';

  searchClicked: boolean = false;

  showList: boolean = false;

  input: boolean = false;

  searchErrorMessage: string = '';

  employee: Employee = {} as Employee;

  employees: Employee[] = []; // Initialize with default value sairam@2627




  constructor(

    private fs: DataService,

    private router: Router,

    private ar: ActivatedRoute

  ) { }

  @Input('empId') empId: any;



  handleButtonClick() {

    this.router.navigate(['admin/searchbar']);

  }
  ngOnInit() {
    console.log(this.empId);
    this.showList = true;
    this.ar.params.subscribe((params) => {

      this.OID = params['empid'];
      this.readData(this.OID);
    });

    this.readData(this.empId);
  }
  change() {

    if (this.searchQuery.length >= 3) {

      this.searchErrorMessage = '';

      this.searchClicked = false; // Reset the search result
      // this.router.navigate(['admin/searchbar']);

    } else {

      this.searchErrorMessage = '';

      this.searchClicked = false;

      this.employees = []; // Reset the employee data

    }

  }

  readData(OID: any) {

    if (OID) {

      this.fs.getDetails(OID).subscribe(

        (employee: Employee) => {

          this.employee = employee;

        },

        (error) => {

          console.error('Error fetching employee details:', error);

          // Handle error case

          this.employee = {} as Employee;

        }

      );

    }

  }




  onSearch() {

    if (this.searchQuery.trim().length >= 3) {

      this.router.navigate(['admin/searchbar'], { queryParams: { query: this.searchQuery } });

    } else {

      // Perform any error handling or display error message for invalid search query

      console.log('Invalid search query');

    }

  }

}