import { Component, OnInit } from '@angular/core';
import { Departure } from 'src/app/model/departure';
import { Station } from 'src/app/model/station';
import { TrainDetailService } from 'src/app/services/train-detail.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  stations: Station[] = [];
  stationCodes: string[] = [];
  stationNames: string[] = [];
  stationCodesFiltered: string[] = [];
  stationNamesFiltered: string[] = [];
  selectedStationCode: string = null;
  selectedStationName: string = null;
  departures: Departure[] = [];
  isDeparturesAvailable: boolean = false;

  constructor(private trainDetailsService: TrainDetailService) { }

  ngOnInit(): void {
    this.trainDetailsService.getStations().subscribe((stations: Station[]) => {
      this.stations = stations;
      this.stationCodes = this.stations.map(station => station.stationCode);
      this.stationCodes.sort();
      this.stationNames = this.stations.map(station => station.stationName);
      this.stationNames.sort();
    },
      error => {
        alert('Something went wrong while fetching the data');
      });
  }

  searchCode($event) {
    let stationCode = $event.target.value;
    this.stationCodesFiltered = this.stationCodes.filter(
      filterCode => filterCode.toLowerCase().startsWith(stationCode.toLowerCase()));
    this.isDeparturesAvailable = false;
  }

  searchName($event) {
    let stationName = $event.target.value;
    this.stationNamesFiltered = this.stationNames.filter(filterName => filterName.toLowerCase().startsWith(stationName.toLowerCase()))
    this.isDeparturesAvailable = false;
  }

  selectCode(stationCode) {
    this.selectedStationCode = stationCode;
    this.stations.forEach(element => {
      if (element.stationCode === this.selectedStationCode) {
        this.selectedStationName = element.stationName;
        return;
      }
    });
    this.stationCodesFiltered = [];
  }

  selectName(stationName) {
    this.selectedStationName = stationName;
    this.stations.forEach(element => {
      if (element.stationName === this.selectedStationName) {
        this.selectedStationCode = element.stationCode;
        return;
      }
    });
    this.stationNamesFiltered = [];
  }

  clearStationCodes() {
    this.stationCodesFiltered = [];
  }

  clearStationNames() {
    this.stationNamesFiltered = [];
  }

  getDepartures() {
    this.clearStationCodes();
    this.clearStationNames();
    this.trainDetailsService.getDepartures(this.selectedStationCode).subscribe((departures: Departure[]) => {
      this.departures = departures;
      this.isDeparturesAvailable = true;
    },
      error => {
        console.log(error.error.message)
        alert('Something went wrong while fetching the data');
      });
  }

}
