import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Main } from 'src/app/models/main';
import { MovieService } from 'src/app/services/movie.service';
import { HomeCategories } from 'src/app/models/homeCategories';
import { MovieCategory } from 'src/app/models/movie-category';
import { MoviePreview } from 'src/app/models/movie-preview';
import { SubUser } from 'src/app/models/sub-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  playBillBoard: boolean;
  _mainMovie: Main;
  bigMovie: Main;
  _homeCategories: MovieCategory[];
  openedCategory: string;
  myLists: MoviePreview[];
  navigationSubscription;
  subUser: SubUser;

  constructor(
    private authService: AuthenticationService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.playBillBoard = false;
    this.init();
  }

  init() {
    this.getMainMovie();
    this.subUser = this.authService.subUser;
    this._homeCategories = HomeCategories;
    this.openedCategory = '';
  }

  get mainMovie() {
    if (this.subUser && this.subUser.id !== this.authService.subUser.id)
      this.init();
    return this._mainMovie;
  }

  get homeCategories() {
    return this._homeCategories;
  }

  getMainMovie() {
    this.movieService.getHomeMain().subscribe(mainMovie => {
      this._mainMovie = {
        id: mainMovie['메인 영화']['id'],
        image: mainMovie['메인 영화']['big_image_path'],
        logo: mainMovie['메인 영화']['logo_image_path'],
        title: mainMovie['메인 영화']['name'],
        degree: mainMovie['메인 영화']['degree'],
        synopsis: mainMovie['메인 영화']['synopsis'],
        marked: mainMovie['메인 영화']['marked'],
      };
      this.getCategoryMovies();
    });

    this.movieService.getBigMovie().subscribe(bigMovie => {
      this.bigMovie = {
        id: bigMovie['id'],
        image: bigMovie['big_image_path'],
        logo: bigMovie['logo_image_path'],
        title: bigMovie['name'],
        degree: bigMovie['degree'],
        synopsis: bigMovie['synopsis'],
        marked: bigMovie['marked'],
      };
    });
  }

  toggleMyLsit(movie: Main) {
    this.movieService.myList(movie.id).subscribe(({ marked }) => {
      this.getMyListMovies();
      movie.marked = marked;
    });
  }

  sliderOpened(category: string) {
    const thanos = document.querySelector('.thanos');

    this.openedCategory = category;
    thanos.classList.add('has-open-jaw');
  }

  sliderClosed(category: string) {
    const thanos = document.querySelector('.thanos');

    this.openedCategory =
      this.openedCategory === category ? '' : this.openedCategory;

    thanos.classList.remove('has-open-jaw');
  }

  getCategoryMovies() {
    this.getPopularMovies();
    this.getRecommendedMovies();
    this.getLatestMovies();
    this.getFollowUpMovies();
    this.getMyListMovies();
    this.getOurCatgegories();
  }

  getPopularMovies() {
    const popularCategory = this._homeCategories.find(
      ({ category }) => category === 'Fastflix 인기 콘텐츠'
    );

    this.movieService.getPopularMovies().subscribe(movies => {
      popularCategory.movies = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
    });
  }

  getRecommendedMovies() {
    const recommendedCategory = this._homeCategories.find(
      ({ category }) => category === '추천 콘텐츠'
    );

    this.movieService.getRecommendedMovies().subscribe(movies => {
      recommendedCategory.movies = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
    });
  }

  getMyListMovies() {
    const myListCategory = this._homeCategories.find(
      ({ category }) => category === '내가 찜한 콘텐츠'
    );
    this.movieService.getMyListMovies().subscribe(movies => {
      this.myLists = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
      myListCategory.movies = this.myLists;
    });
  }

  getLatestMovies() {
    const latestCategory = this._homeCategories.find(
      ({ category }) => category === '최신 등록 콘텐츠'
    );
    this.movieService.getLatestMovies().subscribe(movies => {
      latestCategory.movies = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
    });
  }

  getFollowUpMovies() {
    const follwUpCategory = this._homeCategories.find(
      ({ category }) => category === '시청 중인 콘텐츠'
    );
    this.movieService.getFollowUpMovies().subscribe(
      movies => {
        follwUpCategory.movies = movies.map(continueMovie => {
          return {
            id: continueMovie.movie.id,
            title: continueMovie.movie.name,
            url: continueMovie.movie['horizontal_image_path'],
            preview: continueMovie.movie['sample_video_file'],
            continue: continueMovie['progress_bar'],
          };
        });
        // console.log("Home 시청 중 movies 할당", follwUpCategory.movies);
      },
      error => console.error(error)
    );
  }

  getOurCatgegories() {
    this._homeCategories
      .slice(5, this._homeCategories.length + 1)
      .forEach(ourCategory => {
        const category =
          ourCategory.category === 'Fastflix 오리지널'
            ? '넷플릭스 오리지널'
            : ourCategory.category;

        this.movieService.getMovieByGenre(category).subscribe(movies => {
          if (category === '넷플릭스 오리지널') {
            ourCategory.movies = movies.map(movie => {
              return {
                id: movie.id,
                title: movie.name,
                url: movie['horizontal_image_path'],
                tallUrl: movie['original_vertical_image_path'],
                preview: movie['sample_video_file'],
              };
            });
          } else {
            ourCategory.movies = movies.map(movie => {
              return {
                id: movie.id,
                title: movie.name,
                url: movie['horizontal_image_path'],
                preview: movie['sample_video_file'],
              };
            });
          }
        });
      });
  }
}
