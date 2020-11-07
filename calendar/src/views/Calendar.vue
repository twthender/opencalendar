<template>
  <div class="root-component">
    <CalendarDisplay></CalendarDisplay>
  </div>
</template>

<script>
import CalendarDisplay from "@/components/CalendarDisplay";
export default {
  name: "Calendar",
  components: {
    CalendarDisplay
  },
}
</script>

<style scoped>
@media only screen and (max-width: 1200px) {
  .root-component {
    min-height: 800px;
  }
}

@media only screen and (min-width: 1201px) {
  .root-component {
    min-height: 1000px;
  }
}
</style>