import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {


  Properties:Array<any> = [
    {
    "ID":1,
    "Name":"Birla House",
    "Type":"House",
    "Price":12000
  },
  {
    "ID":2,
    "Name":"Birla House 2",
    "Type":"House",
    "Price":11000
  },
  {
    "ID":3,
    "Name":"Birla House 3",
    "Type":"House",
    "Price":10000
  },
  {
    "ID":4,
    "Name":"Birla House 4",
    "Type":"House",
    "Price":15000
  },
  {
    "ID":5,
    "Name":"Birla House 5",
    "Type":"House",
    "Price":16000
  },
  {
    "ID":6,
    "Name":"Birla House 6",
    "Type":"House",
    "Price":19000
  },
]

  constructor() { }

  ngOnInit(): void {
  }

}
