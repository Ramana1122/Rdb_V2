import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditdetailsComponent } from './editdetails/editdetails.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyapiService } from './services/myapi.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PopComponent } from './pop/pop.component';
import { Home1Component } from './home1/home1.component';
import { ContainerComponent } from './container/container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { TeamPipe } from './pipes/team.pipe';
import { MydetailsComponent } from './mydetails/mydetails.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDetailComponent } from './employeedetails/employeedetails.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { server } from './services/allservers';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportComponent } from './report/report.component';
import { HistoryComponent } from './history/history.component';
import { ReportsComponent } from './reports/reports.component';
import { ActiveComponent } from './active/active.component';
import { MaterialModule } from './materials/materials.module';
import { ListviewComponent } from './listview/listview.component';
import { GraphComponent } from './graph/graph.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DesigGraphComponent } from './desig-graph/desig-graph.component';
import { OnborardGraphComponent } from './onborard-graph/onborard-graph.component';
import { ResignGraphComponent } from './resign-graph/resign-graph.component';
import { TeamGraphComponent } from './team-graph/team-graph.component';



@NgModule({
  declarations: [		
    AppComponent,
    EditdetailsComponent,
    HeaderComponent,
    SideNavComponent,
    PopComponent,
    Home1Component,
    ContainerComponent,
    EmployeeDetailsComponent,
    SearchbarComponent,
    EmployeeDetailComponent,
    MyTeamComponent,
    TeamPipe,
    MydetailsComponent,
    LoginComponent,
    AdminComponent,
    ReportComponent,
    HistoryComponent,
    ReportsComponent,
    ActiveComponent,
    ListviewComponent,
    GraphComponent,
    DesigGraphComponent,
    OnborardGraphComponent,
    ResignGraphComponent,
    TeamGraphComponent
  
   ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    MaterialModule,
    HighchartsChartModule

    

  ],
  providers: [MyapiService,DatePipe,server],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
