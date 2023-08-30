import { Component, OnInit } from '@angular/core';

import { HistoriesService } from '../services/histories.service';

import { SearchbarComponent } from '../searchbar/searchbar.component';

import { EmployeeService } from '../services/employee.service';

 

@Component({

  selector: 'app-history',

  templateUrl: './history.component.html',

  styleUrls: ['./history.component.css']

})

export class HistoryComponent  {

  selectedOption: string = '';

  historyData: any[] = [];

  hempId:any;

  isHistory=true;

  employee: any;

  constructor(private histapi: HistoriesService,private fs : EmployeeService){

    this.hempId = sessionStorage.getItem('hempId');

    this.readdata(this.hempId);

  }

 

 

  readdata(hempId: any) {

    this.fs.getEmployeeById(hempId).subscribe(

      (response: any) => {

     

          this.employee = response;

       

      })

 

  }

 

 

  onChange(){

   

    this.histapi.getHistoryData(sessionStorage.getItem('hempId'),this.selectedOption)

      .subscribe(

        response => {

          this.historyData = response;

          console.log(this.historyData)  

 

          if (this.historyData.length === 0) {

 

            this.isHistory = false;

   

          }

        },

        error => {

               console.error('Error:', error);

        }

      );

  }

  ngOnInit() {

   

    this.hempId = sessionStorage.getItem('hempId');

   

   

  }

}