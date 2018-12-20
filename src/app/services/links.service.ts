import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/internal/operators';

import * as fromReducer from './../store/app.reducer';
import { LoadLinks, SetAddLinkStatus } from './../store/actions/links.actions';
import { Link } from './../store/models/link.model';

@Injectable()
export class LinksService {
  constructor(
    private db: AngularFirestore,
    private store: Store<fromReducer.State>,
    private snackbar: MatSnackBar) {
    this.initialiseFirebaseEvents();
  }

  private initialiseFirebaseEvents() {
    this.db.collection('links')
      .snapshotChanges()
      .pipe(map(docs => {
        return docs.map(doc => {
          return { ...doc.payload.doc.data() } as Link;
        });
      }))
      .subscribe(
        (links: Link[]) => {
          this.store.dispatch(new LoadLinks(links));
        }, error => {
          this.handleError('Couldn\'t fetch links from Firebase');
        }
      );
  }

  public handleError(errorMessage: string) {
    this.snackbar.open(errorMessage, null, {
      duration: 3000
    });
  }

  private isValidURL(str: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
  }

  private getRandomUrl(count = 8) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < count; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private async generateUniqueShortUrl(link: Link) {
    let flag = false;
    while (!flag) {
      const shortUrl = this.getRandomUrl();

      const result = await this.db.collection('links').doc(shortUrl).valueChanges().pipe(take(1)).toPromise();

      if (!result) {
        link.shortUrl = shortUrl;
        flag = true;
      }
    }

    link.date = new Date();
    this.store.dispatch(new SetAddLinkStatus('LINK_ADD_STATUS_COMPLETE'));
    this.db.collection('links').doc(link.shortUrl).set(link);
  }

  addhttps(url: string) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = 'https://' + url;
    }
    return url;
  }

  addLink(link: Link) {
    if (!this.isValidURL(link.longUrl)) {
      this.handleError('Url is not valid!');
      this.store.dispatch(new SetAddLinkStatus('LINK_ADD_STATUS_ERROR'));
    } else {
      this.generateUniqueShortUrl(link);
    }
  }

  getLink(shortUrl: string) {
    return new Promise(async (resolve, reject) => {
      const result = await this.db.collection('links').doc(shortUrl).valueChanges().pipe(take(1)).toPromise();
      if (!result) {
        this.handleError('incorrect_url');
        reject('incorrect_url');
      } else {
        resolve(result);
      }
    });
  }
}
