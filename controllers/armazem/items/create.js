const model = require('models').armazem.items;

module.exports = function (req, res, next) {
 let data = {
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

  model.insert(data, function (err, rows) {
    if (err) next(err);
    res.redirect('/armazem_item');
  });
};
