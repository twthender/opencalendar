<template>
  <div id="calendar-container">
    <div class="selector-container">
      <i class="fa fa-arrow-left" aria-hidden="true" @click="moveMonthLeft"></i>
      <h2 id="month-display">{{currentMonth}}</h2>
      <i class="fa fa-arrow-right" aria-hidden="true" @click="moveMonthRight"></i>
    </div>
    <h3 class="centered-title">Filters</h3>
    <div class="filter-container">
      <div :class="filters['National holiday'] ? 'filter selected-filter' : 'filter'" id="National holiday" @click="onFilterClicked('National holiday')">
        <div class="filter-color-rectangle filter-national-holiday"></div>
        <h4>National Holiday</h4>
      </div>
      <div :class="filters['Local holiday'] ? 'filter selected-filter' : 'filter'" id="Local holiday" @click="onFilterClicked('Local holiday')">
        <div class="filter-color-rectangle filter-local-holiday"></div>
        <h4>Local Holiday</h4>
      </div>
      <div :class="filters['Orthodox'] ? 'filter selected-filter' : 'filter'" id="Orthodox" @click="onFilterClicked('Orthodox')">
        <div class="filter-color-rectangle filter-orthodox"></div>
        <h4>Orthodox</h4>
      </div>
      <div :class="filters['Observance'] ? 'filter selected-filter' : 'filter'" id="Observance" @click="onFilterClicked('Observance')">
        <div class="filter-color-rectangle filter-observance"></div>
        <h4>Observance</h4>
      </div>
      <div :class="filters['Sporting event'] ? 'filter selected-filter' : 'filter'" id="Sporting event" @click="onFilterClicked('Sporting event')">
        <div class="filter-color-rectangle filter-sporting-event"></div>
        <h4>Sporting Event</h4>
      </div>
      <div :class="filters['Worldwide observance'] ? 'filter selected-filter' : 'filter'" id="Worldwide observance" @click="onFilterClicked('Worldwide observance')">
        <div class="filter-color-rectangle filter-worldwide-observance"></div>
        <h4>Worldwide Observance</h4>
      </div>
      <div :class="filters['United Nations observance'] ? 'filter selected-filter' : 'filter'" id="United Nations observance" @click="onFilterClicked('United Nations observance')">
        <div class="filter-color-rectangle filter-united-nations-observance"></div>
        <h4>United Nations Observance</h4>
      </div>
      <div :class="filters['Other'] ? 'filter selected-filter' : 'filter'" id="Other" @click="onFilterClicked('Other')">
        <div class="filter-color-rectangle filter-other"></div>
        <h4>Other</h4>
      </div>
    </div>
    <div id="calendar-header">
      <div class="day-header">Sunday</div>
      <div class="day-header">Monday</div>
      <div class="day-header">Tuesday</div>
      <div class="day-header">Wednesday</div>
      <div class="day-header">Thursday</div>
      <div class="day-header">Friday</div>
      <div class="day-header">Saturday</div>
    </div>
    <div id="calendar-body">
      <div class="placeholder-entry" v-for="placeholder in placeholders" :key="placeholder.toISOString()">
      </div>
      <div class="day-entry" v-for="day in days" :key="day.key">
        {{day.day}}
        <div class="holiday-container" v-for="holiday in day.holidays" :key="holiday.name">
          <div :class="holiday.class" v-if="filters[holiday.type]">
            {{holiday.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_KEY = '8c762cd769300edced7e7d801ecca3416bf68527';
const BASE_URL = 'https://calendarific.com/api/v2';

export default {
  name: "CalendarDisplay",
  computed: {
    currentMonth() {
      return monthToString(this.$root.$data.calendar.month);
    },
    calendarBody() {
      return "";
    }
  },
  data() {
    return {
      holidaysForYearByMonth: {},
      eventMap: {},
      placeholders: [],
      days: [],
      filters: {
        "National holiday": true,
        "Orthodox": true,
        "Local holiday": true,
        "Observance": true,
        "Sporting event": true,
        "Worldwide observance": true,
        "United Nations observance": true,
        "Other": true
      },
    };
  },
  async created() {
    await this.createCalendar();
  },
  methods: {
    async createCalendar() {
      let success = true;
      let json;
      if (!this.$root.$data.calendar.eventsRetrieved) {
        let response = await fetch(`${BASE_URL}/holidays?api_key=${API_KEY}&country=us&year=${this.$root.$data.calendar.year}`);
        if (response.status !== 200) {
          success = false;
          return;
        } else {
          json = await response.json();
        }
        for (let holiday of json.response.holidays) {
          if (!(holiday.date.datetime.month in this.$root.$data.calendar.events)) {
            this.$root.$data.calendar.events[holiday.date.datetime.month] = [];
          }
          let isDuplicate = false;
          for (let otherHoliday of this.$root.$data.calendar.events[holiday.date.datetime.month]) {
            if (holiday.name == otherHoliday.name) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            this.$root.$data.calendar.events[holiday.date.datetime.month].push(holiday);
          }
        }
      }
      if (success) {
        this.computePlaceHolders();
        this.computeDays();
        this.$root.$data.calendar.eventsRetrieved = true;
      } else {
        console.log(`Failed to retrieve data`);
      }
    },
    computePlaceHolders() {
      let day = 1;
      let firstDate = new Date(this.$root.$data.calendar.year, this.$root.$data.calendar.month, day);
      for (let i = 0; i < firstDate.getDay(); i++) {
        let date = new Date(this.$root.$data.calendar.year, this.$root.$data.calendar.month - 1, i);
        this.placeholders.push(date);
      }
    },
    computeDays() {
      let day = 1;
      let notNextMonth = true;
      while (notNextMonth) {
        let date = new Date(this.$root.$data.calendar.year, this.$root.$data.calendar.month, day);
        if (date.getMonth() != this.$root.$data.calendar.month) {
          notNextMonth = false;
          continue;
        }
        this.createDay(date);
        day++;
      }
    },
    createDay(date) {

      let day = {
        key: date.toISOString(),
        day: date.getDate(),
        holidays: [],
      };

      let holidaysInDay = [];
      for (let holiday of this.$root.$data.calendar.events[date.getMonth() + 1]) {
        if (holiday.date.datetime.day === date.getDate()) {
          holidaysInDay.push(holiday);
        }
      }

      for (let holiday of holidaysInDay) {
        let classes = "holiday ";
        switch (holiday.type[0]) {
          case "National holiday":
            classes += 'national-holiday';
            break;
          case "Orthodox":
            classes += 'orthodox';
            break;
          case "Local holiday":
            classes += 'local-holiday';
            break;
          case "Observance":
            classes += 'observance';
            break;
          case "Sporting event":
            classes += 'sporting-event';
            break;
          case "Worldwide observance":
            classes += 'worldwide-observance';
            break;
          case "United Nations observance":
            classes += 'united-nations-observance';
            break;
          default:
            holiday.type[0] = 'Other';
        }

        day.holidays.push({
          name: holiday.name,
          type: holiday.type[0],
          class: classes
        });

        // if (filters[holiday.type[0]]) {
        //   let id = holiday.name;
        //   id = id.replace("'", "");
        //   eventMap[id] = holiday;
        //   entry += `<div class="${classes}" onclick='displayEventInfo("${id}")'>${holiday.name}</div>`;
        // }
      }
      this.days.push(day);
    },
    onFilterClicked(filter) {
      this.filters[filter] = !this.filters[filter];
    },
    async moveMonthRight() {
      this.eventMap = {};
      this.placeholders = [];
      this.days = [];
      this.$root.$data.calendar.month += 1;
      if (this.$root.$data.calendar.month > 11) {
        this.$root.$data.calendar.month = 0;
        this.$root.$data.calendar.year++;
        this.$root.$data.calendar.eventsRetrieved = false;
        await this.createCalendar();
      } else {
        this.computePlaceHolders();
        this.computeDays();
      }
    },
    async moveMonthLeft() {
      this.eventMap = {};
      this.placeholders = [];
      this.days = [];
      this.$root.$data.calendar.month -= 1;
      if (this.$root.$data.calendar.month < 0) {
        this.$root.$data.calendar.month = 11;
        this.$root.$data.calendar.year--;
        this.$root.$data.calendar.eventsRetrieved = false;
        await this.createCalendar();
      } else {
        this.computePlaceHolders();
        this.computeDays();
      }
    }
  }
}

function monthToString(month) {
  switch (month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
  }
}
</script>

<style scoped>
* {
  color: #ffffff;
  margin: 0;
  padding: 0;
}

body {
  background-color: #222222;
}

.footer {
  width: 100%;
  height: 50px;
  margin-top: 50px;
  background-color: #111111;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup i {
  cursor: pointer;
  display: inline;
}

.popup h2 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.holiday-container {
  text-align: left;
}

@media only screen and (max-width: 1200px) {

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    min-height: 500px;
    transform: translate(-50%, -50%);
    background-color: #111111;
    display: none;
    padding: 20px;
  }

  .root-element {
    min-height: 800px;
  }

  .header {
    width: 100%;
    height: 70px;
    background-color: #111111;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .selector-container {
    display: flex;
    margin-top: 50px;

    align-items: center;
    justify-content: center;
  }

  .selector-container h2 {
    text-align: center;
  }

  .selector-container i {
    margin-left: 20px;
    margin-right: 20px;
    cursor: pointer;
  }

  #calendar-container {
    width: 100%;
    margin: 50px auto auto;
  }

  #calendar-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .day-header {
    background-color: #111111;
    padding: 5px;
    width: 14.28%;
    font-size: 10px;
    box-shadow: 1px 0 0 0 #888888,
    0 1px 0 0 #888888,
    1px 1px 0 0 #888888,
    1px 0 0 0 #888888 inset,
    0 1px 0 0 #888888 inset;
    box-sizing: border-box;
  }

  #calendar-body {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 7%;
  }

  .placeholder-entry {
    background-color: #555555;
    width: 14.28%;
    min-height: 40px;
    box-shadow: 1px 0 0 0 #888888,
    0 1px 0 0 #888888,
    1px 1px 0 0 #888888,
    1px 0 0 0 #888888 inset,
    0 1px 0 0 #888888 inset;
    box-sizing: border-box;
  }

  .day-entry {
    background-color: #333333;
    padding: 2px;
    box-shadow: 1px 0 0 0 #aaaaaa,
    0 1px 0 0 #aaaaaa,
    1px 1px 0 0 #aaaaaa,
    1px 0 0 0 #aaaaaa inset,
    0 1px 0 0 #aaaaaa inset;
    width: 14.28%;
    box-sizing: border-box;
    min-height: 40px;
    text-align: left;
  }

  .holiday {
    font-size: 8px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    margin: 3px;
    padding: 3px;
  }

  .centered-title {
    width: 100%;
    text-align: center;
    margin: 25px auto 20px;
  }

  .filter-container {
    width: 80%;
    display: flex;
    margin: auto auto 20px;
    flex-direction: column;
  }

  .filter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    margin-top: 5px;
    padding: 5px;
    cursor: pointer;
  }

  .selected-filter {
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
  }

  .filter-color-rectangle {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }

  .filter-national-holiday {
    background-color: #ffff00;
  }

  .filter-orthodox {
    background-color: #bdff53;
  }

  .filter-observance {
    background-color: #00bbf8;
  }

  .filter-local-holiday {
    background-color: #f84500;
  }

  .filter-sporting-event {
    background-color: #9b74ea;
  }

  .filter-worldwide-observance {
    background-color: #c81385;
  }

  .filter-united-nations-observance {
    background-color: #007e00;
  }

  .filter-other {
    background-color: #ffffff;
  }


  .national-holiday {
    border-color: #ffff00;
  }

  .orthodox {
    border-color: #bdff53;
  }

  .observance {
    border-color: #00bbf8;
  }

  .local-holiday {
    border-color: #f84500;
  }

  .sporting-event {
    border-color: #9b74ea;
  }

  .worldwide-observance {
    border-color: #c81385;
  }

  .united-nations-observance {
    border-color: #007e00;
  }
}

