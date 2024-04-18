import { Component, HostListener, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { FormControl, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {
  public isMobile!: boolean;
  items: TaskModel[] = [];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  @HostListener('window:resize', [])
  addItem() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '300px',
      height: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado');
    });
  }


}