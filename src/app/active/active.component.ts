import { Component, OnInit } from '@angular/core';
import { DataService, Employee } from '../services/dataservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {
  employeeId!: string;
  employee!: Employee;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id')!;
      this.getEmployeeDetails();
      this.getDetail();
    });
  }

  getDetail() {
    this.dataService.getDetails(this.employeeId).subscribe(data => {
      this.employee = data;
    });
  }

  getEmployeeDetails() {
    this.dataService.getDetails1(this.employeeId).subscribe(data => {
      console.log("data", data);
      if (data) {
        this.employee = data;
      }
    });
  }

  clearSelectedEmployee() {
    this.employee = null!;
  }

  navigateToEmployeeDetails(employeeId: string) {
    this.router.navigate(['admin/active', employeeId]);
  }
}
