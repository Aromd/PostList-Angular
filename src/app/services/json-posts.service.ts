import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';


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
    return this.getQuery('posts');
  }

  getPostById(id:number){
    const postQuery = `posts/${id}`;

    return this.getQuery(postQuery);
  }

  getPostComments(id: number){
    const commentsQuery = `posts/${id}/comments`;
    
    return this.getQuery(commentsQuery);
  }

  crearComentario(comentario: any, postId: number){
    const nuevoComentario = new CommentModel(postId, comentario.nombre, comentario.email, comentario.comentario, true);
    this.comentarios.push(nuevoComentario);
  }

  
}
