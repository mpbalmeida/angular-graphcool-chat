import {Message} from '../models/message.model';
import gql from 'graphql-tag';

export interface AllMessagesQuery {
  allMessages: Message[];
}

const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    text
    createdAt
    sender {
      id
      name
      email
      createdAt
    }
    chat {
      id
    }
  }
`;

export const GET_CHAT_MESSAGES_QUERY = gql`
  query GetChatMessagesQuery($chatId: ID!){
    allMessages(
      filter: {
        chat: {
          id: $chatId
        }
      },
      orderBy: createdAt_ASC
    ) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessageMutation($text: String!, $chatId: ID!, $senderId: ID!){
    createMessage(
      text: $text,
      senderId: $senderId,
      chatId: $chatId
    ) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;
