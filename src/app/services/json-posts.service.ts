import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class JsonPostsService {

  comentarios: CommentModel[] = [];

  constructor(private http: HttpClient) { }

  getQuery<T>(query:string):Observable<T>{
    const url = `https://jsonplaceholder.typicode.com/${query}`;

    return this.http.get<T>(url);
  }

  getPosts():Observable<Post[]>{
    return this.getQuery<Post[]>('posts')
            .pipe(map((data: Post[]) => data.slice(0,10)));
  }

  getPostById(id:number):Observable<Post>{
    const finalId = (id < 11)? id : null;
    const postQuery = `posts/${finalId}`;

    return this.getQuery(postQuery);
  }

  getPostComments(id: number):Observable<CommentModel[]>{
    const commentsQuery = `posts/${id}/comments`;
    
    return this.getQuery(commentsQuery);
  }

  crearComentario(comentario: any, postId: number):void{
    this.obtenerListaStorage();
    const nuevoComentario = new CommentModel(postId, comentario.nombre, comentario.email, comentario.comentario, true);
    this.comentarios.push(nuevoComentario);
    this.guardarListaStorage();
  }

  borrarComentario(id: number):void{
    const comentariosPurgados = this.comentarios.filter( comentario => comentario.id !== id);
    this.comentarios = comentariosPurgados;
    this.guardarListaStorage();
  }

  guardarListaStorage():void{
    localStorage.setItem('data', JSON.stringify(this.comentarios));
  }

  obtenerListaStorage():void{
    if (localStorage.getItem('data')){
      this.comentarios = JSON.parse(localStorage.getItem('data')!);
    } else {
      this.comentarios = []
    }
  }

  obtenerListaDeComentarios(postId?: number):CommentModel[]{
    this.obtenerListaStorage();
    if(postId){
      return this.comentarios.filter( comentario => comentario['postId'] === postId);
    } else {
      return this.comentarios;
    }
  }
}
