import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { PostService } from '../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/interfaces/post.interface';
import { NotificationService } from '../service/notification.service';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../service/user.service';
import { CommentService } from '../service/comment.service';
import { ImageUploadService } from '../service/image-upload.service';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  isPostLoaded: boolean = false;
  isLoggedIn: boolean = false;
  post: IPost;
  user: IUser;
  isUserDataLoaded: boolean = false;
  isEndOfComments: boolean = false;
  pageSizeLimit: number = 20;
  pageNumLimit: number = 0;

  constructor(
    private tokenStorageService: TokenStorageService,
    private postService: PostService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notificationService: NotificationService,
    private userService: UserService,
    private commentService: CommentService,
    private imageUploadService: ImageUploadService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (!id) return;

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.postService.getPostById(parseInt(id)).subscribe({
      next: (data) => {
        this.post = data;
        this.isPostLoaded = true;
      },
      complete: () => {
        this.getImagesToPosts(this.post);
        this.post.id && this.getComments(this.post.id);
      },
      error: () => {
        this.notificationService.showSnackBar('Произошла ошибка');
        this.router.navigate(['/404']);
      },
    });

    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe({
        next: (data) => {
          this.user = data;
          this.isUserDataLoaded = true;
        },
      });
    }
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe({
      next: () => {},
      complete: () => {
        this.notificationService.showSnackBar('Пост успешно удалён');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.notificationService.showSnackBar(
          `Ошибка в удалении поста: ${error}`
        );
      },
    });
  }

  getComments(id: number) {
    this.commentService
      .getCommentsToPost(id, this.pageNumLimit, this.pageSizeLimit)
      .subscribe({
        next: ({ content, isLastPage }) => {
          this.isEndOfComments = isLastPage;
          this.post.comments = [];
          this.post.comments?.push(...content);
        },
      });
  }

  getDateTime(date: string) {
    return this.commonService.getDateTime(date);
  }

  getImagesToPosts(post: IPost): void {
    if (!this.post.id) return;
    this.imageUploadService.getImageToPost(this.post.id).subscribe((data) => {
      post.image = data.imageBytes;
    });
  }

  getMoreCommentsToPost(postId: number, pageNum: number, pageSize: number) {
    this.commentService.getCommentsToPost(postId, pageNum, pageSize).subscribe({
      next: ({ isLastPage, content }) => {
        this.isEndOfComments = isLastPage;
        this.pageNumLimit = this.pageNumLimit + 1;
        this.post.comments?.push(...content);
      },
    });
  }

  postComment(message: string, postId: number, username: string) {
    this.commentService
      .addToCommentToPost(postId, message, username)
      .subscribe((data) => {
        this.post.comments?.push(data);
      });
  }

  deleteComment(id: number) {
    this.commentService.delete(id).subscribe({
      complete: () => {
        this.post.comments = this.post.comments?.filter((comment) => {
          return comment.id !== id;
        });
        this.notificationService.showSnackBar('Комментарий успешно удалён!');
      },
      error: (error) => {
        this.notificationService.showSnackBar(
          `Ошибка при удалении комментария: ${error}`
        );
      },
    });
  }

  likePost(postId: number): void {
    if (!this.post.usersLiked?.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username).subscribe(() => {
        this.post.usersLiked?.push(this.user.username);
      });
    } else {
      this.postService.likePost(postId, this.user.username).subscribe(() => {
        const index = this.post.usersLiked?.indexOf(this.user.username, 0);
        if (index !== undefined && index >= 0) {
          this.post.usersLiked?.splice(index, 1);
        }
      });
    }
  }

  formatImage(img: any): any {
    if (!img) return null;
    return 'data:image/jpeg;base64,' + img;
  }

  setValue(message: string): void {
    const input = document.querySelector('#message') as HTMLInputElement;
    if (!input) return;
    input.value = `@${message} `;
  }
}
