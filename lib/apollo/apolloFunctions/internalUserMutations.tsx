import {
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import { IinternalUser } from "_components/index";
import { initializeApollo } from "../../apollo";
import GraphResolvers from "../apiGraphStrings";

const { GET_SINGLE_INTERNAL_USER } = GraphResolvers.queries;
export const updateInternalUserProfile = async (
  updateFunc: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>,
  formInputs: string
) => {
  const formObj: IinternalUser = JSON.parse(formInputs);
  try {
    await updateFunc({
      variables: { formInputs },
      update(cache, { data: { updateInternalUser } }) {
        const internalUser: any = cache.readQuery({
          query: GET_SINGLE_INTERNAL_USER,
          variables: { userId: formObj.id },
        });
        cache.writeQuery({
          query: GET_SINGLE_INTERNAL_USER,
          variables: { userId: formObj.id },
          data: { getInternalUser: internalUser },
        });
      },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
