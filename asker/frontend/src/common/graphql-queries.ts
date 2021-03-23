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
