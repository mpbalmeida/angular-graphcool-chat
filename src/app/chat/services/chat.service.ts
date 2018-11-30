import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Chat} from '../models/chat.model';
import {Apollo} from 'apollo-angular';
import {AuthService} from '../../core/services/auth.service';
import {AllChatsQuery, CHAT_BY_ID_OR_USERS_QUERY, ChatQuery, CREATE_PRIVATE_CHAT_MUTATION, USER_CHATS_QUERY} from './chat.graphl';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private apollo: Apollo,
    private authService: AuthService
  ) { }

  getUserChats(): Observable<Chat[]> {
    return this.apollo.query<AllChatsQuery>({
      query: USER_CHATS_QUERY,
      variables: {
        loggedUserId: this.authService.authUser.id
      }
    }).pipe(
      map(res => res.data.allChats),
      map((chats: Chat[]) => {
        const chatsToSort = chats.slice();
        return chatsToSort.sort((o1, o2) => {
          const valueO1 = o1.messages.length > 0 ? new Date(o1.messages[0].createdAt).getTime() : new Date(o1.createdAt).getTime();
          const valueO2 = o2.messages.length > 0 ? new Date(o2.messages[0].createdAt).getTime() : new Date(o2.createdAt).getTime();

          return valueO2 - valueO1;
        });
      })
    );
  }

  getChatByIdOrByUsers(chatOrUserId: string): Observable<Chat> {
    return this.apollo.query<ChatQuery | AllChatsQuery>({
      query: CHAT_BY_ID_OR_USERS_QUERY,
      variables: {
        chatId: chatOrUserId,
        targetUserId: chatOrUserId,
        loggedUserId: this.authService.authUser.id
      }
    }).pipe(
      map(res => res.data['Chat'] ? res.data['Chat'] : res.data['allChats'][0])
    );
  }

  createPrivateChat(targetUserId: string): Observable<Chat> {
    return this.apollo.mutate({
      mutation: CREATE_PRIVATE_CHAT_MUTATION,
      variables: {
        loggedUserId: this.authService.authUser.id,
        targetUserId
      }
    }).pipe(
      map(res => res.data.createChat)
    );
  }
}
