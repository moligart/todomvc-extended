import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoStoreService } from '../../services/todo-store.service';
import template from './todo-list.template.html';

@Component({
	selector: 'todo-list',
	template: template
})

export class TodoListComponent {
	constructor(todoStore: TodoStoreService, route: ActivatedRoute) {
		this._todoStore = todoStore;
		this._route = route;
        this._currentStatus = '';
        this.priorities = this._todoStore.getPriorities();
        this.pVals = Object.values(this.priorities);
    }
    
	todoItem = null;
	showDialog = false;
	trigger = 0;

	ngOnInit() {
		this._route.params
			.map(params => params.status)
			.subscribe((status) => {
				this._currentStatus = status;
			});
	}

	remove(uid) {
		this._todoStore.remove(uid);
		this.updateTrigger();
	}

	update() {
		this._todoStore.persist();
		this.updateTrigger();
	}
	
	clearEdit() {
		this.showDialog = false;
		this.todoItem = null;
	}
    
    edit(todoItem) {
		this.todoItem = todoItem;
        this.showDialog = true;
	}
	
	handleStopEdit() {
		if (this.todoItem != null) {
			this.todoItem.stopEditing();
			this.clearEdit();
		}
	}

	updateTrigger() {
		this.trigger++;
	}

	getTodos() {
		if (this._currentStatus == 'completed') {
			return this._todoStore.getCompleted();
		} else if (this._currentStatus == 'active') {
			return this._todoStore.getRemaining();
		} else {
			return this._todoStore.todos;
		}
	}

	allCompleted() {
		return this._todoStore.allCompleted();
	}

	setAllTo(toggleAll) {
		this._todoStore.setAllTo(toggleAll.checked);
		this.updateTrigger();
	}
}
