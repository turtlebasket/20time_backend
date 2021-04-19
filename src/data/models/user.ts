import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';
import { TodoListSchema } from './todoList';

export const UserSchema = new Schema({
  name: {type: String, required: true},
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  dob: String,
  todoLists: [TodoListSchema]
})
const User = mongoose.model('User', UserSchema);
const UserTC = composeWithMongoose(User);

export const UserQuery = {
  userById: UserTC.getResolver('findById'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userPagination: UserTC.getResolver('pagination')
}

export const UserMutation = {
  userCreateOne: UserTC.getResolver('createOne'),
  userCreateMany: UserTC.getResolver('createMany'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
};