import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEssayComponent } from './components/create-essay/create-essay.component';
import { ListEssaysComponent } from './components/list-essays/list-essays.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEssayComponent,
    ListEssaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
