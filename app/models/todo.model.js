import * as uuid from 'node-uuid';

export class TodoModel {
    completed;
    completedDate;
    title;
    priority;
	uid;

	setTitle(title) {
		this.title = title.trim();
    }
    
    setPriority(priority) {
        this.priority = priority.trim();
    }

    setCompletedDate(date) {
        this.completedDate = date;
    }

	constructor(title, priority, completedDate) {
		this.uid = uuid.v4();
		this.completed = false;
        this.title = title.trim();
        this.priority = priority;
        this.completedDate = completedDate;
	}
}
