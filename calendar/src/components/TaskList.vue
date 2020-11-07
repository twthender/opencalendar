<template>
  <div class="wrapper">
    <div class="incomplete-list">
      <div class="task" v-for="task in uncompletedTasks" :key="task.title">
        <h2 class="incomplete">{{ task.title }}</h2>
        <p>{{ task.content }}</p>
        <button @click="completeTask(task)" value="Complete">Complete</button>
      </div>
    </div>
    <div class="complete-list">
      <div class="task" v-for="task in completedTasks" :key="task.title">
        <h2 class="complete">{{ task.title }}</h2>
        <p>{{ task.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    tasks: Array
  },
  computed: {
    uncompletedTasks() {
      return this.$props.tasks.filter((task) => !task.completed);
    },
    completedTasks() {
      return this.$props.tasks.filter((task) => task.completed);
    }
  },
  methods: {
    completeTask(task) {
      let index = this.tasks.indexOf(task);
      this.tasks[index].completed = true;
    }
  }
}
</script>

<style scoped>

@media only screen and (max-width: 1000px) {
  .wrapper {
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    text-align: start;
  }

  .incomplete-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .complete-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

@media only screen and (min-width: 1001px) {
  .wrapper {
    display: flex;
    margin-top: 40px;
    flex-direction: row;
    text-align: start;
  }

  .incomplete-list {
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    width: 50%;
  }

  .complete-list {
    display: flex;
    margin-left: 5px;
    flex-direction: column;
    width: 50%;
  }
}

* {
  padding: 0;
  margin: 0;
}

button {
  width: 100%;
  height: 30px;
  border-width: 0;
  color: white;
  background-color: #333333;
  outline: none;
}

button:hover {
  background-color: #555555;
}

button:active {
  background-color: #666666;
}

.task {
  background-color: #666666;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.complete {
  background-color: #2c3e50;
}

.incomplete {
  background-color: #502c3e;
}

.task h2 {
  padding: 5px;
}

.task p {
  padding: 5px;
}
</style>
