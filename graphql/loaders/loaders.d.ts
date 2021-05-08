type BatchUser = (ids: readonly string[]) => Promise<IUser[]>;
type BatchPolls = (ids: readonly string[]) => Promise<IPoll[]>;
type BatchAnswers = (ids: readonly string[]) => Promise<IAnswer[]>;
type BatchComments = (ids: readonly string[]) => Promise<IComment[]>;
type BatchReplies = (ids: readonly string[]) => Promise<Ireply[]>;
type BatchTopics = (ids: readonly string[]) => Promise<ITopic[]>;
type BatchSubTopics = (ids: readonly string[]) => Promise<ISubTopic[]>;
