import passportLocalMongoose from 'passport-local-mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';
import { TodoListSchema } from './todoList';

export const UserSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  verified: {type: Boolean, default: false},
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  todoLists: [TodoListSchema],
  dob: String,
})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
const UserTC = composeWithMongoose(User);

UserTC.addResolver({
  name: 'login',
  args: {
    username: 'String!',
    password: 'String!',
  },
  resolve: async (args: any) => {
    // figure out 
  }
})

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
  userLogin: UserTC.getResolver('login')
};