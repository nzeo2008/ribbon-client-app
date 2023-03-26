import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createPostSchema } from '../auth/schemas/create-post-schema';
import { NotificationService } from '../service/notification.service';
import { ValidatorService } from '../service/validator.service';
import { ImageUploadService } from '../service/image-upload.service';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  protected createForm: FormGroup;
  private fileToUpload: File;

  constructor(
    private notificationService: NotificationService,
    private imageUploadService: ImageUploadService,
    private postService: PostService,
    protected validator: ValidatorService,
    private fb: FormBuilder
  ) {}

  createAddPostForm(): FormGroup {
    return this.fb.group(createPostSchema);
  }

  ngOnInit(): void {
    this.createForm = this.createAddPostForm();
  }

  getFiles(event: Event): FileList | null {
    return (event.target as HTMLInputElement).files;
  }

  handleFileInput(files: FileList | null) {
    if (!files) return;
    const file = files.item(0);
    if (!file) return;

    this.fileToUpload = file;
  }

  uploadImage(id: number) {
    this.imageUploadService.uploadImageToPost(this.fileToUpload, id).subscribe({
      complete: () => {
        this.notificationService.showSnackBar('Пост успешно загружен');
      },
      error: (err) => {
        this.notificationService.showSnackBar(
          `Произошла ошибка в загрузке поста: ${err}`
        );
      },
    });
  }

  resetForm() {
    this.createForm.reset('');
  }

  uploadPostToServer() {
    this.postService
      .createPost({
        title: this.createForm.value.title,
        caption: this.createForm.value.caption,
        location: this.createForm.value.location,
      })
      .subscribe({
        next: ({ id }) => {
          this.uploadImage(id);
        },
      });
  }
}
