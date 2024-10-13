import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupComponent } from './components/signup-page/signup-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/aboutUs-page/aboutUs.component';
import { MainIndexComponent } from './components/main-index/main-index.component';
import { BfsPageComponent } from './components/bfs-page/bfs-page.component';
import { DfsPageComponent } from './components/dfs-page/dfs-page.component';
import { FaqComponent } from './components/faq/faq.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
  },
  {
    path: 'mainIndex',
    component: MainIndexComponent,
  },
  {
    path: 'dfsPage',
    component: DfsPageComponent,
  },
  {
    path: 'bfsPage',
    component: BfsPageComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
