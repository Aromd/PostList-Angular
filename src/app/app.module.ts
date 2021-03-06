import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CommentsComponent } from './components/post-detail/comments/comments.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { CommentsFormComponent } from './components/post-detail/comments-form/comments-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailComponent,
    NotFoundComponent,
    NavbarComponent,
    CommentsComponent,
    LoadingComponent,
    CommentsFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
