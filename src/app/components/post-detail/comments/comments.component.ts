import { Component, OnInit, Input } from '@angular/core';
import { JsonPostsService } from 'src/app/services/json-posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  loading: boolean = true;
  comments: any[] = [];

  constructor(private postService: JsonPostsService) {
  }

  ngOnInit(): void {
    this.postService.getPostComments(this.postId!)
      .subscribe((data: any) => {
        this.comments = data;
        this.loading = false;
      })
  }

}
