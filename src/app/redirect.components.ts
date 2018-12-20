import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { LinksService } from './services/links.service';
import { Link } from 'src/app/store/models/link.model';

@Component({
  template: '<h1>Redirecting...</h1>'
})
export class RedirectComponent {
  constructor(private route: ActivatedRoute, private linksService: LinksService, private router: Router) {

    this.route.params.subscribe( (params) => {
      this.linksService.getLink(params.shortUrl).then((link: Link) => {
        link.longUrl = this.linksService.addhttps(link.longUrl);
        window.location.href = link.longUrl;
      }).catch((error) => {
      });
    });

  }
}
