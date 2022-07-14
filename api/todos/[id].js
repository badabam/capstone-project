import connectToMongodb from '../../src/backend/lib/connect-to-mongodb';
import {verifyAndDecodeToken} from "../../src/backend/lib/jwt-service";
import Todo from '../../src/backend/model/Todo';

const enclosedHandler = async (request, response) => {
  try {
    const {authorization} = request.headers

    const token = authorization?.replace("Bearer","").trim()

    if(!token){
      return response.status(401).json("unauthorized")
    }

    try {
      verifyAndDecodeToken(token)
    } catch(error){
      return response.status(403).json("forbidden")
    }

    await connectToMongodb();

    const {method} = request;
    const {id} = request.query;

    if (method === 'GET') {
      const foundTodo = await Todo.findById(id);
      if (!foundTodo) {
        return response.status(404).send();
      }
      return response.status(200).json(foundTodo);
    }

    if (method === 'PUT') {
      const todoToUpdate = await Todo.findById(id);
      if (!todoToUpdate) {
        return response.status(404).send();
      }
      todoToUpdate.description = request.body.description;
      todoToUpdate.isDone = request.body.isDone;
      const updatedTodo = await todoToUpdate.save();
      return response.status(200).json(updatedTodo);
    }

    if (method === 'PATCH') {
      const updatedTodo = await Todo.findByIdAndUpdate(id, request.body, {
        new: true,
      });
      if (!updatedTodo) {
        return response.status(404).send();
      }
      return response.status(200).json(updatedTodo);
    }

    if (method === 'DELETE') {
      const deletedTodo = await Todo.findByIdAndDelete(id);
      if (!deletedTodo) {
        return response.status(404).send();
      }
      return response.status(200).json(deletedTodo);
    }
  } catch (error) {
    return response.status(400).json(error);
  }

  response.status(405).send();
};

export default enclosedHandler;
