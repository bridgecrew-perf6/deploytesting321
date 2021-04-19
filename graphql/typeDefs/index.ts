import {userTypeDefs} from './user'
import {pollTypeDefs} from './poll'
import {topicTypeDefs} from './topic'
import {imageTypeDefs} from './image'
import {rootTypeDefs} from './root'

const typeDefs = [rootTypeDefs, userTypeDefs, pollTypeDefs, topicTypeDefs, imageTypeDefs];

export default typeDefs