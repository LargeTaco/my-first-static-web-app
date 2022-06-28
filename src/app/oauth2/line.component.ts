import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  value = 'World OAuth 2.0 site';
  constructor() { }

  ngOnInit(): void {
  }

  doLogoutOut(){

  }

}
