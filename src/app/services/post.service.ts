import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post>(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePost(post) {
    return this.http.post(this.url + '/' + post.id, JSON.stringify(post));
  }

}
