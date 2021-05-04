import {Component, OnInit} from '@angular/core';
import {Post, PostService} from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(private service: PostService) {
  }

  ngOnInit() {
    console.log('here we are');
    this.service.getPosts()
      .subscribe(response => {
        this.posts = response;
        console.log(this.posts);
      }, error => {
        alert('An unexpected error occurred');
      });
  }

  createPost(input: HTMLInputElement) {
    const post = {title: input.value};
    input.value = '';

    this.service.createPost(post)
      .subscribe(response => {
        console.log(response);
        const savedPost = {id: response, title: post.title, userId: 1, body: 'new created body' };
        this.posts.splice(0, 0, savedPost);

      }, (error: Response) => {
        if (error.status === 400) {
          console.log('400');
        } else {
          console.log('Error: ', error);
        }
      });
  }

  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(response => {
          console.log(response);
        },
        error => {

          console.log('Error', error);

        });
  }

  deletePost(post) {
    this.service.deletePost(post.id)
      .subscribe(response => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: Response) => {
          if (error.status === 404) {
            alert('this post has already been deleted');
          } else {
            alert('An unexpected error occurred');
          }
          console.log('Error', error);
        });
  }
}
