<template>
  <q-page>
    <div class="q-pa-md">
      <div class="text-body1">Quick Edit:</div>
      <div class="border q-card--bordered">
        <div class="q-pa-sm">
          <CreatedMenuList @fetchedMenuList="fetchedMenuList" />
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="text-body1">Configure Menu Dates:</div>
      <div class="border q-card--bordered">
        <q-dialog v-if="selectMenuDialog">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">selectMenuDialog</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-select
                filled
                v-model="selectedMenuChoice"
                :options="menuList"
                :option-value="
                  (opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)
                "
                :option-label="
                  (opt) =>
                    Object(opt) === opt && 'name' in opt ? opt.name : null
                "
                emit-value
                map-options
                style="min-width: 250px; max-width: 300px"
              />
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <DatePickerNavigation @today="onToday" @prev="onPrev" @next="onNext" />

        <div
          style="display: flex; justify-content: center; align-items: center"
        >
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
              bordered
              @mousedown-day="onMouseDownDay"
              @mouseup-day="onMouseUpDay"
              @mousemove-day="onMouseMoveDay"
              @change="onChange"
              @moved="onMoved"
              @click-day="onClickDay"
              @click-date="onClickDate"
              @click-workweek="onClickWorkweek"
              @click-head-workweek="onClickHeadWorkweek"
              @click-head-day="onClickHeadDay"
            />
          </div>
        </div>
        <q-space class="q-mt-md" />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.border {
  border-color: rgba(255, 255, 255, 0.28);
  border-radius: 4px;
}
</style>

<script setup>
import {
  QCalendarMonth,
  // addToDate,
  // parseTimestamp,
  getDayIdentifier,
  today,
} from '@quasar/quasar-ui-qcalendar/dist/index.esm';

import { ref, computed } from 'vue';
import DatePickerNavigation from '../components/DatePickerNavigation.vue';
import CreatedMenuList from 'src/components/CreatedMenuList.vue';

const leftClick = (e) => {
  return e.button === 0;
};

const selectMenuDialog = ref(false);
const menuList = ref([]);
const selectedMenuChoice = ref(null);
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

const onMouseDownDay = ({ scope, event }) => {
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
};

const onMouseUpDay = ({ scope, event }) => {
  if (leftClick(event)) {
    // mouse is up, capture last and cancel selection
    otherTimestamp.value = scope.timestamp;
    mouseDown.value = false;
    console.log(anchorTimestamp.value);
    console.log(otherTimestamp.value);
    selectMenuDialog.value = true;
  }
};

const onMouseMoveDay = ({ scope }) => {
  if (mouseDown.value === true && scope.outside !== true) {
    otherTimestamp.value = scope.timestamp;
  }
};

const fetchedMenuList = (returnedMenus) => {
  menuList.value = returnedMenus;
};

const onToday = () => {
  calendar.value.moveToToday();
};

const onPrev = () => {
  calendar.value.prev();
};

const onNext = () => {
  calendar.value.next();
};

const onMoved = (data) => {
  console.log('onMoved', data);
};

const onChange = (data) => {
  console.log('onChange', data);
};

const onClickDate = (data) => {
  console.log('onClickDate', data);
};

const onClickDay = (data) => {
  console.log('onClickDay', data);
};

const onClickWorkweek = (data) => {
  console.log('onClickWorkweek', data);
};

const onClickHeadDay = (data) => {
  console.log('onClickHeadDay', data);
};

const onClickHeadWorkweek = (data) => {
  console.log('onClickHeadWorkweek', data);
};
</script>
