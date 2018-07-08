import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';

import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private apiUrl = 'https://api.graph.cool/simple/v1/cjjd1m0ew0vu6015813vk3c13';

  constructor(
    private apollo: Apollo
  ) {
    this.allUsers();
  }

  allUsers(): void {
    this.apollo.query({
      query: gql `
        query {
          allUsers{
            id
            name
            email
          }
        }
        `
    }).subscribe(res => console.log(res));
  }
}
