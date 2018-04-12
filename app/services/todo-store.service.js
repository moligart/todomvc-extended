import { Injectable } from '@angular/core';

import { TodoModel } from '../models/todo.model';

@Injectable()
export class TodoStoreService {
    todos = [];
    
    priorities = {
        high : { val: 'high', rank: 3 },
        medium : { val: 'medium', rank: 2 },
        low : { val: 'low', rank: 1 }
    };

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos')) || [];

		this.todos = persistedTodos.map((todo) => {
            let priority = this.priorities[todo.priority] ? todo.priority : this.priorities.low.val;
			let ret = new TodoModel(todo.title, priority, todo.completedDate);
			ret.completed = todo.completed;
			ret.uid = todo.uid;
			return ret;
		});
	}

	get(state) {
		return this.todos.filter((todo) => todo.completed === state.completed);
    }
    
    getPriorities() {
        return this.priorities;
    }

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed) {
		const today = this.dateToday();
		this.todos.forEach((todo) => {
			todo.completed = completed;
			if (completed && todo.completedDate == null) {
				todo.completedDate = today;
			} else {
				todo.completedDate = null;
			}
		});
		this.persist();
	}

	dateToday() {
		let date = new Date();
		let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
		let month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
		return date.getFullYear() + '-' + month + '-' + day;
	};

	removeCompleted() {
		this.todos = this.get({ completed: false });
		this.persist();
	}

	getRemaining() {
		if (!this.remainingTodos) {
			this.remainingTodos = this.get({ completed: false });
		}

		return this.remainingTodos;
	}

	getCompleted() {
		if (!this.completedTodos) {
			this.completedTodos = this.get({ completed: true });
		}

		return this.completedTodos;
    }

	toggleCompletion(uid) {
		let todo = this._findByUid(uid);

		if (todo) {
			todo.completed = !todo.completed;
			this.persist();
		}
	}

	remove(uid) {
		let todo = this._findByUid(uid);

		if (todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
			this.persist();
		}
	}

	add(title) {
		this.todos.push(new TodoModel(title, this.priorities.low.val));
		this.persist();
	}

	persist() {
		this._clearCache();
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

	_findByUid(uid) {
		return this.todos.find((todo) => todo.uid == uid);
	}

	_clearCache() {
		this.completedTodos = null;
		this.remainingTodos = null;
	}
}
