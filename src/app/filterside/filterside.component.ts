import { Component, OnInit } from '@angular/core';
import { PopService } from '../services/pop.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filterside',
  templateUrl: './filterside.component.html',
  styleUrls: ['./filterside.component.css']
})
export class FiltersideComponent implements OnInit {
  Locationdata: any[] = [];
  productdata: any[] = [];
  workgroupdata: any[] = [];

  selectedLocations: { [key: string]: boolean } = {};
  selectedProducts: { [key: string]: boolean } = {};
  selectedGroups: { [key: string]: boolean } = {};
  isLocationOpen: boolean | undefined;
  isProductOpen: boolean | undefined;
  isGroupOpen: boolean | undefined;

  constructor(
    private popser: PopService,
    public sharedService: FilterService,
  ) {}
  onOptionSelected1(description: string): void {
    // Update the selectedLocations in the shared service
    this.sharedService.selectedLocations[description] = !this.sharedService.selectedLocations[description];
  }

  toggleAccordion(): void {
    // Toggle the accordion state in the shared service
    this.sharedService.isAccordionOpen = !this.sharedService.isAccordionOpen;
  }

  options = ['Option 1', 'Option 2', 'Option 3'];

  selectedOption: string | undefined;

  selectOption(option: string) {
    this.selectedOption = option;
  }

  onOptionSelected(option: string, type: string) {
    switch (type) {
      case 'Location':
        this.selectedLocations[option] = !this.selectedLocations[option];
        break;
      case 'Product':
        this.selectedProducts[option] = !this.selectedProducts[option];
        console.log("bjk",this.selectedProducts)
        break;
      case 'Work_Group':
        this.selectedGroups[option] = !this.selectedGroups[option];
        break;
      default:
        break;
    }

    const selectedOptions = {
      Location: Object.keys(this.selectedLocations).filter((key) => this.selectedLocations[key]),
      Product: Object.keys(this.selectedProducts).filter((key) => this.selectedProducts[key]),
      Work_Group: Object.keys(this.selectedGroups).filter((key) => this.selectedGroups[key])
    };

    this.sharedService.setSelectedOptions(selectedOptions);
  }

  ngOnInit(): void {

    this.sharedService.deleteFilter.subscribe((data) => {
     console.log('recived',data);
     if(data && data.row==1){
      this.selectedLocations[data.value]=false;
      this.selectOption=data
     }
     if(data && data.row==2){
      this.selectedProducts[data.value]=false;
     }
     if(data && data.row==3){
      this.selectedGroups[data.value]=false;
     }
    });  
    this.popser.getdesigination('Location').subscribe({
      next: (data: any) => {
        this.Locationdata = data;
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
  }
  toggleLocation() {

    this.isLocationOpen = !this.isLocationOpen;

  }

 

  toggleProduct() {

    this.isProductOpen = !this.isProductOpen;

  }

 

  toggleGroup() {

    this.isGroupOpen = !this.isGroupOpen;

  }
}
