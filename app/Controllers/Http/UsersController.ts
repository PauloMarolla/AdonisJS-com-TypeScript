import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {

  async index({request}) {
    const users = User.all();

    return users;
  }

  async store({request}: HttpContextContract) {
    const data = await request.only(['email', 'password']);

    const user = await User.create(data);

    return user;
  }

  async show({params}: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    
    return user;
  }

  async destroy({params}: HttpContextContract){
    const user = await User.findOrFail(params.id);

    user.delete();

    return 'Usuario Deletado'
  }
}
