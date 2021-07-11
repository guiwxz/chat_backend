import client from '../database/index.js';

class MessagesController {
  index = (request, response) => {
    return client.query(`
      SELECT messages.codigo, messages.message, users.nickname, users.codigo as cod_user 
      FROM messages, users 
      WHERE users.codigo = messages.cod_user
    `, (err, result) => {
      if (err) {
        console.log('erro', err);
        return;
      }
      return response.json(result.rows);
    })
  };

  store = (request, response) => {
    const { message, cod_user } = request.data;
    console.log('MENGSAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',message)
    return client.query(
      'INSERT INTO messages (message, cod_user) VALUES ($1, $2) RETURNING *', 
      [message, cod_user],
      (err, results) => {
        if (err) {
          console.log('erro', err);
          return;
        }
        console.log(response.message, '=', results.rows);
      }
    )
  }
}

export default new MessagesController();
