type BatchUser = (ids: readonly string[]) => Promise<IUser[]>;
type BatchPolls = (ids: readonly string[]) => Promise<IPoll[]>;
type BatchAnswers = (ids: readonly string[]) => Promise<IAnswer[]>;
type BatchChats = (ids: readonly string[]) => Promise<IChat[]>;
type BatchReplies = (ids: readonly string[]) => Promise<Ireply[]>;
type BatchTopics = (ids: readonly string[]) => Promise<ITopic[]>;
type BatchSubTopics = (ids: readonly string[]) => Promise<ISubTopic[]>;
type BatchInternalUser = (ids: readonly string[]) => Promise<IinternalUsers[]>;
