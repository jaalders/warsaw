<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="col-3">
          <div class="section-layout">
            <span class="section-layout-column" style="flex: 0 0 auto; width: 100%"></span>
          </div>
        </div>
        <div class="col-3">
          <div class="section-layout">
            <span class="section-layout-column" style="flex: 0 0 auto; width: 50%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 50%"></span>
          </div>
        </div>
        <div class="col-3">
          <div class="section-layout">
            <span class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></span>
          </div>
        </div>
        <div class="col-3">
          <div class="section-layout">
            <span class="section-layout-column" style="flex: 0 0 auto; width: 25%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 25%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 25%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 25%"></span>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="col-3">
          <div class="section-layout">
            <span class="section-layout-column" style="flex: 0 0 auto; width: 25%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 25%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 50%"></span>
          </div>
        </div>
        <div class="col-3">
          <div class="section-layout">
            <span class="section-layout-column" style="flex: 0 0 auto; width: 50%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 25%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 25%"></span>
          </div>
        </div>
        <div class="col-3">
          <div class="section-layout">
            <span class="section-layout-column" style="flex: 0 0 auto; width: 66.66%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></span>
          </div>
        </div>
        <div class="col-3">
          <div class="section-layout">
            <span class="section-layout-column" style="flex: 0 0 auto; width: 66.66%"></span>
            <span class="section-layout-column" style="flex: 0 0 auto; width: 33.33%"></span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style>
.section-layout {
  display: flex;
  height: 70px;
  padding: 10px;
}

.section-layout-column {
  background-color: #d5dadf;
}
</style>
