export class CommentModel {
    postId!: number;
    id!: number;
    name!: string;
    email!: string;
    body!: string;

    constructor(postId: number){
        this.id = Date.now();
        this.postId = postId;
    }
}