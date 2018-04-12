import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoStoreService } from './services/todo-store.service';

import {
	AppComponent,
	TodoListComponent,
	TodoFooterComponent,
	TodoHeaderComponent,
    TodoItemComponent,
	DialogComponent
} from './components';

import { TrimPipe, PrioritySortPipe } from './pipes';
import { routes } from './routes';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
        AppComponent,
		DialogComponent,
		TodoListComponent,
		TodoFooterComponent,
		TodoHeaderComponent,
		TodoItemComponent,
		TrimPipe,
		PrioritySortPipe
	],
	imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
		HttpModule,
		RouterModule.forRoot(routes, {
			useHash: true
		})
	],
	providers: [
		TodoStoreService
	]
})
export class MainModule {}
