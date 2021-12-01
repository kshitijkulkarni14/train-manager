import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Departure } from 'src/app/model/departure';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit {

  @Input() departures: Departure[];
  trackAsc: boolean = false;
  directionAsc: boolean = false;
  categoryAsc: boolean = false;
  timeAsc: boolean = false;
  directionFilter: string;
  trainCategoryFilter: string;
  departuresFiltered: Departure[];

  constructor() {
  }

  ngOnInit(): void {
    this.departuresFiltered = this.departures;
  }

  sortOnTrack() {
    if (!this.trackAsc) {
      this.departuresFiltered.sort((a, b) => a.plannedTrack > b.plannedTrack ? 1 : -1);
      this.trackAsc = !this.trackAsc;
    } else {
      this.departuresFiltered.sort((a, b) => a.plannedTrack < b.plannedTrack ? 1 : -1);
      this.trackAsc = !this.trackAsc;
    }
  }

  sortOnDirection() {
    if (!this.directionAsc) {
      this.departuresFiltered.sort((a, b) => a.direction > b.direction ? 1 : -1);
      this.directionAsc = !this.directionAsc;
    } else {
      this.departuresFiltered.sort((a, b) => a.direction < b.direction ? 1 : -1);
      this.directionAsc = !this.directionAsc;
    }
  }

  sortOnCategory() {
    if (!this.categoryAsc) {
      this.departuresFiltered.sort((a, b) => a.trainCategory > b.trainCategory ? 1 : -1);
      this.categoryAsc = !this.categoryAsc;
    } else {
      this.departuresFiltered.sort((a, b) => a.trainCategory < b.trainCategory ? 1 : -1);
      this.categoryAsc = !this.categoryAsc;
    }
  }

  sortOnTime() {
    if (!this.timeAsc) {
      this.departuresFiltered.sort((a, b) => a.plannedDateTime > b.plannedDateTime ? 1 : -1);
      this.timeAsc = !this.timeAsc;
    } else {
      this.departuresFiltered.sort((a, b) => a.plannedDateTime < b.plannedDateTime ? 1 : -1);
      this.timeAsc = !this.timeAsc;
    }
  }

  filterDepartures() {
    if (this.directionFilter != '' && this.directionFilter != null) {
      this.departuresFiltered = this.departures.filter(
        departure => departure.direction.toLowerCase().includes(this.directionFilter.toLowerCase())
      )

      if (this.trainCategoryFilter != '' && this.trainCategoryFilter != null) {
        this.departuresFiltered = this.departuresFiltered.filter(
          departure => departure.trainCategory.toLowerCase().includes(this.trainCategoryFilter.toLowerCase()))
      }
    }
    else if (this.trainCategoryFilter != '' && this.trainCategoryFilter != null) {
      this.departuresFiltered = this.departures.filter(
        departure => departure.trainCategory.toLowerCase().includes(this.trainCategoryFilter.toLowerCase()))
    }
  }

  clearFilter(){
    this.departuresFiltered = this.departures;
    this.directionFilter = null;
    this.trainCategoryFilter = null;
  }

}
