import { composeWithMongoose } from "graphql-compose-mongoose";
import mongoose, { Schema } from "mongoose"
import { TodoItemSchema } from "./todoItem"

export const TodoListSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  public: {type: Boolean, required: true},
  todoItems: [TodoItemSchema],
})
const TodoList = mongoose.model('TodoList', TodoListSchema);
const TodoListTC = composeWithMongoose(TodoList);

export const TodoListQuery = {
  todoItemById: TodoListTC.getResolver('findById'),
  todoItemMany: TodoListTC.getResolver('findMany'),
  todoItemCount: TodoListTC.getResolver('count'),
  todoItemPagination: TodoListTC.getResolver('pagination')
}

export const TodoListMutation = {
  todoItemCreateOne: TodoListTC.getResolver('createOne'),
  todoItemCreateMany: TodoListTC.getResolver('createMany'),
  todoItemUpdateById: TodoListTC.getResolver('updateById'),
  todoItemUpdateOne: TodoListTC.getResolver('updateOne'),
  todoItemUpdateMany: TodoListTC.getResolver('updateMany'),
  todoItemRemoveById: TodoListTC.getResolver('removeById'),
  todoItemRemoveOne: TodoListTC.getResolver('removeOne'),
  todoItemRemoveMany: TodoListTC.getResolver('removeMany'),
};