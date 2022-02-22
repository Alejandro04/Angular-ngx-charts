import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent {
  public dataInactive: boolean = false;
  public dataSource: MatTableDataSource<any>;
  public paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] =
    [
      'select',
      'error',
      'description',
      'date'
    ];

  constructor(
  ) { }

  ngOnInit() {
    this.getData();
  }

  public getData() {
    this.dataInactive = true;
    let data: any = [
      {
        "user": "qa@qa.com",
        "error": "login error",
        "date": "2021-05-26T07:00:14.765",
        "description": "email or password incorrect"
      },
      {
        "user": "qa@qa.com",
        "error": "login error",
        "date": "2021-05-26T07:00:14.765",
        "description": "email or password incorrect"
      },
      {
        "user": "qa@qa.com",
        "error": "login error",
        "date": "2021-05-26T07:00:14.765",
        "description": "email or password incorrect"
      },
      {
        "user": "qa@qa.com",
        "error": "login error",
        "date": "2021-05-26T07:00:14.765",
        "description": "email or password incorrect"
      },
      {
        "user": "qa@qa.com",
        "error": "login error",
        "date": "2021-05-26T07:00:14.765",
        "description": "email or password incorrect"
      },
      {
        "user": "qa@qa.com",
        "error": "login error",
        "date": "2021-05-26T07:00:14.765",
        "description": "email or password incorrect"
      },
      {
        "user": "qa@qa.com",
        "error": "login error",
        "date": "2021-05-26T07:00:14.765",
        "description": "email or password incorrect"
      }
    ]
    this.addDataToTable(data)
    this.dataInactive = false;
  }

  public addDataToTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}