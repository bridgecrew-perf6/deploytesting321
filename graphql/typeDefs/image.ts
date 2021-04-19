import { gql } from "apollo-server-micro";

export const imageTypeDefs = gql`
  type Image {
    _id: ID!
    imgType: String!
    image: String!
    creator: User!
    creationDate: String!
  }

  extend type Query {
    images: [Image!]
    imagesByType(imgType: String!): [Image!]
    userImages(userId: String!): [Image!]
    userImagesByType(userId: String!, imgType: String!): [Image!]
  }

  extend type Mutation {
    uploadImage(details: String!): Image!
  }
`;
