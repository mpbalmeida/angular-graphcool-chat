import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Chat} from '../../models/chat.model';
import {Observable, Subscription} from 'rxjs';
import {map, mergeMap, take, tap} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/user.model';
import {Message} from '../../models/message.model';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  chat: Chat;
  messages$: Observable<Message[]>;
  recipientId: string = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private title: Title,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.title.setTitle('Loading...');
    this.subscriptions.push(
      this.route.data
        .pipe(
          map(routeData => this.chat = routeData.chat),
          mergeMap(() => this.route.paramMap),
          tap((params: ParamMap) => {
            if (!this.chat) {
              this.recipientId = params.get('id');
              this.userService.getUserById(this.recipientId)
                .pipe(take(1))
                .subscribe((user: User) => this.title.setTitle(user.name));
            } else {
              this.title.setTitle(this.chat.title || this.chat.users[0].name);
              this.messages$ = this.messageService.getChatMessages(this.chat.id);
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.title.setTitle('Angular Graphcool Chat');
  }

}
