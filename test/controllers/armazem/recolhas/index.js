const createTable =
`CREATE TABLE armazem_recolhas (
  id INT(11) NOT NULL AUTO_INCREMENT,
  codigoOT VARCHAR(50) NOT NULL,
  serial VARCHAR(50) NOT NULL,
  currentOwner VARCHAR(50) NOT NULL,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  caixa VARCHAR(50) NULL DEFAULT NULL,
  palete VARCHAR(50) NULL DEFAULT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX codigoOT (codigoOT),
  INDEX currentOwner (currentOwner)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
`;

let createStock = [{
  
  codigoOT: 'OT2345',
  serial: 'SE20345',
  currentOwner: 'denise coisas',
  marca: 'Thompsom',
  modelo: 'hub',
  caixa: 'caixa0',
  palete: 'palete0'
},
{

  codigoOT: 'OT876',
  serial: '2016KSD',
  currentOwner: 'joao santos',
  marca: 'Linksys',
  modelo: 'router',
  caixa: 'caixa1',
  palete: 'palete1'

},
{
  codigoOT: 'US1234',
  serial: 'FE4587',
  currentOwner: 'Paletizado',
  marca: 'Linksys',
  modelo: 'router',
  caixa: 'caixa2',
  palete: 'palete2'
  
},
{
  codigoOT: 'AM4567',
  serial: 'PONG23',
  currentOwner: 'Paletizado',
  marca: 'ZonHub',
  modelo: 'router',
  caixa: 'caixa3',
  palete: 'palete3'
  
}];

let clearTable = 
`DROP TABLE armazem_recolhas`;

module.exports = {
  createTable: createTable,
  createStock: createStock,
  clearTable: clearTable
}

// zemanel * password
