import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COMMENT_API_ENDPOINT } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  addToCommentToPost(postId: number, message: string): Observable<any> {
    return this.http.post(COMMENT_API_ENDPOINT + postId + '/create', {
      message,
    });
  }

  getCommentsToPost(postId: number): Observable<any> {
    return this.http.get(COMMENT_API_ENDPOINT + postId + '/all');
  }

  delete(commentId: number): Observable<any> {
    return this.http.post(COMMENT_API_ENDPOINT + commentId + '/delete', null);
  }
}
