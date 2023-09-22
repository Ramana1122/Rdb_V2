// app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditdetailsComponent } from './editdetails/editdetails.component';
import { PopComponent } from './pop/pop.component';
import { ContainerComponent } from './container/container.component';
import { Home1Component } from './home1/home1.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { EmployeeDetailComponent } from './employeedetails/employeedetails.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MydetailsComponent } from './mydetails/mydetails.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AdminComponent } from './admin/admin.component';
import { ReportComponent } from './report/report.component';
import { HistoryComponent } from './history/history.component';
import { ReportsComponent } from './reports/reports.component';
import { ActiveComponent } from './active/active.component';
import { ListviewComponent } from './listview/listview.component';
import { GraphComponent } from './graph/graph.component';
import { DesigGraphComponent } from './desig-graph/desig-graph.component';
import { OnborardGraphComponent } from './onborard-graph/onborard-graph.component';
import { ResignGraphComponent } from './resign-graph/resign-graph.component';
import { TeamGraphComponent } from './team-graph/team-graph.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: "admin",component: AdminComponent,
  children:[

    { path: 'mydetails', component: MydetailsComponent },
  
    
    { path: 'report', component: ReportComponent },
    { path: 'editdetails/:id', component: EditdetailsComponent },
    { path: 'my-team', component: MyTeamComponent },
    { path: 'details', component: EmployeeDetailsComponent },
    // { path: 'pop', component: PopComponent },
    { path: '', component: ListviewComponent },
    {path: 'home1',component:Home1Component},
    { path: 'details/:empid', component: EmployeeDetailComponent },
    { path: 'searchbar', component: SearchbarComponent },
    { path: 'employeedetails', component: EmployeeDetailComponent },
    { path: 'employee-details', component: EmployeeDetailsComponent },

    { path: 'hist', component: HistoryComponent },
    {path:'side-nav', component:SideNavComponent},
    { path: 'reports', component: ReportsComponent },

    { path: 'active', component: ActiveComponent },

    { path: 'active/:id', component: ActiveComponent },
    {path:'listview',component:ListviewComponent},
    {path:'graph',component:GraphComponent},
    {path:'desig-graph',component:DesigGraphComponent},
    {path:'onborard-graph',component:OnborardGraphComponent},
    {path:'resign-graph',component:ResignGraphComponent},
    {path:'team-graph',component:TeamGraphComponent}

  ] },
  { path: '**', redirectTo: 'login' }, // Redirect to login page for unknown routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
