import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LineComponent } from './oauth2/line.component';
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  { path: '', component: LineComponent },
  { path: 'oauth', component: LineComponent }
];

@NgModule({
  declarations: [AppComponent, LineComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
