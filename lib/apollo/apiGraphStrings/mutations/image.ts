import { gql } from "@apollo/client";

const imgMutations = {
  UPLOAD_IMAGE: gql`
    mutation UploadImage($details: String!) {
      uploadImage(details: $details) {
        _id
      }
    }
  `,
};

export default imgMutations;
