import { Store, select } from '@ngrx/store';
import { LinksService } from './../../services/links.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Link, LinkAddStatus } from 'src/app/store/models/link.model';
import * as fromReducer from './../../store/app.reducer';
import * as fromLinks from './../../store/reducers/links.reducer';
import { SetAddLinkStatus } from './../../store/actions/links.actions';

@Component({
  selector: 'app-add-new-url',
  templateUrl: './add-new-url.dialog.html',
  styleUrls: ['./add-new-url.dialog.scss']
})
export class AddNewUrlDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddNewUrlDialogComponent>,
    private linkService: LinksService,
    private store: Store<fromReducer.State>,
    @Inject(MAT_DIALOG_DATA) public data: Link) {
    }

  ngOnInit() {
    this.store.pipe(select(fromLinks.getLinkAddStatus)).subscribe(
      (linkAddStatus: LinkAddStatus) => {
        if (linkAddStatus === 'LINK_ADD_STATUS_COMPLETE') {
          setTimeout( () => {
            this.dialogRef.close();
          }, 100);
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUrl(): void {
    if (!this.data.longUrl) {
      this.linkService.handleError('Please input url');
    } else {
      this.linkService.addLink(this.data);
    }
  }

}
