import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineTokenInfo, LineUserInfo, LineUserProfile } from '../utils/models/line.model';
import { CoreService } from './../utils/core.serivce';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  value = 'OAuth 2.0 site';
  code = '';
  data: LineTokenInfo;
  user: LineUserInfo;
  userProfile: LineUserProfile;
  action: 'TK' | 'UI' | 'UP';

  constructor(private coreService: CoreService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.pipe(
      pluck('params')
    ).subscribe((res) => {
      this.code = res['code'];
    }
    );
  }

  ngOnInit(): void {
    console.log('comp');
  }

  doGetToken() {
    this.action = 'TK';
    this.coreService.getToken(this.code).subscribe(res => {
      console.log(res);
      this.data = Object.assign({}, res);
    }, error => {
      if (error.status === 400 && error.error.error_description === 'invalid authorization code') {
        alert(error.error.error_description);
        this.router.navigate([]);
      }
    });
  }

  doGetUserInfo() {
    this.action = 'UI';
    if (!this.data) {
      alert('you dont have got token');
      return;
    }
    this.coreService.getUserInfo(this.data.access_token).subscribe(res => {
      this.user = res;
    });
  }

  doGetUserProfile() {
    this.action = 'UP';
    if (!this.data) {
      alert('you dont have got token');
      return;
    }
    this.coreService.getProfile(this.data.access_token).subscribe(res => {
      this.userProfile = res;
    });
  }

  doLogoutOut() {
    if (!this.data) {
      alert('you dont have got token');
      return;
    }
    this.coreService.revokeToken(this.data.access_token).subscribe(res => {
      this.data = null;
      this.user = null;
    });
    this.router.navigate([]);
  }

}
