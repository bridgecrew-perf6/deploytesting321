import {
  FetchResult,
  gql,
  MutationFunctionOptions,
  OperationVariables,
  Reference,
  StoreObject,
  useMutation,
} from "@apollo/client";
import {
  GetAppUser,
  MainUser,
  User,
  UserDataProps,
} from "../../../components/appTypes/appType";
import { initializeApollo } from "../../apollo";
import GraphResolvers from "../apiGraphStrings";

const { GET_USER, IS_FAVORITE, GET_FAVORITES, GET_APPUSER } =
  GraphResolvers.queries;

export const updateUserProfile = async (
  updateFunc: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>,
  formInputs: string
) => {
  const formObj: User = JSON.parse(formInputs);
  try {
    await updateFunc({
      variables: { formInputs },
      update(cache, { data: { updateUser } }) {
        const user: any = cache.readQuery({
          query: GET_APPUSER,
          variables: { userId: formObj.appid },
        });

        const updatedUser = Object.assign({}, user.getAppUserData, formObj);

        cache.writeQuery({
          query: GET_APPUSER,
          variables: { userId: formObj.appid },
          data: { getAppUserData: updatedUser },
        });
      },
    });
  } catch (err) {
    throw err;
  }
};

export const addFollow = async (
  followFunc: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>,
  userId: string
) => {
  try {
    await followFunc({
      variables: { userId },
      update(cache, { data: { addFollow } }) {
        const user: any = cache.readQuery({
          query: GET_USER,
        });

        cache.modify({
          id: cache.identify(user?.getUserData.user),
          fields: {
            following(cachedData = [], { readField }) {
              const newFollowRef = cache.writeFragment({
                data: addFollow,
                fragment: gql`
                  fragment AddFollow on Following {
                    _id
                    appId
                    profilePic
                  }
                `,
              });

              return [...cachedData, newFollowRef];
            },
          },
        });
      },
    });
  } catch (err) {
    throw err;
  }
};

export const removeFollow = async (
  followFunc: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>,
  userId: string
) => {
  try {
    await followFunc({
      variables: { userId },
      update(cache, { data: { removeFollow } }) {
        const user: any = cache.readQuery({
          query: GET_USER,
        });

        cache.modify({
          id: user?.getUserData._id,
          fields: {
            following(cachedData, { readField }) {
              return cachedData.filter(
                (itemRef: StoreObject | Reference | undefined) =>
                  removeFollow._id !== readField("_id", itemRef)
              );
            },
          },
        });

        cache.evict(removeFollow._id);
      },
    });
  } catch (err) {
    throw err;
  }
};

export const handleFavorite = async (
  favoriteFunc: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>,
  favoriteType: string,
  favoriteId: string
) => {
  try {
    await favoriteFunc({
      variables: { favoriteType, favoriteId },
      update(cache, { data }) {
        const user: any = cache.readQuery({
          query: GET_USER,
        });

        const isFav: { isFavorite: boolean | null } | null = cache.readQuery({
          query: IS_FAVORITE,
          variables: { favType: favoriteType, favId: favoriteId },
        });

        isFav &&
          cache.writeQuery({
            query: IS_FAVORITE,
            variables: { favType: favoriteType, favId: favoriteId },
            data: { isFavorite: !isFav.isFavorite },
          });

        cache.modify({
          id: cache.identify(user?.getUserData.user),
          fields: {
            favorites(pastFavsRef = [], { readField }) {
              if (data.addFavorite) {
                const newFavRef = cache.writeFragment({
                  data: data.addFavorite,
                  fragment: gql`
                    fragment AddFavorite on Favorites {
                      _id
                      favoriteId
                      favoriteType
                    }
                  `,
                });

                console.log("after Update", [...pastFavsRef, newFavRef]);

                return [...pastFavsRef, newFavRef];
              }

              // return pastFavsRef.filter(
              //   (itemRef: StoreObject | Reference | undefined) =>
              //     data.removeFavorite._id !== readField("_id", itemRef)
              // );
            },
          },
        });
        // data && data.removeFavorite && cache.evict(data.removeFavorite._id);
      },
    });
  } catch (err) {
    throw err;
  }
};
