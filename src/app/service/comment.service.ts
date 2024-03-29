import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COMMENT_API_ENDPOINT } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  addToCommentToPost(
    postId: number,
    message: string,
    username: string
  ): Observable<any> {
    return this.http.post(COMMENT_API_ENDPOINT + 'create/' + postId, {
      message,
      username,
    });
  }

  getCommentsToPost(
    postId: number,
    pageNum: number = 0,
    pageSize: number = 10
  ): Observable<any> {
    return this.http.get(COMMENT_API_ENDPOINT + 'all/' + postId, {
      params: { pageNum, pageSize },
    });
  }

  delete(commentId: number): Observable<any> {
    return this.http.delete(COMMENT_API_ENDPOINT + 'delete/' + commentId);
  }
}
