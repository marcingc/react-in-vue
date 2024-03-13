<template>
  <div id="app">
    Who do you want to say hello to?
    <br />
    <hr />
    <hr />
    <HelloReact :name="name" :tasks="tasks"/>
    <hr />
    <hr />
    <hr />
  </div>
</template>

<script>
import HelloReact from "./components/HelloReact.jsx";

export default {
  name: "App",
  components: {
    HelloReact,
  },
  data() {
    return {
      name: "World",
      tasks: [
        {
          start: new Date(2020, 1, 1),
          end: new Date(2020, 1, 2),
          name: 'Idea',
          id: 'Task 0',
          type:'task',
          progress: 45,
          isDisabled: true,
          styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        }
        ]
    };
  },
};
</script>
