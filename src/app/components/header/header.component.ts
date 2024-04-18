import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  startDate!: string;
  endDate!: string;
  items!: any[];
  showSecondaryDropdown = false;
  currentMainSelection: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMainChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    this.currentMainSelection = value;
    this.showSecondaryDropdown = value === 'state' || value === 'priority';

    if (value === 'all') {
      this.router.navigate(['/tasks', 'all']);
    } else if (value === 'dueDate') {
      this.router.navigate(['/tasks', 'dueDate']);
    } if (this.currentMainSelection !== 'dueDate') {
      this.startDate = '';
      this.endDate = '';
    }

  }

  onSecondaryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.router.navigate(['/tasks', this.currentMainSelection, value]);
  }
  filterByDate() {
    if (this.startDate && this.endDate) {
      this.items = this.items.filter(item => {
        const itemDate = new Date(item.endDate);
        return itemDate >= new Date(this.startDate) && itemDate <= new Date(this.endDate);
      });
    }
  }
}