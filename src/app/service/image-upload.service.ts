import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMAGE_API_ENDPOINT } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.post(IMAGE_API_ENDPOINT + 'upload', uploadData);
  }

  uploadImageToPost(file: File, postId: Number): Observable<any> {
    const uploadData = new FormData();

    uploadData.append('file', file);

    return this.http.post(IMAGE_API_ENDPOINT + postId + '/upload', uploadData);
  }

  getProfileImage(): Observable<any> {
    return this.http.get(IMAGE_API_ENDPOINT + 'profileImage');
  }

  getImageToPost(postId: number) {
    return this.http.get(IMAGE_API_ENDPOINT + postId + '/image');
  }
}
