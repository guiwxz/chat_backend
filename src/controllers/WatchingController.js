import client from '../database/index.js';

class WatchingController {
  show = (request, response) => {
    console.log(request);
    const { cod_user } = request.query;
    return client.query(`
      SELECT * 
      FROM animeswatching 
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
        INSERT INTO animeswatching (name, description, ep_counter, date, cod_user) 
        VALUES ('${name}', '${description}', ${ep_counter}, CURRENT_TIMESTAMP(2), ${cod_user}) 
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
      `UPDATE animeswatching SET name = '${name}', description = '${description}' WHERE codigo = '${id}' RETURNING *`,
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
      `DELETE FROM animeswatching WHERE codigo = '${id}' RETURNING *`, 
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

  //ativado pelo socket
  editCounterWithSocket = ({codigo, new_ep}, response) => {
    console.log('DENTRO DO EDIT', codigo, new_ep)
    return client.query(
      `UPDATE animeswatching SET ep_counter = '${new_ep}' WHERE codigo = '${codigo}' RETURNING *`
    ),
    (err, results) => {
      console.log("adsngjdsngjdnsjgnjsd")
      if (err) {
        console.log('erro', err);
        return;
      }
      console.log(response.message, '=', results.rows);
      return response.json(results.rows[0]);
    }
  }
  
}

export default new WatchingController();
