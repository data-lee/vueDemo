<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"/>
      <todo-list :todos="todos" :deleteTodo="deleteTodo"/>
      <todo-footer :todos="todos" :deleteCompletedTodos="deleteCompletedTodos" :selectAllTodos="selectAllTodos"/>
    </div>
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHeader'
  import TodoList from './components/TodoList'
  import TodoFooter from './components/TodoFooter'
  export default {
    data () {
      return {
        todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
      }
    },
    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },
      deleteCompletedTodos () {
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      selectAllTodos (check) {
        this.todos.forEach(todo => todo.complete = check)
      }
    },
    watch: { // 选择深度监视
      todos: {
        deep: true,
        handler: function (value) {
          // 将 todos 最新的值(json数据)保存到localStorage中
          window.localStorage.setItem('todos_key', JSON.stringify(value))
        }
      }
    },
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
