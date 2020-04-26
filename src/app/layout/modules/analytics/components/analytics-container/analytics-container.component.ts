import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';

@Component({
  selector: 'app-analytics-container',
  templateUrl: './analytics-container.component.html',
  styleUrls: ['./analytics-container.component.css']
})
export class AnalyticsContainerComponent implements OnInit {

  data: TreeNode[];
  doughnutData: any;
  barData: any;
  constructor() { }

  ngOnInit(): void {
    this.data = [{
      label: 'Bollywood Business',
      expanded: true,
      children: [
        {
          label: 'By Genre',
          data: { name: 'GENRE' }
        },
        {
          label: 'By Actor',
          data: { name: 'ACTOR' }
        },
        {
          label: 'By Director',
          data: { name: 'DIRECTOR' }
        },
        {
          label: 'By Writer',
          data: { name: 'WRITER' }
        }
      ]
    }];

  }


  public onOfNodeSelect(event): void {
    console.log(event.node.data.name);
    this.barData = undefined;
    this.doughnutData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }

  public onDoughnutSelect(event): void {
    console.log(event.element._index);
    this.barData = {
      labels: ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011'],
      datasets: [
        {
          label: 'Bollywood earnings in crore',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
  }

  public print(): void {
    window.focus();
    window.print();
  }

}
