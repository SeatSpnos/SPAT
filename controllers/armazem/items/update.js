const armazem = require('models').armazem;
const itemsModel = armazem.items;
const stockModel = armazem.stock;

module.exports = function (req, res, next) {
  let data = {
    id: req.body.id,
    referencia: req.body.ref,
    nome: req.body.nome,
    fornecedor: req.body.fornecedor,
    saida: req.body.saida,
    saida_qtd: req.body.saida_qtd,
    comentarios: req.body.obs,
    hasSerial: req.body.hasSerial,
    tipo: req.body.tipo,
    designacao: req.body.designacao,
    categoria: req.body.categoria
  };

  itemsModel.findID(data.id, function (err, item) {
    if (err) next(err);
    itemsModel.update(data, function (err, rows) {
      if (err) next(err);
      data.oldRef = item[0].referencia;
      stockModel.updateRef(data, function (err, results) {
        if (err) next(err);
        next(null, rows);
      });
    });
  });
};
