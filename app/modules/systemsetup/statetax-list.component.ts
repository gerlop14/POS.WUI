import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material';

import { StateTaxService } from '../../services/statetax.service';

@Component({
    selector: 'app-statetax-list',
    templateUrl: './statetax-list.component.html',
    styleUrls: ['./statetax-list.component.css']
})
export class StateTaxListComponent implements OnInit {
  public statetaxes: StateTax[];
  isBusy = false;
  public displayedColumns: string[] = ['stateTaxId', 'taxAmount', 'Actions'];
    public dataSource; 


  constructor(private http: HttpClient,
    private router: Router,
    private readonly StateTaxService: StateTaxService ) {

  }

 ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isBusy = true;
    try {
        this.statetaxes = await this.StateTaxService.loadStateTaxes();
        this.dataSource = new MatTableDataSource(this.statetaxes);
    } finally {
      this.isBusy = false;
    }
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  onCreate() {
    this.router.navigate(["/statetax/create"]);
  }

  onEdit(statetax: StateTax) {
    this.router.navigate(["/statetax/edit", statetax.stateTaxId]);
  }

  onDelete(statetax: StateTax) {
    if (confirm("Do you really want to delete this record?")) {
      var url = "https://localhost:44390/api/statetax/" + statetax.stateTaxId;
      this.http
        .delete(url)
        .subscribe(res => {
          console.log("Record has been deleted.");
          this.loadData();
        }, error => console.log(error));
    }
  }

  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get<StateTax[]>('https://localhost:44390/api/'+'statetax/all').subscribe(result => {
  //    this.statetaxes = result;
  //  }, error => console.error(error));
  //}
}
