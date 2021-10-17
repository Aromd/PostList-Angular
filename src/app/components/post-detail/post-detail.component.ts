import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonPostsService } from 'src/app/services/json-posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: any = {}

  constructor(private router: ActivatedRoute,
    private postService: JsonPostsService) {

      this.router.params.subscribe( params => {
        this.getPost(params['id']);
      })
     }

  ngOnInit(): void {
  }

  getPost(id: number) {

    this.postService.getPostById(id)
        .subscribe(data => {
          this.post = data;
        })
  }

}
