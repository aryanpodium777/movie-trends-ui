import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { MovieinfoService } from '@mvt/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics-container',
  templateUrl: './analytics-container.component.html',
  styleUrls: ['./analytics-container.component.css']
})
export class AnalyticsContainerComponent implements OnInit {

  data: TreeNode[];
  doughnutData: any;
  currentdoughnutResponse: any[];
  selectedOfType: string;
  barData: any;
  backgroundColorArray: any[];
  constructor(private readonly movieinfoService: MovieinfoService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.data = [{
      label: 'Bollywood Business',
      expanded: true,
      children: [
        {
          label: 'By Genre',
          data: { name: 'genre' }
        },
        {
          label: 'By Actor',
          data: { name: 'actor' }
        },
        {
          label: 'By Director',
          data: { name: 'director' }
        },
        {
          label: 'By Writer',
          data: { name: 'writer' }
        }
      ]
    }];

  }


  public onOfNodeSelect(event): void {
    if (!event.node.data) {
      this.barData = undefined;
      this.doughnutData = undefined;
      return;
    }
    this.selectedOfType = event.node.data.name;
    this.barData = undefined;

    this.movieinfoService.fetchDoughnutData(this.selectedOfType).subscribe((response: Array<any>) => {
      this.currentdoughnutResponse = response.sort((obj1, obj2) => obj1.count - obj2.count);
      const length = this.currentdoughnutResponse.length;
      let labelArray = new Array<string>(length);
      let countArray = new Array<number>(length);
      let backgroundColorArray = new Array<string>(length);

      for (let index = 0; index < length; index++) {
        labelArray[index] = this.currentdoughnutResponse[index].name;
        countArray[index] = this.currentdoughnutResponse[index].count;
        backgroundColorArray[index] = this.getRandomColor();
      }
      this.backgroundColorArray = backgroundColorArray;
      this.doughnutData = {
        labels: labelArray,
        datasets: [
          {
            data: countArray,
            backgroundColor: backgroundColorArray,
            hoverBackgroundColor: backgroundColorArray
          }]
      };

    });
  }

  public onDoughnutSelect(event): void {
    const id = this.currentdoughnutResponse[event.element._index].id;
    const color = this.backgroundColorArray[event.element._index];
    this.movieinfoService.fetchBarData(id, this.selectedOfType).subscribe((response: Array<any>) => {
      const sortedResponse = response.sort((obj1, obj2) => obj2.year - obj1.year);
      const tenYearData = this.fetchTenYearData(sortedResponse);
      const yearArray = tenYearData.map(obj => obj.year);
      const boxOfficeCollectionArray = tenYearData.map(obj => obj.box_office_collection);
      const barHeaderLabel = `Bollywood earnings in crore - ${this.currentdoughnutResponse[event.element._index].name}`;
      this.barData = {
        labels: yearArray,
        datasets: [
          {
            label: barHeaderLabel,
            backgroundColor: color,
            borderColor: '#1E88E5',
            data: boxOfficeCollectionArray
          }
        ]
      };

    });
  }

  public onBarSelect(event): void {
    console.log(event);
  }

  public print(): void {
    window.focus();
    window.print();
  }


  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private fetchTenYearData(sortedArray: Array<any>): Array<any> {
    const maxYear = sortedArray[0].year;
    const yearArray = [];
    for (let i = maxYear; i > (maxYear - 10); i--) {
      const yearData = sortedArray.find(obj => obj.year === i);
      if (yearData) {
        yearArray.push(yearData);
      } else {
        yearArray.push({ year: i, box_office_collection: 0 });
      }
    }
    return yearArray;
  }
}
