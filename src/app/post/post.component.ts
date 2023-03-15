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

  constructor(
    private tokenStorageService: TokenStorageService,
    private postService: PostService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notificationService: NotificationService,
    private userService: UserService,
    private commentService: CommentService,
    private imageUploadService: ImageUploadService
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
      },
      error: (error) => {
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

  getImagesToPosts(post: IPost): void {
    if (!this.post.id) return;
    this.imageUploadService.getImageToPost(this.post.id).subscribe((data) => {
      post.image = data.imageBytes;
    });
  }

  postComment(message: string, postId: number) {
    this.commentService
      .addToCommentToPost(postId, message)
      .subscribe((data) => {
        this.post.comments?.push(data);
      });
  }

  likePost(postId: number): void {
    if (!this.post.usersLiked?.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username).subscribe(() => {
        this.post.usersLiked?.push(this.user.username);
        this.notificationService.showSnackBar('Лайк');
      });
    } else {
      this.postService.likePost(postId, this.user.username).subscribe(() => {
        const index = this.post.usersLiked?.indexOf(this.user.username, 0);
        if (index && index >= 0) {
          this.post.usersLiked?.splice(index, 1);
        }
      });
    }
  }

  formatImage(img: any): any {
    if (!img) return null;
    return 'data:image/jpeg;base64,' + img;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
