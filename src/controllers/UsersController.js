import client from '../database/index.js';

class UsersController {
  index = (request, response) => {
    //console.log('res', request);
    const { nickname, senha } = request.query;
    return client.query(`
      SELECT codigo 
      FROM users 
      WHERE nickname = '${nickname}' AND senha = '${senha}'
    `, 
    (err, result) => {
      if (err) {
        console.log('erro', err);
        return err;
      }
      return response.json(result.rows[0]);
    })
  };

  show = (request, response) => {
    console.log(request);
    const { id } = request.params;
    return client.query(`
      SELECT codigo, nickname 
      FROM users 
      WHERE codigo = '${id}'
    `, 
      (err, results) => {
        if (err) {
          console.log('erro', err);
          return;
        }
        return response.json(results.rows[0]);
      }
    )
  };

  
}

export default new UsersController();
