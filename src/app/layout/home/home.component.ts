import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/post.interface';
import { IUser } from '../../interfaces/user.interface';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { CommentService } from '../../service/comment.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ImageUploadService } from '../../service/image-upload.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: IPost[];
  user: IUser;
  isPostsLoaded: boolean = false;
  isUserDataLoaded: boolean = false;
  isLoggedIn: boolean = false;
  pageNum: number = 0;
  pageSize: number = 4;

  constructor(
    private postService: PostService,
    private commonService: CommonService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageUploadService: ImageUploadService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.getAllPosts();

    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe((data) => {
        this.user = data;
        this.isUserDataLoaded = true;
      });
    }
  }

  getImagesToPosts(posts: IPost[]): void {
    posts.forEach((post) => {
      if (!post.id) return;

      this.imageUploadService.getImageToPost(post.id).subscribe((data) => {
        post.image = data.imageBytes;
      });
    });
  }

  getAllPosts() {
    this.postService.getAllPosts(this.pageNum, this.pageSize).subscribe({
      next: (data) => {
        this.posts = data.content;
        this.isPostsLoaded = true;
      },
      error: () => {},
      complete: () => {
        this.getImagesToPosts(this.posts);
      },
    });
  }

  getDate(date: string) {
    return this.commonService.getDate(date);
  }

  getCommentsToPosts(posts: IPost[]): void {
    posts.forEach((post) => {
      if (!post.id) return;

      this.commentService.getCommentsToPost(post.id).subscribe((data) => {
        post.comments = data;
      });
    });
  }

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];

    if (!post.usersLiked?.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username).subscribe(() => {
        post.usersLiked?.push(this.user.username);
      });
    } else {
      this.postService.likePost(postId, this.user.username).subscribe(() => {
        const index = post.usersLiked?.indexOf(this.user.username, 0);

        if (index !== undefined && index >= 0) {
          post.usersLiked?.splice(index, 1);
        }
      });
    }
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe({
      next: () => {},
      complete: () => {
        this.notificationService.showSnackBar('Пост успешно удалён');
        this.getAllPosts();
      },
      error: (error) => {
        this.notificationService.showSnackBar(
          `Ошибка в удалении поста: ${error}`
        );
      },
    });
  }

  postComment(
    message: string,
    postId: number,
    postIndex: number,
    username: string
  ) {
    const post = this.posts[postIndex];

    this.commentService
      .addToCommentToPost(postId, message, username)
      .subscribe((data) => {
        post.comments?.push(data);
      });
  }

  formatImage(img: any): any {
    if (!img) return null;
    return 'data:image/jpeg;base64,' + img;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
