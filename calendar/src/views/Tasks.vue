<template>
  <div class="root-container">

    <div class="note-container">
      <div class="note-create-container">
        <input id="title-textbox" placeholder="Title" type="text" v-model="title">
        <textarea id="note-textbox" placeholder="Note content..." v-model="content"></textarea>
        <div class="buttons-container">
          <button class="note-button" id="clear-button" @click="clear">Clear</button>
          <button class="note-button" id="submit" @click="saveNote">Submit</button>
        </div>
      </div>
      <div class="note-list">
        <TaskList :tasks="tasks"/>
      </div>
    </div>
  </div>
</template>

<script>

import TaskList from "@/components/TaskList";
export default {
  name: "Tasks",
  components: {TaskList},
  data() {
    return {
      title: "",
      content: ""
    };
  },
  computed: {
    tasks() {
      return this.$root.$data.tasks;
    }
  },
  methods: {
    saveNote() {
      this.$root.$data.tasks.push({
        title: this.title,
        content: this.content,
        completed: false,
      });
      this.clear();
    },
    clear() {
      this.title = "";
      this.content = "";
    }
  }

}
</script>

<style scoped>

@media only screen and (max-width: 1200px) {
  .root-container {
    min-height: 800px;
  }
}

@media only screen and (min-width: 1201px) {
  .root-container {
    min-height: 1000px;
  }
}

@media only screen and (max-width: 1000px) {
  * {
    font-size: large;
    font-family: Arial;
    color: white;
  }

  .root-container {
    width: 100%;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    justify-content: center;
  }

  .note-container {
    display: flex;
    width: 1000px;
    flex-direction: column;
  }

  .note-create-container {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .note-list {
    display: flex;
    flex-direction: column;
  }

  #title-textbox {
    margin-bottom: 20px;
    height: 40px;
    padding: 5px 10px;
    background-color: #666666;
    border-width: 0;
  }

  #note-textbox {
    margin-bottom: 20px;
    min-height: 200px;
    padding: 5px 10px;
    background-color: #666666;
    border-width: 0;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
  }

  .note-button {
    width: 50%;
    height: 40px;
    border-width: 0;
    background-color: #333333;
  }

  button:hover {
    background-color: #555555;
  }

  button:active {
    background-color: #666666;
  }
}

@media only screen and (min-width: 1001px) {
  * {
    font-size: large;
    font-family: Arial;
    color: white;
  }

  .root-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .note-container {
    display: flex;
    width: 1000px;
    flex-direction: column;
  }

  .note-create-container {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .note-list {
    display: flex;
    flex-direction: column;
  }

  #title-textbox {
    margin-bottom: 20px;
    height: 40px;
    padding: 5px 10px;
    background-color: #666666;
    border-width: 0;
  }

  #note-textbox {
    margin-bottom: 20px;
    min-height: 200px;
    padding: 5px 10px;
    background-color: #666666;
    border-width: 0;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
  }

  .note-button {
    width: 50%;
    height: 40px;
    border-width: 0;
    background-color: #333333;
  }

  button:hover {
    background-color: #555555;
  }

  button:active {
    background-color: #666666;
  }
}

</style>
