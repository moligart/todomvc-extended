import { 
    Component, 
    OnInit, 
    Input, 
    Output, 
    OnChanges, 
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: 'app/components/dialog/dialog.template.html',
    styleUrls: ['app/components/dialog/dialog.component.css'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})

export class DialogComponent {
    @Input() closable = true;
    @Input() visible;
    @Input() todoItem;
    @Input() priorities;

    @Output() visibleChange: EventEmitter<> = new EventEmitter();
    @Output() closeEdit = new EventEmitter();
    @Output() cancelEdit = new EventEmitter();

    now = Date.now();

    constructor() {}

    ngOnInit() {}

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    saveAndClose(completedDate) {
        if (completedDate) {
            this.todoItem.todo.completedDate = completedDate.value;
        }
        this.closeEdit.emit();
        this.close();
    }

    cancelAndClose() {
        this.cancelEdit.emit();
        this.close();
    }
}
