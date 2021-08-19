import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeekarteComponent } from './seekarte/seekarte.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
{
  path: "seekarte",
  component: SeekarteComponent,
},

{
  path: "pruefung/:nr/:offset/:amount",
  component: TestComponent,
},

{
  path: "pruefung/:nr/:offset",
  component: TestComponent,
},

{
  path: "pruefung/:nr",
  component: TestComponent,
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
