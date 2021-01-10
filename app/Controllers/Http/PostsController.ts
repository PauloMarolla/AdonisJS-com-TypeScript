import Post from 'App/Models/Post'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
  public async index() {
    const posts = await Post.all()

    return posts;
  }

  public async store({request}: HttpContextContract) {
    const data = request.only(['title', 'content'])
    const post = await Post.create(data)

    return post;
  }

  public async show({params, response}: HttpContextContract) {
    let post;
    try {
      post = await Post.findOrFail(params.id)
    } catch(err) {
      return response.status(404).send({
        message: "Erro ao tentar encontrar o Post"
      })
    }
    return post;
  }

  public async destroy({params, response}: HttpContextContract) {
    let post;
    try {
      post = await Post.findOrFail(params.id)
      await post.delete();
      return `Post ${post.id} deletado com sucesso`;
    } catch(err) {
      return response.status(404).send({
        message: "Erro ao encontrar o Post"
      })
    }
  }
}
