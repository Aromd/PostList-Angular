import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentModel } from 'src/app/models/comment.model';
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

  constructor(private postService: JsonPostsService) {
    this.commentDate = new EventEmitter();
    this.dateOfComment = new Date();
    this.nuevosComentarios();
  }

  ngOnInit(): void {
    this.postService.getPostComments(this.postId!)
      .subscribe((data: any) => {
        this.comments = data;
        this.loading = false;
        this.nuevosComentarios();
      })
  }

  setCommentDate(){
    this.dateOfComment = new Date();
    this.commentDate.emit(this.dateOfComment);
  }

  nuevosComentarios(){
      const nuevosComentarios = this.postService.obtenerListaDeComentarios(this.postId);
      nuevosComentarios.forEach(comentario => {
        const alreadyInArray = this.comments.find( comment => comment.id === comentario.id );
        if ( !alreadyInArray ){
          this.comments.push(comentario);
        } else {
          return
        }
      })
  }

  eliminarComentario(id: number){
    const comentariosPurgados = this.comments.filter( comentario => comentario.id !== id);
    this.comments = comentariosPurgados;
    this.postService.borrarComentario(id);
  }

}
