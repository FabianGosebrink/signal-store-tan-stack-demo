import { signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { TodoQueries } from './todos.queries';
import { computed, effect, inject } from '@angular/core';
import { Todo } from './todo.models';

export const TodoStore = signalStore(
  withState({ todos: [], }),
  withProps(() => {
    const todoQueries = inject(TodoQueries);

    return { todoQueries };
  }),
  withComputed(({ todoQueries }) => ({
    data: computed(() => todoQueries.todoQuery.data()),
    loading: computed(() => todoQueries.todoQuery.isLoading()),
    _mutationSuccess: computed(() => todoQueries.addTodo.isSuccess()),
    _mutationError: computed(() => todoQueries.addTodo.isError()),
  })),
  withMethods((store) => ({
    addTodo(value: string): void {
      store.todoQueries.addTodo.mutate(value);
    },
    deleteTodo(value: Todo): void {
      store.todoQueries.deleteTodo.mutate(value);
    },
    openDialog() {
      // Open Dialog through Service
    }
  })),
  withHooks({
    onInit({ _mutationSuccess, _mutationError, ...store }) {
      effect(() => {
        if (_mutationSuccess()) {
          store.openDialog();
        }
      });
    },
  }),
);
