import { Link } from './../store/models/link.model';
import { AddNewUrlDialogComponent } from './add-new-url/add-new-url.dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromReducer from './../store/app.reducer';
import { SetAddLinkStatus } from './../store/actions/links.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public store: Store<fromReducer.State>) {
  }

  ngOnInit() {
  }

  addUrl() {
    this.store.dispatch(new SetAddLinkStatus('LINK_ADD_STATUS_START'));
    const dialogRef = this.dialog.open(AddNewUrlDialogComponent, {
      width: '350px',
      data: {} as Link
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
