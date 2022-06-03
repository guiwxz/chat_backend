import client from '../database/index.js';

class ToWatchController {
  show = (request, response) => {
    console.log(request);
    const { cod_user } = request.query;
    return client.query(`
      SELECT * 
      FROM animestowatch 
      WHERE cod_user = '${cod_user}'
      ORDER BY date
    `, 
      (err, results) => {
        if (err) {
          console.log('erro', err);
          return;
        }
        
        return response.json({ data: results.rows });
      }
    )
  };

  store = (request, response) => {
    console.log('MENGSAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',request)
    const { name, ep_counter, cod_user, description } = request.body;
    return client.query(`
        INSERT INTO animestowatch (name, description, date, cod_user) 
        VALUES ('${name}', '${description}', CURRENT_TIMESTAMP(2), ${cod_user}) 
        RETURNING *
      `, 
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

  update = (request, response) => {
    const { id } = request.params;
    const { name, description } = request.body;
    return client.query(
      `UPDATE animestowatch SET name = '${name}', description = '${description}' WHERE codigo = '${id}' RETURNING *`,
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

  destroy = (request, response) => {
    const { id } = request.params;
    return client.query(
      `DELETE FROM animestowatch WHERE codigo = '${id}' RETURNING *`, 
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

export default new ToWatchController();
