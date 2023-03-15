import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { PostService } from '../../service/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from '../../service/user.service';
import { ImageUploadService } from '../../service/image-upload.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isUserDataLoaded: boolean = false;
  user: IUser;
  selectedFile: File;
  userProfileImage: File;
  previewImgUrl: string | ArrayBuffer | null;

  constructor(
    private tokenStorageService: TokenStorageService,
    private postService: PostService,
    private dialog: MatDialog,
    private userService: UserService,
    private notificationService: NotificationService,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.isUserDataLoaded = true;
    });

    this.imageUploadService.getProfileImage().subscribe((data) => {
      this.userProfileImage = data.imageBytes;
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target.files?.length) return;

    this.selectedFile = target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = () => {
      this.previewImgUrl = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();

    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user,
    };
    this.dialog.open(UserEditComponent, dialogUserEditConfig);
  }

  formatImage(img: any): any {
    if (!img) return null;
    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageUploadService
        .uploadImageToUser(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar(
            'Изображение успешно загружено'
          );
        });
    }
  }
}
