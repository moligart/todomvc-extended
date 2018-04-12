import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from '../../models/todo.model';

@Pipe({name: 'priority', pure: true})
export class PrioritySortPipe implements PipeTransform {
    
    transform(values, priorities, trigger) {
        return values.sort((a, b) => {
            let p1 = priorities[a.priority] ? priorities[a.priority].rank : 1;
            let p2 = priorities[b.priority] ? priorities[b.priority].rank : 1;

            if (a.completed && b.completed) {
                return a.completedDate < b.completedDate ? 1 : a.title > b.title ? 1 : -1;
            }

            if (a.completed && !b.completed) {
                return 1;
            }

            if (!a.completed && b.completed) {
                return -1;
            }

            if (p1 < p2) {
                return 1;
            }

            if (p1 > p2) {
                return -1
            }

            if (a.title > b.title) {
                return 1;
            }

            if (a.title < b.title) {
                return -1;
            }

            return 0
        });
    }
}
