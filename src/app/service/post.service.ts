import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { POST_API_ENDPOINT } from '../constants/constants';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  createPost(post: IPost): Observable<any> {
    return this.http.post(POST_API_ENDPOINT + 'create', post);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(POST_API_ENDPOINT + 'getPost/' + id);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(POST_API_ENDPOINT + 'all');
  }

  getPostForCurrentUser(): Observable<any> {
    return this.http.get(POST_API_ENDPOINT + 'user/posts');
  }

  delete(id: number): Observable<any> {
    return this.http.post(POST_API_ENDPOINT + 'delete/' + id, null);
  }

  likePost(id: number, username: string): Observable<any> {
    return this.http.post(
      POST_API_ENDPOINT + id + '/' + username + '/like',
      null
    );
  }
}
