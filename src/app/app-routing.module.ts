import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTaskComponent } from './components/all-tasks/all-tasks.component';

export const routes: Routes = [
  { path: 'tasks/all', component: AllTaskComponent },
  { path: 'tasks/state/:state', component: AllTaskComponent },
  { path: 'tasks/priority/:priority', component: AllTaskComponent },
  { path: 'tasks/dueDate', component: AllTaskComponent },
  { path: 'tasks', redirectTo: 'tasks/all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
