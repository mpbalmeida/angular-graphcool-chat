import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Chat} from '../../models/chat.model';
import {Subscription} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  chat: Chat;
  recipientId: string = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.data
        .pipe(
          map(routeData => this.chat = routeData.chat),
          mergeMap(() => this.route.paramMap),
          tap((params: ParamMap) => {
            if (!this.chat) {
              this.recipientId = params.get('id');
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
