import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from './utils/core.serivce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  code = '';

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService) {
    this.route.queryParamMap.subscribe((res) => {
      this.code = res['params']?.code;
    });
  }

  ngOnInit(): void { }

  doLogin() {
    this.coreService.doLogin();
  }
}
