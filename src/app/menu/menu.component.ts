import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  public nr: number = 0;
  public isTest = false;
  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit(): void {
    this.menuService.getActiveEntry().subscribe(nr => {
      this.nr = nr;
    });
  }

  public toggleMode(): void {
    this.isTest = !this.isTest;
    if (this.nr > 0) {
      if (this.isTest) {
        this.router.navigate(['/', 'pruefung', this.nr, '-1', '30']);
      } else {
        this.router.navigate(['/', 'pruefung', this.nr]);
      }
    }


  }

  public goto(route: string[]): void {
    if (this.isTest && route[1] === 'pruefung') {
      route.push('-1');
      route.push('30');
    }
    this.router.navigate(route);
  }

}
