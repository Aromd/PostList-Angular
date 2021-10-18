import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {

  listaDeComentarios: CommentModel[] = [];

  constructor() {
    this.cargarStorage();
   }

  crearComentario(comentario: any, postId: number){
      const nuevoComentario = new CommentModel(postId, comentario.nombre, comentario.email, comentario.comentario, true);
      this.listaDeComentarios.push(nuevoComentario);
      this.guardarListaStorage();
      console.log(this.listaDeComentarios);
  }

  guardarListaStorage(){
    localStorage.setItem('data', JSON.stringify(this.listaDeComentarios));
  }

  cargarStorage(){

    if( localStorage.getItem('data')) {
      this.listaDeComentarios = JSON.parse(localStorage.getItem('data')!);
    }
  }

  obtenerListaDeComentarios(postId: number){
    return this.listaDeComentarios.filter( comentario => comentario.postId === postId);
  }
}
