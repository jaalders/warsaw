<template>
  <div class="subcontent">
    <CreatedMenuList />
    <DatePickerNavigation @today="onToday" @prev="onPrev" @next="onNext" />

    <div style="display: flex; justify-content: center; align-items: center">
      <q-checkbox
        v-model="mobile"
        label="Mobile selection (first click, second click)"
      />
    </div>

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          :selected-start-end-dates="startEndDates"
          no-active-date
          :day-min-height="40"
          animated
          bordered
          @mousedown-day="onMouseDownDay"
          @mouseup-day="onMouseUpDay"
          @mousemove-day="onMouseMoveDay"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  QCalendarMonth,
  // addToDate,
  // parseTimestamp,
  getDayIdentifier,
  today,
} from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass';

import { ref, computed } from 'vue';
import DatePickerNavigation from '../components/DatePickerNavigation.vue';
import CreatedMenuList from 'src/components/CreatedMenuList.vue';

const leftClick = (e) => {
  return e.button === 0;
}

const selectedDate = ref(today()),
  calendar = ref(null),
  anchorTimestamp = ref(null),
  otherTimestamp = ref(null),
  mouseDown = ref(false),
  mobile = ref(false);

const startEndDates = computed(() => {
  const dates = [];
  if (
    anchorDayIdentifier.value !== false &&
    otherDayIdentifier.value !== false
  ) {
    if (anchorDayIdentifier.value <= otherDayIdentifier.value) {
      dates.push(anchorTimestamp.value.date, otherTimestamp.value.date);
    } else {
      dates.push(otherTimestamp.value.date, anchorTimestamp.value.date);
    }
  }
  return dates;
});

const anchorDayIdentifier = computed(() => {
  if (anchorTimestamp.value !== null) {
    return getDayIdentifier(anchorTimestamp.value);
  }
  return false;
});

const otherDayIdentifier = computed(() => {
  if (otherTimestamp.value !== null) {
    return getDayIdentifier(otherTimestamp.value);
  }
  return false;
});

const onMouseDownDay = (scope, event) => {
  if (leftClick(event)) {
    if (
      mobile.value === true &&
      anchorTimestamp.value !== null &&
      otherTimestamp.value !== null &&
      anchorTimestamp.value.date === otherTimestamp.value.date
    ) {
      otherTimestamp.value = scope.timestamp;
      mouseDown.value = false;
      return;
    }
    // mouse is down, start selection and capture current
    mouseDown.value = true;
    anchorTimestamp.value = scope.timestamp;
    otherTimestamp.value = scope.timestamp;
  }
}

const onMouseUpDay = (scope, event) => {
  if (leftClick(event)) {
    // mouse is up, capture last and cancel selection
    otherTimestamp.value = scope.timestamp;
    mouseDown.value = false;
    console.log(anchorTimestamp.value);
    console.log(otherTimestamp.value);
  }
}

const onMouseMoveDay = (scope) => {
  if (mouseDown.value === true && scope.outside !== true) {
    otherTimestamp.value = scope.timestamp;
  }
}

const onToday = () => {
  calendar.value.moveToToday();
}
const onPrev = () => {
  calendar.value.prev();
}
const onNext = () => {
  calendar.value.next();
}
const onMoved = (data) => {
  console.log('onMoved', data);
}
const onChange = (data) => {
  console.log('onChange', data);
};
const onClickDate = (data) => {
  console.log('onClickDate', data);
}
// const onClickDay = (data) => {
//   console.log('onClickDay', data);
// }
const onClickWorkweek = (data) => {
  console.log('onClickWorkweek', data);
}
const onClickHeadDay = (data) => {
  console.log('onClickHeadDay', data);
}
const onClickHeadWorkweek = (data) => {
  console.log('onClickHeadWorkweek', data);
}
</script>
