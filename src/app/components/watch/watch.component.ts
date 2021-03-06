import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  OnInit
} from "@angular/core";
import { MovieDetail } from "src/app/models/movies-detail";
import { Router, ActivatedRoute } from "@angular/router";
import { MovieService } from "src/app/services/movie.service";

declare let videojs: any;

@Component({
  selector: "app-watch",
  templateUrl: "./watch.component.html",
  styleUrls: ["./watch.component.css"]
})
export class WatchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() movie: MovieDetail;
  vidObj: any;
  movieId: number;
  poster: string = "https://i.ytimg.com/vi/YE7VzlLtp-4/maxresdefault.jpg";

  // 샘플 영상 링크
  video: string =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  pauseMovie: boolean = false;
  playIconActive: boolean = false;
  movieTitle: string;
  madeYear: string;
  ageLimit: string;
  runningTime: string;
  movieIntro: string;

  // 시간 저장 변수
  hourOfMovie: number;
  minOfMovie: number;
  secOfMovie: number;

  @ViewChild("myvid", null) vid: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => (this.movieId = +params.get("id")));
  }

  ngAfterViewInit() {
    const options = {
      controls: true,
      autoplay: true,
      preload: "auto",
      techOrder: ["html5"],
      controlBar: {
        volumePanel: { inline: true }
      },
      fluid: true
    };

    this.vidObj = new videojs(
      this.vid.nativeElement,
      options,
      function onPlayerReady() {}
    );

    const myPlayer = videojs("my-video");

    this.movieService.getMovieDetail(this.movieId).subscribe(detail => {
      this.video = detail["video_file"] || this.video;
      this.movieTitle = detail["name"];
      this.madeYear = detail["production_date"];
      this.ageLimit = detail["degree"]["degree_image_path"];
      this.runningTime = detail["running_time"];
      this.movieIntro = detail["synopsis"];

      myPlayer.src({ type: "video/mp4", src: this.video });
    });

    // 10초 전, 후 이동 버튼 vjs-control-bar에 동적 추가
    // 뒤로가기 버튼 추가
    const myControlBar = document.querySelector(".vjs-control-bar");
    const backForwardContain = document.createElement("div");
    const backArrowContain = document.createElement("div");
    let playBackForwardButton = "";
    let backArrow = "";

    myPlayer.ready(() => {
      playBackForwardButton = `<div class="play-back"
                  style="position: absolute;
                  left: 67px;
                  margin-top: 12px;
                  cursor: pointer;">
                  <i id="move-back" 
                  class="material-icons">
                  replay_10
                  </i>
                  </div>
                  <div class="play-forward"
                  style="position: absolute;
                  left: 103px;
                  margin-top: 12px;
                  cursor: pointer;">
                  <i id="move-forward" 
                  class="material-icons">
                  forward_10
                  </i>
                  </div>`;

      backArrow = `<div 
                  class="back-arrow"
                  style="position: fixed;
                  left: 0;
                  top: 0;
                  margin: 15px;
                  cursor: pointer;">
                  <img id="back-to-home" alt="뒤로가기" src="https://www.materialui.co/materialIcons/navigation/arrow_back_white_36x36.png">
                  </div>`;

      myControlBar.appendChild(backForwardContain);
      backForwardContain.classList.add("back-forward-contain");
      backForwardContain.innerHTML = playBackForwardButton;

      document
        .querySelector("#move-back")
        .addEventListener("click", this.moveBack);
      document
        .querySelector("#move-forward")
        .addEventListener("click", this.moveForward);

      myControlBar.appendChild(backArrowContain);
      backArrowContain.classList.add("back-arrow-contain");
      backArrowContain.innerHTML = backArrow;

      document
        .querySelector("#back-to-home")
        .addEventListener("click", this.historyBack);

      //test
      // 플레이어 구동 시 lastTime부터 플레이 시작
      this.movieService.getMovieDetail(this.movieId).subscribe(detail => {
        myPlayer.currentTime(detail["to_be_continue"]);
      });
    });

    window.addEventListener("beforeunload", this.savePlayTime);
  }

  // OnDestroy 적용으로 컴포넌트 소멸 시(스트리밍 페이지 이탈 시) 시간 저장
  // 뒤로가기 시 시간 저장
  ngOnDestroy() {
    this.savePlayTime();
  }

  // 10초 전,후 이동
  moveForward() {
    const myPlayer = videojs("my-video");
    myPlayer.currentTime(myPlayer.currentTime() + 10);
  }
  moveBack() {
    const myPlayer = videojs("my-video");
    myPlayer.currentTime(myPlayer.currentTime() - 10);
  }

  // 엔터키 -> 전체화면
  enterFullScreen() {
    const myPlayer = videojs("my-video");
    myPlayer.requestFullscreen();
  }

  // 스페이스바 -> 일시정지 or 재생
  playOrPause() {
    const myPlayer = videojs("my-video");
    myPlayer.paused() ? myPlayer.play() : myPlayer.pause();
  }

  // 뒤로가기 버튼
  historyBack() {
    window.history.back();
  }

  // 현재 시청 중인 영상 일시정지 시 2.5초 뒤 영화정보 트랜지션으로 노출
  pauseVideo() {
    const myPlayer = videojs("my-video");
    this.pauseMovie = false;
    setTimeout(() => {
      if (myPlayer.paused() === true) {
        this.pauseMovie = true;
      }
    }, 2000);
  }

  savePlayTime() {
    const myPlayer = videojs("my-video");
    this.movieService
      .saveWatchingTime(this.movieId, Math.round(myPlayer.currentTime()))
      .subscribe(({ saved }) => {}, error => console.error(error));
  }
}
