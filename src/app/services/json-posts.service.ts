import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonPostsService {

  comentarios: CommentModel[] = [];

  constructor(private http: HttpClient) { }

  getQuery(query:string){
    const url = `https://jsonplaceholder.typicode.com/${query}`;

    return this.http.get(url);
  }

  getPosts(){
    return this.getQuery('posts')
            .pipe(map((data: any) => data.slice(0,10)));
  }

  getPostById(id:number){
    const finalId = (id < 11)? id : null;
    const postQuery = `posts/${finalId}`;

    return this.getQuery(postQuery);
  }

  getPostComments(id: number){
    const commentsQuery = `posts/${id}/comments`;
    
    return this.getQuery(commentsQuery);
  }

  crearComentario(comentario: any, postId: number){
    this.obtenerListaStorage();
    const nuevoComentario = new CommentModel(postId, comentario.nombre, comentario.email, comentario.comentario, true);
    this.comentarios.push(nuevoComentario);
    this.guardarListaStorage();
  }

  borrarComentario(id: number){
    const comentariosPurgados = this.comentarios.filter( comentario => comentario.id !== id);
    this.comentarios = comentariosPurgados;
    this.guardarListaStorage();
  }

  guardarListaStorage(){
    localStorage.setItem('data', JSON.stringify(this.comentarios));
  }

  obtenerListaStorage(){
    if (localStorage.getItem('data')){
      this.comentarios = JSON.parse(localStorage.getItem('data')!);
    } else {
      this.comentarios = []
    }
  }

  obtenerListaDeComentarios(postId?: number){
    this.obtenerListaStorage();
    if(postId){
      return this.comentarios.filter( comentario => comentario['postId'] === postId);
    } else {
      return this.comentarios;
    }
  }
}
