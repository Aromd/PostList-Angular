import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentModel } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit {
  @Input() postId!: number;
  comment!: CommentModel;

  constructor() { }

  ngOnInit(): void {
    this.comment = new CommentModel(this.postId);
  }

  createComment(form: NgForm) {

    if(form.invalid){return;}

    console.log("formulario enviado");
    console.log(this.comment);
    console.log(form);
  }
}
