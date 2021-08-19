import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-seekarte',
  templateUrl: './seekarte.component.html',
  styleUrls: ['./seekarte.component.sass']
})
export class SeekarteComponent implements OnInit {

  @ViewChild('skmap') map: ElementRef;
  @ViewChild('skimg') img: ElementRef;

  public x: number = 0;
  public y: number = 0;

  private minuteX = 52.5;
  private minuteY = 89.4;

  private offsetX = 442.5;
  private offsetY = 3255.7589;

  private scrollX = 0;
  private scrollY = 0;

  public longitude: string = "";
  public latitude: string = "";

  private calcLong(x: number): string {

    let minutes = (x - this.scrollX) / this.minuteX + this.offsetX;
    let degrees = Math.floor(minutes / 60);
    let minutesLeft = (minutes % 60).toFixed(1).toString();
    return degrees + "°" + " " + minutesLeft + "''";
  }

  private calcLat(y: number): string {

    let minutes = this.offsetY - y / this.minuteY;
    let degrees = Math.floor(minutes / 60);
    let minutesLeft = (minutes % 60).toFixed(1).toString();
    return degrees + "°" + " " + minutesLeft + "''";
  }

  constructor(
    private renderer: Renderer2,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.reset();
    this.menuService.setMenuEntryActive(0);
  }

  public showCoords(event: any): void {

    var rect = event.target.getBoundingClientRect();
    this.x = event.clientX - rect.left //x position within the element.
    this.y = event.clientY - rect.top;  //y position within the element.
    this.longitude = this.calcLong(this.x);
    this.latitude = this.calcLat(this.y);
  }

  public reset(): void {
    this.longitude = this.calcLong(0);
    this.latitude = this.calcLat(0);
  }

  public resetHard(): void {
    self.location.reload();
  }

  public dragEnd($event: CdkDragEnd) {
    let pos = $event.source.getFreeDragPosition();

  }

}
