import { gql } from "@apollo/client";

export const CREATE_CONFERENCE = gql`
  mutation CreateConference($location: String, $name: String) {
    CreateConference(input: { location: $location, name: $name })
  }
`;

export const GET_CONFERENCE = gql`
  query ConferenceReadModel($id: ID!) {
    ConferenceReadModel(id: $id) {
      id 
      location 
      questions 
    }
  }
`;

export const GET_CONFERENCES = gql`
  query ConferenceReadModels {
    ConferenceReadModels {
      id 
      location 
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation Ask($who: String, $question: String, $conference: ID!) {
    Ask(input:  { who: $who, question: $question, conference: $conference })
  }
`;

export const LIKE_QUESTION = gql`
  mutation Like($questionId: ID!, $byWhom: String) {
    Like(input:  { questionId: $questionId, byWhom: $byWhom })
  }
`;