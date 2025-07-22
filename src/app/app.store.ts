import { signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { TodoQueries } from './todos.queries';
import { computed, inject } from '@angular/core';
import { Todo } from './todo.models';

export const TodoStore = signalStore(
  withState({ todos: [] }),
  withProps(() => {
    const todoQueries = inject(TodoQueries);

    return { todoQueries };
  }),
  withComputed(({ todoQueries }) => ({
    data: computed(() => todoQueries.todoQuery.data()),
    loading: computed(() => todoQueries.todoQuery.isLoading()),
  })),
  withMethods((store) => ({
    addTodo(value: string): void {
      store.todoQueries.addTodo.mutate(value);
    },
    deleteTodo(value: Todo): void {
      store.todoQueries.deleteTodo.mutate(value);
    },
  }))
);
