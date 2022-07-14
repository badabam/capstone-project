import connectToMongodb from '../../src/backend/lib/connect-to-mongodb';
import {verifyAndDecodeToken} from "../../src/backend/lib/jwt-service";
import Todo from '../../src/backend/model/Todo';

/*
*
* 1. receive authorization header
* 2. extract token
* 3. verify token
* 4. return protected resource
 */
const enclosingHandler = async (request, response) => {
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

    if (method === 'GET') {
      const allTodos = await Todo.find();
      return response.status(200).json(allTodos);
    }

    if (method === 'POST') {
      const newTodo = await Todo.create(request.body);
      return response.status(200).json(newTodo);
    }
  } catch (error) {
    return response.status(400).json(error);
  }

  response.status(405).send();
};

export default enclosingHandler;
