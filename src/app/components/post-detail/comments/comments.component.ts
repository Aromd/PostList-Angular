import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentModel } from 'src/app/models/comment.model';
import { CommentsServiceService } from 'src/app/services/comments-service.service';
import { JsonPostsService } from 'src/app/services/json-posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  @Output() commentDate:  EventEmitter<Date>;
  dateOfComment: Date;
  loading: boolean = true;
  comments: CommentModel[] = [];

  constructor(private postService: JsonPostsService,
              private commentService: CommentsServiceService) {
    this.commentDate = new EventEmitter();
    this.dateOfComment = new Date();
  }

  ngOnInit(): void {
    this.postService.getPostComments(this.postId!)
      .subscribe((data: any) => {
        this.comments = data;
        this.loading = false;
      })
  }

  setCommentDate(){
    this.dateOfComment = new Date();
    this.commentDate.emit(this.dateOfComment);
  }

  getNewComments(){
   const newComments = this.commentService.obtenerListaDeComentarios(this.postId);
    this.comments = [...this.comments, ...newComments];
  }
}
