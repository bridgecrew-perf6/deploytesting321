import { InMemoryCacheConfig } from "@apollo/client";
import { Reference, StoreObject } from "@apollo/client/utilities";

export const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        pollChatUsers: {
          keyArgs: ["pollId"],
          merge(existing = [], incoming, { readField }) {
            return incoming;
          },
        },
        messageFeedByPoll: {
          keyArgs: ["pollId"],
          merge(existing = { messages: [] }, incoming, { readField }) {
            let merged: any[] = [];

            existing?.messages.forEach(
              (msg: Reference | StoreObject | undefined) => {
                const created = new Date(
                  readField("creationDate", msg) as string
                );

                merged.push({
                  id: readField("_id", msg),
                  created,
                  msg,
                });
              }
            );

            incoming?.messages.forEach(
              (msg: Reference | StoreObject | undefined) => {
                const incomingId = readField("_id", msg);
                const inMerged = merged.some((msg) => incomingId === msg.id);

                if (!inMerged) {
                  const created = new Date(
                    readField("creationDate", msg) as string
                  );
                  merged.push({
                    id: readField("_id", msg),
                    created,
                    msg,
                  });
                }
              }
            );

            return {
              ...incoming,
              messages: merged
                .sort((a, b) => a.created - b.created)
                .map((item) => item.msg),
            };
          },

          read(existing, { args }) {
            if (existing) {
              return {
                ...existing,
                messages: Object.values(existing.messages),
              };
            }
          },
        },
        answersByPoll: {
          merge: false,
        },
        subTopicsPerTopic: {
          merge: false,
        },
      },
    },
    Answer: {
      fields: {
        likes: {
          merge: false,
        },
        dislikes: {
          merge: false,
        },
      },
    },
    User: {
      fields: {
        following: {
          merge: false,
        },
      },
    },
    PollQuestion: {
      fields: {
        creationDate: {
          merge: false,
        },
      },
    },
  },
};
