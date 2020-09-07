import { Component, OnInit } from '@angular/core';
import { Day } from '../day';
import { Task } from '../task';
import { createCalendar } from '../createCalendar.service';
import { Month } from '../month';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private createCalendar: createCalendar) { }

  ngOnInit() {
    this.month = this.createCalendar.getCurrentMonth();
    this.currentMonth = this.month.monthNumber;
    this.currentYear = this.month.year;
  }

  public currentYear: number;
  public currentMonth: number;
  public month: Month;
  public selectedDay: Day;
  public newTask: Task;
  public currentDate = new Date(); 
  public weekDays = [ 
    { title: 'Sunday', style: 'red'},
    { title: 'Monday', style: ''},
    { title: 'Tuesday', style: ''},
    { title: 'Wednesday', style: ''},
    { title: 'Thursday', style: ''},
    { title: 'Friday', style: ''},
    { title: 'Saturday', style: 'red'},
  ];

  public SelectDay(day: Day) {
    this.newTask = new Task();
    this.selectedDay = day;  
  }

  public NextMonth() {
    if(this.currentMonth == 12){
      this.currentMonth =1;
      this.currentYear++;
    }else{
      this.currentMonth++;
    }
    this.month = this.createCalendar.createMonth(this.currentMonth, this.currentYear);
  }

  public PrevMonth() {
    if(this.currentMonth == 1){
      this.currentMonth = 12;
      this.currentYear--;
    }else{
      this.currentMonth--;
    }
    this.month = this.createCalendar.createMonth(this.currentMonth, this.currentYear);
  }

  public EditTask(task: Task) {
    task.state = 'edit'
  }

  public SaveTask(task: Task) {
    task.state = 'show'
  }
  public DeleteTask(task: Task){
    task.state = 'deleted'
    task.title = '';
    task.note = '';
  }
  public AddTask(){
    this.selectedDay.tasks.push(this.newTask); 
    this.newTask = new Task();
  }
}