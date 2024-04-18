import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { ItemService } from '../../services/item.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from '../task-modal/task-modal.component';

@Component({
    selector: 'app-table',
    templateUrl: './app-table.component.html',
    styleUrls: []
})
export class TableComponent implements OnInit {
    @Input() items: any[] = [];
    private sortDirection = 'asc';
    constructor(private itemService: ItemService, private dialog: MatDialog) { }

    ngOnInit(): void {

    }

    editItem(item: TaskModel) {
        console.log(item);
        const dialogRef = this.dialog.open(AddTaskModalComponent, {
            width: '300px',
            height: '550px',
            data: item
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            console.log('El dialogo fue cerrado');
        });
    }

    deleteItem(item: TaskModel) {
        if (item.id) this.itemService.delete(item.id);
    }

    toggleState(item: any) {
        item.state = !item.state;
        this.itemService.update(item);
    }

    sort(property: string) {
        const direction = this.sortDirection === 'asc' ? 1 : -1;
        this.items.sort((a, b) => {
            if (a[property] < b[property]) {
                return -1 * direction;
            }
            if (a[property] > b[property]) {
                return 1 * direction;
            }
            return 0;
        });
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

}
