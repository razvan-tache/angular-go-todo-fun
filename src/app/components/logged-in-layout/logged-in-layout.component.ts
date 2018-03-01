import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app/app.component';

@Component({
  selector: 'app-logged-in-layout',
  templateUrl: './logged-in-layout.component.html',
  styleUrls: ['./logged-in-layout.component.css']
})
export class LoggedInLayoutComponent extends AppComponent implements OnInit {
  public menuLinks: MenuLink[] = MenuLinksProvider.getMenuLinks();

  ngOnInit() {
  }

}

class MenuLinksProvider {
  public static getMenuLinks(): MenuLink[] {
    return [
      { 'title': 'Some link', 'route': '' },
      { 'title': 'Some link 2', 'route': '' },
      { 'title': 'Some link 3', 'route': '' },
      { 'title': 'Some link 4', 'route': '' },
      { 'title': 'Some link 5', 'route': '' },
      { 'title': 'Some link 6', 'route': '' },
      { 'title': 'Some link 7', 'route': '' },
    ];
  }
}

class MenuLink {
  public title;

  public route;
}
