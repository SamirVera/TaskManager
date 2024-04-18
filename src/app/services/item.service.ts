import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    private unfilteredData: TaskModel[] = [];
    id!: number;
    itemSub: TaskModel[] = [];
    private sub = new Subject<TaskModel[]>();
    item$ = this.sub.asObservable();
    private history: TaskModel[][] = [];

    private subFilter = new Subject<string>();
    codeFilter$ = this.subFilter.asObservable();

    constructor() { }

    private generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    add(newItem: TaskModel) {
        this.get();
        newItem.id = this.generateId();
        this.itemSub.push(newItem);
        this.sub.next(this.itemSub);
        localStorage.setItem("item", JSON.stringify(this.itemSub));
        this.saveChanges();

    }

    get() {
        const item = localStorage.getItem("item");
        const listItems = item ? JSON.parse(item) : []; if (listItems == null) {
            this.itemSub = [];
            this.sub.next([]);
        } else {
            this.itemSub = listItems;
            this.sub.next(listItems);
        }
    }



    filterbyState(data: TaskModel[], codeFilter: string): TaskModel[] {
        let filteredData: TaskModel[];

        switch (codeFilter) {
            case 'completed':
                filteredData = data.filter(item => item.state === true);
                break;
            case 'pending':
                filteredData = data.filter(item => item.state === false);
                break;
            default:
                filteredData = data;
                break;
        }

        return filteredData;
    }

    filterbyPriority(data: TaskModel[], codeFilter: string): TaskModel[] {
        let filteredData: TaskModel[];

        switch (codeFilter) {
            case 'high':
                filteredData = data.filter(item => item.priority === 'high');
                break;
            case 'medium':
                filteredData = data.filter(item => item.priority === 'medium');
                break;
            case 'low':
                filteredData = data.filter(item => item.priority === 'low');
                break;
            default:
                filteredData = data;
                break;
        }

        return filteredData;
    }


    changeState(id: string, state: boolean) {

        let itemsResult = this.itemSub.map(item => {
            if (item.id === id) item.state = state;
            return item;
        });

        this.sub.next(itemsResult);
        localStorage.setItem("item", JSON.stringify(itemsResult));
        this.itemSub = itemsResult;
    }

    delete(itemId: string) {
        let itemsResult = this.itemSub.
            filter(items => items.id != itemId);
        this.sub.next(itemsResult);
        localStorage.setItem("item", JSON.stringify(itemsResult));
        this.itemSub = itemsResult;
        this.saveChanges();
    }

    saveChanges() {
        this.history.push(this.itemSub.map(item => ({ ...item })));
        this.sub.next(this.itemSub);
        localStorage.setItem("item", JSON.stringify(this.itemSub));
      }
    

    update(updatedItem: TaskModel) {
        this.get();
        const index = this.itemSub.findIndex(item => item.id === updatedItem.id);

        if (index !== -1) {
            this.itemSub[index] = updatedItem;
        } else {
            return;
        }
        this.sub.next(this.itemSub);
        localStorage.setItem("item", JSON.stringify(this.itemSub));
    }

    undo() {
        if (this.history.length > 1) {
            this.history.pop(); 
            this.itemSub = this.history[this.history.length - 1];
            this.sub.next(this.itemSub);
            localStorage.setItem("item", JSON.stringify(this.itemSub));
        }
    }

}