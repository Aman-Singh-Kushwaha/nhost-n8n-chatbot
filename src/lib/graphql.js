import { gql } from '@apollo/client';

export const GET_CHATS = gql`
  query GetChats {
    chats(order_by: {created_at: desc}) {
      id
      title
      created_at
    }
  }
`;

export const GET_MESSAGES = gql`
  subscription GetMessages($chat_id: uuid!) {
    messages(where: {chat_id: {_eq: $chat_id}}, order_by: {created_at: asc}) {
      id
      content
      role
      created_at
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat {
    insert_chats_one(object: {}) {
      id
    }
  }
`;

export const SEND_USER_MESSAGE = gql`
  mutation SendUserMessage($chat_id: uuid!, $message: String!) {
    insert_messages_one(object: {chat_id: $chat_id, content: $message, role: "user"}) {
      id
    }
  }
`;

export const TRIGGER_BOT_ACTION = gql`
  mutation TriggerBotAction($chat_id: uuid!, $message: String!) {
    sendMessage(chat_id: $chat_id, message: $message) {
      id
      chat_id
      content
      role
    }
  }
`;

export const UPDATE_CHAT_TITLE = gql`
    mutation UpdateChatTitle($chat_id: uuid!, $title: String!) {
        update_chats_by_pk(pk_columns: {id: $chat_id}, _set: {title: $title}) {
            id
        }
    }
`;
