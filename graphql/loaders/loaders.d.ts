type BatchUser = (ids: readonly string[]) => Promise<IUser[]>;
<<<<<<< HEAD
=======
type BatchNotifications = (ids: readonly string[]) => Promise<INotification[]>;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
type BatchPolls = (ids: readonly string[]) => Promise<IPoll[]>;
type BatchAnswers = (ids: readonly string[]) => Promise<IAnswer[]>;
type BatchChats = (ids: readonly string[]) => Promise<IChat[]>;
type BatchReplies = (ids: readonly string[]) => Promise<Ireply[]>;
type BatchTopics = (ids: readonly string[]) => Promise<ITopic[]>;
type BatchSubTopics = (ids: readonly string[]) => Promise<ISubTopic[]>;
<<<<<<< HEAD
=======
type BatchInternalUser = (ids: readonly string[]) => Promise<IinternalUsers[]>;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
