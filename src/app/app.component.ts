import { pluck } from 'rxjs/operators';
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  params;
  code = '';

  constructor(private eltRef: ElementRef, private route: ActivatedRoute) {
    // let prop = eltRef.nativeElement.getAttribute('code');
    // console.log(prop);
    console.log('app comp1', this.route.snapshot.paramMap);

    this.route.queryParamMap.pipe(
      // pluck('code')
    ).subscribe((res) => {
      this.params = res['params'];
      console.log('params=', this.params);
      this.code = this.params?.code;
    }
    );
  }

  ngOnInit(): void {
    console.log('app init', !!this.params?.code);
  }

  doLogin() {
    let client_id = '1657262818';
    let redirect_uri = 'http://localhost:4200/';
    let link = 'https://access.line.me/oauth2/v2.1/authorize?';
    link += 'response_type=code';
    link += '&client_id=' + client_id;
    link += '&redirect_uri=' + redirect_uri;
    link += '&state=login';
    link += '&scope=profile%20openid%20email';
    window.location.href = link;
  }
}
