import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private apiUrl = 'http://nhsappchna6210.cscidp.net/rdb/api/Employee';
  openMessage = new Subject<any>();
  deleteFilter = new Subject<any>();
  isAccordionOpen = true;
  selectedLocations: Record<string, boolean> = {};
  // Selected filter options
  private selectedOptions: {
    Location: any[];
    Product: any[];
    Work_Group: any[];
  } = {
    Location: [],
    Product: [],
    Work_Group: [],
  };
  //const combinedArray = Location.concat(Product, Work_Group);

//console.log(combinedArray);


  constructor(private http: HttpClient) {}

  // Get the selected filter options
  getSelectedOptions(): {
    Location: any[];
    Product: any[];
    Work_Group: any[];
  } {
    return this.selectedOptions;
  }

  // Set the selected filter options
  setSelectedOptions(selectedOptions: {
    Location: any[];
    Product: any[];
    Work_Group: any[];
  }) {
    this.selectedOptions = selectedOptions;
    this.openMessage.next({ data: JSON.stringify(this.selectedOptions) });
  }

  getFilteredEmployees(
    pivot: string,
    locations: string[] | undefined,
    products: string[] | undefined,
    groups: string[] | undefined
  ): Observable<any> {
    // Construct the query parameters
    let params = new HttpParams().set('Pivot', pivot);

    if (locations && locations.length > 0) {
      params = params.set('Location', locations.join('~'));
    }

    if (products && products.length > 0) {
      params = params.set('Product', products.join('~'));
    }

    if (groups && groups.length > 0) {
      params = params.set('Group', groups.join('~'));
    }

    // Update the URL based on the pivot value
    const apiUrlForPivot = this.getApiUrlForPivot(pivot);

    return this.http.get<any>(apiUrlForPivot, { params });
  }
  

  // ... Other methods ...

  // Define the API URL based on the pivot value
  private getApiUrlForPivot(pivot: string): string {
    switch (pivot) {
      case 'Release':
        return this.apiUrl;
      case 'Designation':
        return this.apiUrl; // You may need to update this URL if it's different
      case 'Resigned':
        return this.apiUrl; // Update as needed
      case 'ONBOARDING':
        return this.apiUrl; // Update as needed
      case 'PRODUCT_WORK_AREA':
        return this.apiUrl; // Update as needed
      default:
        return this.apiUrl; // Provide a default URL
    }
  }
}
