import { inject, Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Todo } from './todo.models';


@Injectable({ providedIn: 'root' })
export class TodoQueries {
  readonly #todoService = inject(TodoService);
  readonly #queryClient = inject(QueryClient);

  readonly todoQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.#todoService.getItemsAsPromise(),
  }));

  readonly addTodo = injectMutation(() => ({
    mutationFn: (value: string) => lastValueFrom(this.#todoService.addItem(value)),
    onSuccess: () => {
      this.#queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  readonly deleteTodo = injectMutation(() => ({
    mutationFn: (value: Todo) => lastValueFrom(this.#todoService.deleteItem(value)),
    onSuccess: () => {
      this.#queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  }));
}
