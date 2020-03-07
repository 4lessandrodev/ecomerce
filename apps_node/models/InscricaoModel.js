const conect = require('../config/CONECT_BD');
class InscricaoModel {
  constructor (email) {
    this._email = (email != '' && email != null) ? email.toLowerCase() : '';
  }

  get email() {
    return this._email;
  }
  set email(value) {
    this._email = (value != '' && value != null) ? value.toLowerCase() : '';
  }

  //Metodo para salvar os emails dos usuarios no portal 
  //-----------------------------------------------------------------------------------------------------
  salvarInscricao(inscricao) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_inscricoes(email) VALUES(?)`, [
        inscricao._email
      ], (err, results) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(results);
        }
      });
    });
  }
  //-----------------------------------------------------------------------------------------------------
  //Metodo para listar todos os emails salvos 
  listarEmails() {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_inscricoes`, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  //-----------------------------------------------------------------------------------------------------

}

module.exports = InscricaoModel;