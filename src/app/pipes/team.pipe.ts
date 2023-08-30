import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'team'
})
export class TeamPipe implements PipeTransform {

  
  transform(employees: any, name:string): any {
    
    return employees.filter((x:any)=>(x['EmployeeName']!==name));
    }

}
