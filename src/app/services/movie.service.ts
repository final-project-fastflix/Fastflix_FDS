import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiUrl = environment.apiUrl;
  genre: string;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  set Genre(genre: string) {
    this.genre = genre;
  }

  get Genre() {
    return this.genre;
  }

  /*Home View 구성 Movies */

  // Home main 영화
  getHomeMain(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/`, {
      headers,
    });
  }

  // 특별 소개 콘텐츠
  getBigMovie(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/big_size_video/`, {
      headers,
    });
  }

  // Fastflix 인기 콘텐츠
  getPopularMovies(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/most_likes/`, {
      headers,
    });
  }

  // 추천 영화들
  getRecommendedMovies(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/rcd/`, {
      headers,
    });
  }

  // 내가 찜한 영화
  getMyListMovies(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/my_list/`, {
      headers,
    });
  }

  // 최신 등록 영화
  getLatestMovies(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/brand_new/`, {
      headers,
    });
  }

  // 시청 중인 영화
  getFollowUpMovies(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/followup/`, {
      headers,
    });
  }

  // Genre로 Home Component 중 우리만의 카테고리 가져오기
  getMovieByGenre(genre: string): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/genre/${genre}/list/`, {
      headers,
    });
  }

  /* Movie View 구성 Movies */

  getMainMovie(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/genre_select_before/`, {
      headers,
    });
  }

  getGenreMovieList(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(
      `${this.apiUrl}/movies/list_by_genre/${this.Genre}/`,
      {
        headers,
      }
    );
  }

  /* Slider에서 Detail Open 시 Detail 요청 */

  getMovieDetail(id: number): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.subUser.id + '');

    return this.http.get<any>(`${this.apiUrl}/movies/${id}/`, { headers });
  }

  /* 좋아요, 싫어요, 내가 찜 한 목록 */

  // 좋아요
  likeMovie(movieid: number): Observable<any> {
    const subuserid = this.authService.subUser.id;
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set('Authorization', `Token ${token}`);
    return this.http.post<any>(
      `${this.apiUrl}/movies/like/`,
      {
        movieid,
        subuserid,
      },
      { headers }
    );
  }

  // 싫어요
  dislikeMovie(movieid: number): Observable<any> {
    const subuserid = this.authService.subUser.id;
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set('Authorization', `Token ${token}`);
    return this.http.post<any>(
      `${this.apiUrl}/movies/dislike/`,
      {
        movieid,
        subuserid,
      },
      { headers }
    );
  }

  // 찜하기
  myList(movieid: number): Observable<any> {
    const subuserid = this.authService.subUser.id;
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set('Authorization', `Token ${token}`);
    return this.http.post<any>(
      `${this.apiUrl}/movies/add_delete_my_list/`,
      {
        movieid,
        subuserid,
      },
      { headers }
    );
  }

  /* watch */
  // 재생 시간 저장
  saveWatchingTime(id: number, time: number) {
    const subuserid = this.authService.subUser.id;
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set('Authorization', `Token ${token}`);
    return this.http.post<any>(
      `${this.apiUrl}/movies/paused_time/`,
      {
        sub_user_id: subuserid,
        movie_id: id,
        paused_time: time,
      },
      { headers }
    );
  }
}
