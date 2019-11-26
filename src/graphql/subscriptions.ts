import gql from "graphql-tag";

export const NEW_CLICK_EVENTS = gql`
  subscription addedClickEvent {
    addedClickEvent {
      id
      type
      timeStamp
    }
  }
`;
