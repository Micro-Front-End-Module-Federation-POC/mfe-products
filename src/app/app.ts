import { Component, computed, OnInit, signal } from '@angular/core';
import { Course, SharedStateService } from '@micro-front-end-module-federation-poc/shared-state';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  readonly standaloneUrl = environment.standaloneUrl;
  protected readonly cartCount = computed(() => this.addedIds().size ?? 0);
  protected addedIds = signal(new Set<number>());

  readonly courses: Course[] = [
    { id: 1, title: 'Angular — The Complete Guide', instructor: 'Maximilian S.', price: 1299, rating: 4.8, reviews: 18420, level: 'Beginner', icon: '&#9889;', tag: 'Bestseller' },
    { id: 2, title: 'Micro Frontends with Angular', instructor: 'Manfred S.', price: 1499, rating: 4.7, reviews: 6210, level: 'Advanced', icon: '&#127760;', tag: 'Hot' },
    { id: 3, title: 'RxJS & Reactive Angular', instructor: 'Josh M.', price: 999, rating: 4.9, reviews: 9830, level: 'Intermediate', icon: '&#128200;', tag: 'Top Rated' },
    { id: 4, title: 'Webpack 5 Module Federation', instructor: 'Zack J.', price: 1199, rating: 4.6, reviews: 4100, level: 'Advanced', icon: '&#128268;', tag: 'New' },
    { id: 5, title: 'TypeScript for Angular Devs', instructor: 'Dmytro N.', price: 799, rating: 4.7, reviews: 11200, level: 'Beginner', icon: '&#128196;', tag: 'Bestseller' },
    { id: 6, title: 'NgRx — State Management', instructor: 'Alex O.', price: 1099, rating: 4.8, reviews: 7650, level: 'Intermediate', icon: '&#128260;', tag: 'Popular' },
  ];

  constructor(private sharedState: SharedStateService) { }

  ngOnInit() {
    this.sharedState.state$.subscribe(s => this.addedIds.set(new Set(s.map(c => c.id))));
  }

  addToCart(course: Course) {
    if (this.addedIds().has(course.id)) {
      this.sharedState.removeCourse(course.id);
      return;
    }
    this.sharedState.addCourse(course);
  }

  removeFromCart(id: number) {
    this.sharedState.removeCourse(id);
  }
}
