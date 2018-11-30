import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Message} from '../models/message.model';
import {AllMessagesQuery, CREATE_MESSAGE_MUTATION, GET_CHAT_MESSAGES_QUERY} from './messages.graphql';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private apollo: Apollo
  ) { }

  getChatMessages(chatId: string): Observable<Message[]> {
    return this.apollo.watchQuery<AllMessagesQuery>({
      query: GET_CHAT_MESSAGES_QUERY,
      variables: {
        chatId
      }
    }).valueChanges
      .pipe(
      map(res => res.data.allMessages)
    );
  }

  createMessage(message: {text: string, chatId: string, senderId: string}): Observable<Message> {
    return this.apollo.mutate({
      mutation: CREATE_MESSAGE_MUTATION,
      variables: message
    }).pipe(
      map(res => res.data.createMessage)
    );
  }
}
