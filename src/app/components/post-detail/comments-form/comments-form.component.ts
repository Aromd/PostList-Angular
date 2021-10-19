import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommentModel } from 'src/app/models/comment.model';
import { JsonPostsService } from 'src/app/services/json-posts.service';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit {
  @Output() actualizarComments: EventEmitter<void>;
  @Input() postId!: number;
  forma!: FormGroup;
  regExPattern :string = "^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$";

  constructor(private fb: FormBuilder,
              private postService : JsonPostsService) {

    this.crearFormulario();
    this.actualizarComments = new EventEmitter();
  }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.forma.get('nombre')!.invalid && this.forma.get('nombre')!.touched;
  }

  get emailNoValido(){
    return this.forma.get('email')!.invalid && this.forma.get('email')!.touched;
  }

  get comentarioNoValido(){
    return this.forma.get('comentario')!.invalid && this.forma.get('comentario')!.touched;
  }

  crearFormulario(){
      this.forma = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.pattern(this.regExPattern)]],
        comentario: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]]
      });
  }

  guardar(){
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control => {
        control.markAllAsTouched();
      });
    }

    // posteo de informacion
    this.postService.crearComentario(this.forma.value, this.postId);
    this.forma.reset();
    this.actualizarComments.emit();
  }
}
