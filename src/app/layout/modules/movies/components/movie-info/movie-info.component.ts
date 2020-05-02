import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieinfoService, UserService } from '@mvt/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/core/models/review-model';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  public reviewForm: FormGroup;
  public movieInfo;
  public review: Review;

  constructor(
    private readonly movieinfoService: MovieinfoService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    const movie_info_id = this.route.snapshot.paramMap.get('id');
    this.movieinfoService.fetchMovieinfo(movie_info_id).subscribe(res => {
      this.movieInfo = res;
      if (this.userService.getLoggedInUser()) {
        this.movieinfoService.fetchReview(movie_info_id, this.userService.getLoggedInUser().id).subscribe((review: Review) => {
          this.review = review;
          this.review.movie_info_id = +movie_info_id;
          this.review.reviewer_id = (this.userService.getLoggedInUser()) ? this.userService.getLoggedInUser().id : null;
          console.log(this.review, 'review');
          this.createReviewForm();
        }, error => {
          this.review = { id: null, title: '', remark: '', rating: 0 };
          this.review.movie_info_id = +movie_info_id;
          this.review.reviewer_id = (this.userService.getLoggedInUser()) ? this.userService.getLoggedInUser().id : null;
          console.log(this.review, 'review');
          this.createReviewForm();
        });
      } else {
        this.review = { id: null, title: '', remark: '', rating: 0 };
        this.review.movie_info_id = +movie_info_id;
        this.review.reviewer_id = (this.userService.getLoggedInUser()) ? this.userService.getLoggedInUser().id : null;
        console.log(this.review, 'review');
        this.createReviewForm();
      }
    });

  }

  public getActorsOrWritersOrDirectorsName(list: Array<any>): string {
    if (list) {
      let names: string = '';
      list.forEach(obj => {
        names = (names) ? names + ',' + obj.name : obj.name;
      });
      return names;
    }
  }

  public getGenre(list: Array<any>): string {
    if (list) {
      let names: string = '';
      list.forEach(obj => {
        names = (names) ? names + ',' + obj.title : obj.title;
      });
      return names;
    }
  }
  showDialog: boolean;
  public submitReview(): void {
    const movie_info_id = this.route.snapshot.paramMap.get('id');
    const payload = this.review;
    payload.reviewer_id = (this.userService.getLoggedInUser()) ? this.userService.getLoggedInUser().id : null;
    payload.movie_info_id = +movie_info_id;
    if (!payload.reviewer_id) {
      this.showDialog = true;
      return;
    }
    this.movieinfoService.submitRating(payload).subscribe(response => {
      console.log('Successfully logged');
    })
  }

  private createReviewForm(): void {
    this.reviewForm = new FormGroup({
      remark: new FormControl(this.review.remark),
      rating: new FormControl(this.review.rating)
    });
  }
}
