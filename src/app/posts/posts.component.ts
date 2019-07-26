import {Component, OnInit} from '@angular/core';
import {Post, PostService} from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [];

  constructor(private service: PostService) {
  }

  ngOnInit() {
    console.log('here we are');
    this.service.getPosts()
      .subscribe(response => {
        console.log(response);
      }, error => {
        alert('An unexpected error occured');
      });
  }

  createPost(title: HTMLInputElement) {
    let post = {title: title.value};
    this.service.createPost(post)
      .subscribe(response => {
        console.log(response);
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

          console.log('Rrror', error);

        });
  }
}
