import { Component, EventEmitter, Output } from '@angular/core';

import { TodoStoreService } from '../../services/todo-store.service';
import template from './todo-header.template.html';

@Component({
	selector: 'todo-header',
	template: template
})

export class TodoHeaderComponent {
	@Output() itemAdded = new EventEmitter();
	
	newTodo = '';

	constructor(todoStore:TodoStoreService) {
		this._todoStore = todoStore;
	}

	addTodo() {
		if (this.newTodo.trim().length) {
			this._todoStore.add(this.newTodo);
			this.newTodo = '';
			this.itemAdded.emit();
		}
	}
}
