import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({request, auth, response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    let token;
    try {
      token = await auth.use('api').attempt(email, password)
    } catch(err) {
      return response.status(400).send({message: 'Dados invalidos'})
    }
    return token.toJSON()
  }
}