@media only screen and (min-width: 1201px) {

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 500px;
    min-height: 500px;
    transform: translate(-50%, -50%);
    background-color: #111111;
    display: none;
    padding: 20px;
  }

  .root-element {
    min-height: 1000px;
  }

  .header {
    width: 100%;
    height: 70px;
    background-color: #111111;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .selector-container {
    display: flex;
    margin-top: 50px;

    align-items: center;
    justify-content: center;
  }

  .selector-container h2 {
    width: 200px;
    text-align: center;
  }

  .selector-container i {
    margin-left: 20px;
    margin-right: 20px;
    cursor: pointer;
  }

  #calendar-container {
    width: 80%;
    margin: 50px auto auto;
  }

  #calendar-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .day-header {
    background-color: #111111;
    padding: 5px;
    width: 14.28%;
    box-shadow: 1px 0 0 0 #888888,
    0 1px 0 0 #888888,
    1px 1px 0 0 #888888,
    1px 0 0 0 #888888 inset,
    0 1px 0 0 #888888 inset;
    box-sizing: border-box;
  }

  #calendar-body {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 7%;
  }

  .placeholder-entry {
    background-color: #555555;
    width: 14.28%;
    min-height: 120px;
    box-shadow: 1px 0 0 0 #888888,
    0 1px 0 0 #888888,
    1px 1px 0 0 #888888,
    1px 0 0 0 #888888 inset,
    0 1px 0 0 #888888 inset;
    box-sizing: border-box;
  }

  .day-entry {
    background-color: #333333;
    padding: 5px;
    box-shadow: 1px 0 0 0 #aaaaaa,
    0 1px 0 0 #aaaaaa,
    1px 1px 0 0 #aaaaaa,
    1px 0 0 0 #aaaaaa inset,
    0 1px 0 0 #aaaaaa inset;
    width: 14.28%;
    box-sizing: border-box;
    min-height: 120px;
    text-align: left;
  }

  .holiday {
    font-size: 18px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    margin: 3px;
    padding: 3px;
    cursor: pointer;
  }

  .centered-title {
    width: 100%;
    text-align: center;
    margin: 25px auto 20px;
  }

  .filter-container {
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    flex-direction: row;
    margin: auto auto 20px;
  }

  .filter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    padding: 5px;
    cursor: pointer;
  }

  .selected-filter {
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
  }

  .filter-color-rectangle {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }

  .filter-national-holiday {
    background-color: #ffff00;
  }

  .filter-orthodox {
    background-color: #bdff53;
  }

  .filter-observance {
    background-color: #00bbf8;
  }

  .filter-local-holiday {
    background-color: #f84500;
  }

  .filter-sporting-event {
    background-color: #9b74ea;
  }

  .filter-worldwide-observance {
    background-color: #c81385;
  }

  .filter-united-nations-observance {
    background-color: #007e00;
  }

  .filter-other {
    background-color: #ffffff;
  }


  .national-holiday {
    border-color: #ffff00;
  }

  .orthodox {
    border-color: #bdff53;
  }

  .observance {
    border-color: #00bbf8;
  }

  .local-holiday {
    border-color: #f84500;
  }

  .sporting-event {
    border-color: #9b74ea;
  }

  .worldwide-observance {
    border-color: #c81385;
  }

  .united-nations-observance {
    border-color: #007e00;
  }
}
</style>