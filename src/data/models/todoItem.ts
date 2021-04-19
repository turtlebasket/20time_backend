import { composeWithMongoose } from "graphql-compose-mongoose";
import mongoose, { Schema } from "mongoose"

export const TodoItemSchema = new Schema({
  complete: {type: Boolean, required: true, default: false},
  title: {type: String, required: true},
  description: String,
  dueDate: String,
});
const TodoItem = mongoose.model('TodoItem', TodoItemSchema);
const TodoItemTC = composeWithMongoose(TodoItem);

export const TodoItemQuery = {
  todoItemById: TodoItemTC.getResolver('findById'),
  todoItemMany: TodoItemTC.getResolver('findMany'),
  todoItemCount: TodoItemTC.getResolver('count'),
  todoItemPagination: TodoItemTC.getResolver('pagination')
}

export const TodoItemMutation = {
  todoItemCreateOne: TodoItemTC.getResolver('createOne'),
  todoItemCreateMany: TodoItemTC.getResolver('createMany'),
  todoItemUpdateById: TodoItemTC.getResolver('updateById'),
  todoItemUpdateOne: TodoItemTC.getResolver('updateOne'),
  todoItemUpdateMany: TodoItemTC.getResolver('updateMany'),
  todoItemRemoveById: TodoItemTC.getResolver('removeById'),
  todoItemRemoveOne: TodoItemTC.getResolver('removeOne'),
  todoItemRemoveMany: TodoItemTC.getResolver('removeMany'),
};