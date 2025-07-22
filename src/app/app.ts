import { Component, inject } from '@angular/core';
import { TodoStore } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [TodoStore],
})
export class App {
  todoStore = inject(TodoStore);

  onAddTodo() {
    this.todoStore.addTodo("asdasdasd");
  }

}
