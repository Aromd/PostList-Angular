import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommentModel } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit {

  forma!: FormGroup;

  constructor(private fb: FormBuilder) {

    this.crearFormulario();

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
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
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
    this.forma.reset();
  }
}
