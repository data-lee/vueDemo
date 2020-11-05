<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--<TodoHeader @addTodo="addTodo"/>  &lt;!&ndash;给TodoHeader标签对象绑定addTodo事件监听 &ndash;&gt;-->
      <TodoHeader ref="header"/>
      <todo-list :todos="todos" />
      <todo-footer :todos="todos" :deleteCompletedTodos="deleteCompletedTodos" :selectAllTodos="selectAllTodos"/>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHeader'
  import TodoList from './components/TodoList'
  import TodoFooter from './components/TodoFooter'
  import storageUtil from './util/storageUtil'
  export default {
    data () {
      return {
        todos: storageUtil.readTodos()
      }
    },
    mounted () { // 执行异步代码
      // 给 TodoHeader 绑定事件监听
      this.$refs.header.$on('addTodo', this.addTodo)

      // 订阅消息
      PubSub.subscribe('deleteTodo', (msg, index) => {
        this.deleteTodo(index)
      })
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
        // handler: function (value) {
        //   // 将 todos 最新的值(json数据)保存到localStorage中
        //   storageUtil.saveTodos(value)
        // }
        handler: storageUtil.saveTodos
        // handler: function (todos) {
        //   window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
        // }
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
