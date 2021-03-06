import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import {FirebaseProvider} from "../../../providers/firebase/firebase";
import { Chart } from 'chart.js';

//The button based pages
import { AddPage } from '../add/add';

@Component({
  selector: 'page-calorie',
  templateUrl: 'calorie.html'
})
export class CaloriePage {
	@ViewChild('ringCal') canvasCal;
  ringCal: any;
  public chrono:number = 0;
  public viewDay:number = 14;
  public date = new Date().toLocaleDateString();
  public viewMonth:string = "September";
  public Title: string = "Today";
  public BreakfastPerc:number;
  public LunchPerc:number;
  public SupperPerc:number;
  public SnacksPerc:number;
  public TotalCal:number;
  public BreakfastCal:number;
  public LunchCal:number;
  public SupperCal:number;
  public SnacksCal:number;
  public labels:string[] = ["Breakfast","Lunch","Supper","Snacks"];
  //Breakfast","Lunch","Supper","Snacks - Red", "Blue", "Purple", "Orange
  public cals:number[] = [];
  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController, 
              public modalCtrl: ModalController,
              public firebase: FirebaseProvider) {
    this.display();
  }
  display(): void{
    //Remember to get the date
    this.BreakfastCal = 913;
    this.LunchCal = 693;
    this.SupperCal = 1071;
    this.SnacksCal = 473;
    this.TotalCal = (this.BreakfastCal+this.LunchCal+this.SupperCal+this.SnacksCal);
    this.BreakfastPerc = Math.floor((this.BreakfastCal/this.TotalCal)*100);
    this.LunchPerc = Math.floor((this.LunchCal/this.TotalCal)*100);
    this.SupperPerc = Math.floor((this.SupperCal/this.TotalCal)*100);
    this.SnacksPerc = Math.floor((this.SnacksCal/this.TotalCal)*100);
    this.cals = [this.BreakfastCal,this.LunchCal,this.SupperCal,this.SnacksCal];
  }
  btnBack(): void{
    this.chrono--;
    this.viewDay--;
    if(this.chrono == 0){
      this.Title = "Today";
    } else if (this.chrono<0) {
      this.Title = "Past";
    } else if (this.chrono>0) {
      this.Title = "Future";
    }
  }
  btnForeward(): void{
    this.chrono++;
    this.viewDay++;
    if(this.chrono == 0){
      this.Title = "Today";
    } else if (this.chrono<0) {
      this.Title = "Past";
    } else if (this.chrono>0) {
      this.Title = "Future";
    }
  }
  btnAddBreakfast(): void{
    console.log("add Breakfast");
    this.navCtrl.push(AddPage, {myPage: 0});
  }
  btnAddLunch(): void{
    console.log("add Lunch");
    this.navCtrl.push(AddPage, {myPage: 1});
  }
  btnAddSupper(): void{
    console.log("add Supper");
    this.navCtrl.push(AddPage, {myPage: 2});
  }
  btnAddSnacks(): void{
    console.log("add Snacks");
    this.navCtrl.push(AddPage, {myPage: 3});
  }
  btnReturn(): void{
    console.log("return");
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    this.ringCal = new Chart(this.canvasCal.nativeElement, {
		  type: 'doughnut',
		  data: {
		    labels: this.labels,
		    datasets: [{
		      label: '# of Votes',
		      data: this.cals,
		      backgroundColor: [
		        'rgba(255, 99, 132, 0.2)',
		        'rgba(54, 162, 235, 0.2)',
		        'rgba(153, 102, 255, 0.2)',
		        'rgba(255, 159, 64, 0.2)'
		      ],
		      hoverBackgroundColor: [
		        "#FF6384",
		        "#36A2EB",
		        "#551a8b",
		        "#FFCE56"
		      ]
		    }]
		  }
		});
  }
}