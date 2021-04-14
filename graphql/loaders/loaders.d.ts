type BatchUser = (ids: readonly string[]) => Promise<IUser[]>;
type BatchPolls = (ids: readonly string[]) => Promise<IPoll[]>;
type BatchTopics = (ids: readonly string[]) => Promise<ITopic[]>;
type BatchSubTopics = (ids: readonly string[]) => Promise<ISubTopic[]>;