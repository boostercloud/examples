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

export const CREATE_QUESTION = gql`
  mutation Ask($who: String, $question: String, $conference: ID!) {
    Ask(input:  { who: $who, question: $question, conference: $conference })
  }
`;

export const CLAP_QUESTION = gql`
  mutation Clap($questionId: ID!, $byWhom: String) {
    Clap(input:  { questionId: $questionId, byWhom: $byWhom })
  }
`;