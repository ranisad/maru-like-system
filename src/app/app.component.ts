import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meru';
  drivers = [];
  city = [];
  dashboardDataByCity = [];
  dashboardDataByDriver = [];
  time = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
  startIndex = 0;
  constructor() {
    this.getDrivers();
    this.getCity();
    this.getDashBoardDataBYCity(null);
    this.getDashBoardDataBYDriver(null);
  }

  getnextWeekDateRange(day_in_week) {
    var ret = new Date(new Date());
    ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay() + 7) % 7 + 1);
    return ret.toISOString().split('T')[0];
  }

  getDrivers() {
    fetch("http://localhost:3000/drivers")
      .then(data => data.json())
      .then(data => {
        this.drivers = data;
      });
  }

  getCity() {
    fetch("http://localhost:3000/city")
      .then(data => data.json())
      .then(data => {
        this.city = data;
      });
  }

  getDashBoardDataBYCity(event) {
    let cityId=null;
    if(event){
      cityId=event.target.value;
    }else{
      cityId="1";
    }
    debugger
    this.dashboardDataByCity=[];
    fetch("http://localhost:3000/dashboardByCity?cityId="+cityId)
      .then(data => data.json())
      .then(data => {
        this.dashboardDataByCity = data;
      });
  }

  getDashBoardDataBYDriver(event) {
    let driverId=null;
    if(event){
      driverId=event.target.value;
    }else{
      driverId="1";
    }
    debugger
    this.dashboardDataByDriver=[];
    fetch("http://localhost:3000/dashboardByDriver?driverId="+driverId)
      .then(data => data.json())
      .then(data => {
        this.dashboardDataByDriver = data;
      });
  }

  logForm(f) {
    // debugger
    console.log(f)
    fetch("http://localhost:3000/assign-slot", {
      method: 'POST',
      body: JSON.stringify(f),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(data => data.json()).then(data => {
      let msg = data[0][0].value == 1 ? "assigned successfully" : "slot can not be assigned";
      alert(msg);
    })
  }

  getColor(time, day,last) {
    if(last){
      return "white"
    }
    let date = this.getnextWeekDateRange(day);
    let color = null;
    this.dashboardDataByCity.map(item => {
      let starttime = parseInt(time.split(":")[0]);
      let endtime = parseInt(time.split(":")[0]) + 1;
      let starttime1 = parseInt(item.booking_start_time.split(":")[0]);
      let endtime1 = parseInt(item.booking_end_time.split(":")[0])
      if (item.booking_date.split("T")[0] === date && ((starttime1 >= starttime && starttime1 < endtime) || (endtime1 > starttime && endtime1 <= endtime) || (starttime1 < starttime && endtime1 > endtime))) {
        if (item.booking_status == "3") {
          color = "blue";
        } else if (item.booking_status == "2") {
          color = "green";
        } else if (item.booking_status == "4") {
          debugger
          color = "yellow";
        } else if (item.booking_status == "1") {
          color = "grey";
        }
      }
    })
    return color ? color : "grey";

  }

  getColor1(time, day,last) {
    if(last){
      return "white"
    }
    let date = this.getnextWeekDateRange(day);
    let color = null;
    this.dashboardDataByDriver.map(item => {
      let starttime = parseInt(time.split(":")[0]);
      let endtime = parseInt(time.split(":")[0]) + 1;
      let starttime1 = parseInt(item.booking_start_time.split(":")[0]);
      let endtime1 = parseInt(item.booking_end_time.split(":")[0])
      if (item.booking_date.split("T")[0] === date && ((starttime1 >= starttime && starttime1 < endtime) || (endtime1 > starttime && endtime1 <= endtime)  || (starttime1 < starttime && endtime1 > endtime))) {
        if (item.booking_status == "3") {
          color = "blue";
        } else if (item.booking_status == "2") {
          color = "green";
        } else if (item.booking_status == "4") {
          debugger
          color = "yellow";
        } else if (item.booking_status == "1") {
          color = "grey";
        }
      }
    })
    return color ? color : "grey";

  }
}
