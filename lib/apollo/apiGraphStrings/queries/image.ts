import { gql } from "@apollo/client";

const imgQueries = {
  GET_IMGS_ALL: gql`
    query Images {
      images {
        _id
        imgType
        image
        creationDate
        creator {
          _id
          appid
        }
      }
    }
  `,
  GET_IMGS_BY_TYPE: gql`
    query ImagesByType($imgType: String!) {
      imagesByType(imgType: $imgType) {
        _id
        imgType
        image
        creationDate
        creator {
          _id
          appid
        }
      }
    }
  `,
  GET_USER_IMGS: gql`
    query UserImages($userId: String!) {
      userImages(userId: $userId) {
        _id
        imgType
        image
        creationDate
        creator {
          _id
          appid
        }
      }
    }
  `,
  GET_USER_IMGS_BY_TYPE: gql`
    query UserImagesByType($userId: String!, $imgType: String!) {
      userImagesByType(userId: $userId, imgType: $imgType) {
        _id
        imgType
        image
        creationDate
        creator {
          _id
          appid
        }
      }
    }
  `,
};

export default imgQueries;
