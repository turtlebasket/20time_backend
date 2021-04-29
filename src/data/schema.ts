import { SchemaComposer } from "graphql-compose";

const composer = new SchemaComposer();

import {UserQuery, UserMutation} from './models/user';
import {TodoListQuery, TodoListMutation} from './models/todoList';
import {TodoItemQuery, TodoItemMutation} from './models/todoItem';

composer.Query.addFields({
  ...UserQuery,
  ...TodoListQuery,
  ...TodoItemQuery,
})

composer.Mutation.addFields({
  ...UserMutation,
  ...TodoListMutation,
  ...TodoItemMutation,
})

const schema = composer.buildSchema();
export default schema