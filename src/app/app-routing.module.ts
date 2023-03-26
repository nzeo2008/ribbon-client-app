import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'create',
    component: CreatePostComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: UserPostsComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
