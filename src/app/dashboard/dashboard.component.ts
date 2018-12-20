import { LinksService } from './../services/links.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Link } from 'src/app/store/models/link.model';
import { Store, select } from '@ngrx/store';
import * as fromReducer from './../store/app.reducer';
import * as fromLinks from './../store/reducers/links.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['shortUrl', 'longUrl'];
  dataSource: MatTableDataSource<Link>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private linksService: LinksService, private store: Store<fromReducer.State>) {

    this.dataSource = new MatTableDataSource([]);

    this.store.pipe(select(fromLinks.getLinks)).subscribe(
      (links) => {
        links = links.sort((a: Link, b: Link) => {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
        });
        this.dataSource.data = links;
      }
    );
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
