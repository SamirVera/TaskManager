import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ItemService } from '../../services/item.service';
import { TaskModel } from '../../models/task.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: []
})
export class AddTaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  tags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  removable = true;
  selectable = true;
  chips: any[] = [];

  constructor(private itemService: ItemService, private dialogRef: MatDialogRef<AddTaskModalComponent>, @Inject(MAT_DIALOG_DATA) public data: TaskModel) { }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      detail: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required)
    });
  }

  add(event: MatChipInputEvent): void {
    const value = event.value;
    if ((value || '').trim()) {
      this.chips.push({ name: value.trim() });
    }

    // Limpiar el input
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(chip: { name: string }): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  onSubmit(): void {

    let newItem: TaskModel = {
      name: this.taskForm.value.name,
      detail: this.taskForm.value.detail,
      endDate: this.taskForm.value.dueDate,
      state: false,
      priority: this.taskForm.value.priority,
    }
    if (this.data) {
      newItem.id = this.data.id;
      this.itemService.update(newItem)

    } else {
      this.itemService.add(newItem);
    }
    this.dialogRef.close();
  }
  edit(chip: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(chip);
      return;
    }

    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips[index].name = value;
    }
  }
}
