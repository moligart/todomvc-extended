import { Component, EventEmitter, Output, Input } from '@angular/core';

import template from './todo-item.template.html';

@Component({
	selector: 'todo-item',
    template: template,
    styleUrls:  ['app/components/todo-item/todo-item.component.css']
})

export class TodoItemComponent {
	@Input() todo;

	@Output() itemModified = new EventEmitter();
    @Output() itemRemoved = new EventEmitter();
    @Output() itemEdit = new EventEmitter();

	stopEditing() {
		this.todo.setTitle(this.todo.title);
		this.todo.setPriority(this.todo.priority);
		this.todo.setCompletedDate(this.todo.completedDate);

		if (this.todo.title.length === 0) {
			this.remove();
		} else {
			this.update();
		}
	}

	toggleCompletion() {
		this.todo.completed = !this.todo.completed;

		if (!this.todo.completed) {
			this.todo.completedDate = null;
			this.update();
		} else {
			this.edit();
		}
	}

	remove() {
		this.itemRemoved.next(this.todo.uid);
	}

	update() {
		this.itemModified.next(this.todo.uid);
    }
    
    edit() {
        this.itemEdit.emit(this);
    }
}
