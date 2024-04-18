import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from '../task-modal/task-modal.component';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styles: [
    ]
})
export class ItemComponent implements OnInit {

    @Input() item: any;
    @Input() index: any;
    chkItem!: FormControl;

    constructor(private itemService: ItemService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.chkItem = new FormControl(this.item.state);
        this.chkItem.valueChanges.subscribe(chkState => {
            this.changeState(chkState);
        })
    }

    deleteItem(itemId: string) {
        this.itemService.delete(itemId);
    }

    changeState(chkState: boolean) {
        this.itemService.changeState(this.item.id, chkState);
    }

    editItem(itemId: string) {
        const dialogRef = this.dialog.open(AddTaskModalComponent, {
            width: '350px',
            height: '550px',
            data: itemId
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            console.log('El dialogo fue cerrado');
        });

    }
}