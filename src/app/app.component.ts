import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';

import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private apollo: Apollo
  ) {
    this.allUsers();
    this.createUser();
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

  createUser(): void {
    this.apollo.mutate({
      mutation: gql `
        mutation CreateNewUser($name: String!, $email: String!, $password: String!) {
          createUser ( name: $name, email: $email, password: $password
          ) {
            id
            name
            email
          }
        }
      `,
      variables: {
        name: 'José da Silva',
        email: 'jose@email.com',
        password: '123456'
      }
    }).subscribe(res => console.log(res));
  }
}
