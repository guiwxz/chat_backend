import client from '../database/index.js';

class UsersController {
  index = (request, response) => {
    //console.log('res', request);
    const { nickname, senha } = request.query;
    return client.query(`
      SELECT codigo 
      FROM users 
      WHERE username = '${nickname}' AND senha = '${senha}'
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

  store = (request, response) => {
    console.log(request);
    const { username, password } = request.params;

    const encryptedPassword = '';

    return client.query(`
      INSERT INTO users (username, password, date) 
      VALUES ('${username}', '${encryptedPassword}', CURRENT_TIMESTAMP(2))
      RETURNING *
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

  update = (request, response) => {
    const { id } = request.params;
    const { nickname } = request.body;
    return client.query(
      `UPDATE users SET nickname = '${nickname}' WHERE codigo = '${id}' RETURNING *`,
      (err, results) => {
        if (err) {
          console.log('erro', err);
          return;
        }
        console.log(response.message, '=', results.rows);
        return response.json(results.rows[0]);
      }
    )
  }

  
}

export default new UsersController();
