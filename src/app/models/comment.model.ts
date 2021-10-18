export class CommentModel {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
    isNew?: boolean;

    constructor(postId: number, name: string, email: string, body: string, isNew?: boolean){
        this.id = Date.now();
        this.postId = postId;
        this.name = name;
        this.email = email;
        this.body = body;
        this.isNew = isNew;
    }
}