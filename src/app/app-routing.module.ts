import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectComponent } from './components/projects/project.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //   canActivate: [AuthGuard]
  },
  {
    path: 'chart',
    component: ChartComponent,
    //   canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectComponent,
    //  canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }