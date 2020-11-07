<template>
  <div class="wrapper">
    <div class="note" v-for="note in notes" :key="note.title">
      <div class="header">
        <h2>{{ note.title }}</h2>
        <i class="fa fa-times" aria-hidden="true" @click="removeNote(note)"></i>
      </div>
      <p>{{ note.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteList",
  props: {
    notes: Array
  },
  methods: {
    removeNote(note) {
      let index = this.$root.$data.notes.indexOf(note);
      this.$root.$data.notes.splice(index, 1);
    }
  }
}
</script>

<style scoped>

* {
  padding: 0;
  margin: 0;
}

.wrapper {
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  text-align: start;
}

.note {
  background-color: #666666;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

i {
  cursor: pointer;
}

.note p {
  padding: 5px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #2c503e;
}
</style>
