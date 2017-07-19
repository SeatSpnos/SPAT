const createStock =
`
CREATE TABLE 'armazem_stock' (
  'id' INT(11) NOT NULL AUTO_INCREMENT,
  'quantity' INT(11) NOT NULL,
  'owner' VARCHAR(50) NOT NULL,
  'serial' VARCHAR(50) NULL DEFAULT NULL,
  'ref' BIGINT(20) NOT NULL,
  'mac' VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY ('id'),
  INDEX 'ref' ('ref'),
  INDEX 'serial' ('serial'),
  INDEX 'owner' ('owner')
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=9547
;`;
const createItems =
`
CREATE TABLE 'armazem_items' (
  'id' INT(11) NOT NULL AUTO_INCREMENT,
  'referencia' BIGINT(20) NOT NULL,
  'nome' VARCHAR(50) NOT NULL,
  'fornecedor' VARCHAR(50) NOT NULL,
  'saida' VARCHAR(50) NOT NULL,
  'saida_qtd' VARCHAR(50) NOT NULL,
  'comentarios' TEXT NULL,
  'hasSerial' VARCHAR(50) NOT NULL DEFAULT '0',
  'tipo' VARCHAR(50) NOT NULL,
  'designacao' VARCHAR(50) NULL DEFAULT NULL,
  'categoria' VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY ('id'),
  UNIQUE INDEX 'referencia' ('referencia'),
  INDEX 'nome' ('nome')
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=397
;`;
const clearStock = `DROP TABLE armazem_stock`;
const clearItems = `DROP TABLE armazem_items`;
module.exports = {
  createStock: createStock,
  createItems: createItems,
  clearStock: clearStock,  
  clearItems: clearItems
};
