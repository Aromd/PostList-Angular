import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonPostsService } from 'src/app/services/json-posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: any[] = [];
  loading: boolean = true;

  constructor(private postsService: JsonPostsService,
              private router: Router ) {
    this.postsService.getPosts()
        .subscribe( (data: any) => {
          this.loading = false;
          this.posts = data;
        })
   }

  ngOnInit(): void {
  }

  verPost(id: number){
    this.router.navigate(['/post', id]);
  }

}
