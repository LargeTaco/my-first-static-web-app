import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CoverComponent } from './cover/cover.component';

const routes: Routes = [
  { path: 'cover', component: CoverComponent }
];

@NgModule({
  declarations: [AppComponent, CoverComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
