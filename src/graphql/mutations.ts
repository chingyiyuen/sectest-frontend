import gql from "graphql-tag";

export const ADD_CLICK_EVENT = gql`
  mutation addClickEvent($type: String!) {
    addClickEvent(type: $type) {
      id
      type
      timeStamp
    }
  }
`;
