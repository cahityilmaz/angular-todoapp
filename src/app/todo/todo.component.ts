import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Model } from '../model';
import { TodoItem } from '../todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor() { 
    this.model.items = this.getItemsFromLocalStorage();
  }

  displayAll: boolean = false;
  inputText: string = "";

  model = new Model();

  getName(): string {
    return this.model.name;
  }

  getItemsFromLocalStorage(): TodoItem[] {
    let items: TodoItem[] = [];
    let value  = localStorage.getItem("items");

    if (value) {
      items = JSON.parse(value);
    }
    return items;
  }

  getItems(): TodoItem[] {
    if (this.displayAll) {
      return this.model.items;
    }
    return this.model.items.filter(item => !item.action);
  }

  getBtnClasses() {
    return {
      'btn-primary': this.inputText.length > 0,
      'btn-secondary': this.inputText.length == 0,
      'disabled': this.inputText.length == 0
    }
  }

  addItem() {
    let newItem = { description: this.inputText, action: false };
    this.model.items.push(newItem);
    localStorage.setItem("items", JSON.stringify(this.model.items));
    this.inputText = "";
  }

  getFinishedCount(): number {
    return this.model.items.filter(item => item.action).length;
  }

}
