import { GET_USER, GET_ALL_USERS, LOG_OUT } from "./queries";
import { LOGIN_MUTATION } from "./mutations";

export default {
  queries: { GET_USER, GET_ALL_USERS, LOG_OUT },
  mutations: { LOGIN_MUTATION },
};
