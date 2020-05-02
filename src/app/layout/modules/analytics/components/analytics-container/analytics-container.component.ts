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

    this.movieinfoService.fetchBarData(id, this.selectedOfType).subscribe((response: Array<any>) => {
      const sortedResponse = response;
      const yearArray = sortedResponse.map(obj => obj.year);
      const boxOfficeCollectionArray = sortedResponse.map(obj => obj.box_office_collection);
      const barHeaderLabel = `Bollywood earnings in crore - ${this.currentdoughnutResponse[event.element._index].name}`;
      this.barData = {
        labels: yearArray,
        datasets: [
          {
            label: barHeaderLabel,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: boxOfficeCollectionArray
          }
        ]
      };

    });
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

}
