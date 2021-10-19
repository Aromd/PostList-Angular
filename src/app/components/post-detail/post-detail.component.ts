import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { JsonPostsService } from 'src/app/services/json-posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post!: Post;
  loading: boolean = true;
  dateOfComment?: Date;

  constructor(private routerActivated: ActivatedRoute,
              private postService: JsonPostsService,
              private router: Router) {

      this.routerActivated.params.subscribe( params => {
        this.getPost(params['id']);
      })
     }

  ngOnInit(): void {
  }

  getPost(id: number) {

    this.postService.getPostById(id)
        .subscribe((data: Post) => {
          this.post = data;
          this.loading = false;
        }, (err) => {
          this.loading = false;
          this.router.navigate(['/404']);
        } )
  }

  setDateComment(date: Date){
    this.dateOfComment = date;
  }

}
