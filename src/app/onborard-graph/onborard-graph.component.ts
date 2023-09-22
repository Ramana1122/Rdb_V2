import { Component ,OnInit} from '@angular/core';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Chart from 'chart.js/auto';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-onborard-graph',
  templateUrl: './onborard-graph.component.html',
  styleUrls: ['./onborard-graph.component.css']
})
export class OnborardGraphComponent {
  chartOptions: any;
  menuOpen=false;
  chartData: any[] = [];
  chart:any; // Chart instance
  totalCount1:number=0
  count=0
  details1: any[] = [];
  labels:any[]=[]
  dataSet:any[]=[]
  datalabels:any[]=[]


  constructor(private apiService: ApiService,private router:Router,private filterService:FilterService) {}
  onClickMethod2() {
    this.router.navigate(['/admin/listview']);
  }

  ngOnInit() {
    //this.createChart()
   this.fetchOnBoard()
 }

 toggler() {
  this.menuOpen = !this.menuOpen;
}

 fetchOnBoard() {
  const selectedOptions=this.filterService.getSelectedOptions();
  const locations=selectedOptions.Location;
  const products=selectedOptions.Product;
  const workGroups=selectedOptions.Work_Group;

  const pivot='Onboarding';
  this.filterService.getFilteredEmployees(pivot,locations,products,workGroups).subscribe(
    (data) => {
      this.details1 = data;
     let color=['#22aa99','#994499','#316395','#b82e2e','#0099c6','#109618','#22aa99']
     let dat: any[]=[] 
     data.forEach((a:any)=>{
      this.count=this.count+1;
      if (this.count<=10){
        this.labels.push(a.ShortValue)
        dat.push(a.Count)
      }
      })
      let sample={
        // label: this.labels,
        data:dat,
        backgroundColor:color,
        borderWidth: 1,
     }
      this.dataSet.push(sample)
      this.createChart()
    },

    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}



createChart(){
this.chart = new Chart("MyChart", {
  type: 'bar',
  data: {
     labels:this.labels, 
     datasets:this.dataSet
  },
  options: {
     responsive: true,
     plugins:{

      title: {  

        display: true,  

        text: "TEAM - ONBOARD BASED",  

        color: 'black',  

        position: 'top',  

     },



    },
  
     maintainAspectRatio: true,
     scales: {
      x: {
        stacked: true,
    },
    y: {
        stacked: true,
    }
   
     }
     
  }
});

 }


 exportChart(format: string) {
  const chartContainer = document.querySelector('.chart-container') as HTMLElement;
  if (!chartContainer) return;

  html2canvas(chartContainer).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    if (format === 'pdf') {
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
      pdf.save('chart.pdf');
    } else if (format === 'png' || format === 'jpg') {
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `chart.${format}`;
      link.click();
    }
  });
}

}