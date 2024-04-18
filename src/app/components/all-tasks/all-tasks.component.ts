import { Component, HostListener, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddTaskModalComponent } from '../task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'all-task',
    templateUrl: './all-tasks.component.html',
    styles: [
    ]
})
export class AllTaskComponent implements OnInit {

    listItems!: TaskModel[];
    codeFilter!: string;
    title!: string;
    public isMobile!: boolean;

    constructor(private itemService: ItemService,
        private route: ActivatedRoute,
        private dialog: MatDialog) {
        this.checkDevice();
    }

    ngOnInit(): void {
        this.title = 'Gestión de Tareas';
        this.itemService.item$.subscribe(data => {
            this.listItems = data;
            this.route.params.subscribe(params => {
                const state = params['state'];
                const priority = params['priority'];

                if (state) {
                    this.codeFilter = state;
                    this.listItems = this.itemService.filterbyState(data, this.codeFilter);
                }
                if (priority) {
                    this.codeFilter = priority;
                    this.listItems = this.itemService.filterbyPriority(data, this.codeFilter);
                }
            });
        });
        this.itemService.get();
    }

    @HostListener('window:resize', [])
    private checkDevice() {
        this.isMobile = window.innerWidth < 768;
    }

    addItem() {
        const dialogRef = this.dialog.open(AddTaskModalComponent, {
            width: '300px',
            height: '550px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('El dialogo fue cerrado');
        });
    }

    undo(): void {        
        this.itemService.undo();
    }
}