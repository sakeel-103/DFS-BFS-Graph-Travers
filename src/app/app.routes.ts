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
import { RealworldComponent } from './components/realworld/realworld.component';
import { QuestionBankComponent } from './components/practice/practice.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { ReviewComponent } from './components/reviews/reviews.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AlgorithmComparisonComponent } from './components/algocompare/algocompare.component';
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
    path: 'contactUs',
    component: ContactUsComponent,
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
    path: 'real-world',
    component: RealworldComponent,
  },
  {
    path: 'questions',
    component: QuestionBankComponent,
  },
  {
    path: 'resources',
    component: ResourcesComponent,
  },
  {
    path: 'contributors',
    component: ContributorsComponent,
  },
  {
    path: 'editor',
    component: CodeEditorComponent,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'pagenotfound',
    component: PageNotFoundComponent,
  },
  {
    path: 'algo-compare',
    component: AlgorithmComparisonComponent,
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
