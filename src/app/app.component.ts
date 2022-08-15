import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from './utils/core.serivce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  code = '';
  state;

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService) {
      console.log('app comp')
    this.route.queryParamMap.subscribe((res) => {
      this.code = res['params']?.code;
      this.state = res['params']?.state;
    });
  }

  ngOnInit(): void { }

  doLogin() {
    this.coreService.doLogin();
  }
}
