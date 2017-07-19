const models = require('models');
const itemsModel = models.armazem.items;
const stockModel = models.armazem.stock;
const tecsModel = models.tecnicos;
const navbar = require('controllers/navbar').navbar;
const pdf = require('html-pdf');
const moment = require('moment-timezone');
const timeZone = 'Europe/Lisbon';

module.exports = {
  render: render,
  serial: serial,
  category: category,
  tec: tec,
  tecItem: tecItem,
  item: item,
  validateItem: validateItem,
  addSerial: addSerial,
  getGuia: getGuia,
  makePdf: makePdf
};

function render (req, res, next) {
  tecsModel.find(function (err, tecs) {
    if (err) next(err);
    itemsModel.findAllCategory(function (err, category) {
      if (err) next(err);
      navbar(function (err, nbar) {
        if (err) next(err);
        res.render('pages/armazem/delivery/delivery', {
          navmenu: nbar,
          tecs: tecs,
          user: req.user,
          category: category
        });
      });
    });
  });
}

function serial (req, res, next) {
  stockModel.findSerialTec(req.query.serial, req.query.city, function (err, item) {
    if (err) next(err);
    if (item.length) res.render('pages/armazem/delivery/addSerialModal', {item: item[0]});
    else res.sendStatus(404);
  });
}

function addSerial (req, res, next) {
  stockModel.findSerialTec(req.query.serial, req.query.city, function (err, item) {
    if (err) next(err);

    if (item.length) {
      item[0].quantity = 1;
      res.render('pages/armazem/delivery/tBody', {item: item[0], quantity: 1});
    } else res.sendStatus(404);
  });
}

function category (req, res, next) {
  let cat = req.query.category;
  if (cat === 'Todos') {
    stockModel.findCategoryAllOwner(req.query.city, function (err, items) {
      if (err) next(err);
      res.render('pages/armazem/delivery/addItemsTable', {items: items});
    });
  } else {
    itemsModel.findCategoryOwner(cat, req.query.city, function (err, items) {
      if (err) next(err);
      res.render('pages/armazem/delivery/addItemsTable', {items: items});
    });
  }
}

function tec (req, res, next) {
  stockModel.findTecSerial(req.query.tec, function (err, serial) {
    if (err) next(err);
    stockModel.findTecNoSerial(req.query.tec, function (err, noSerial) {
      if (err) next(err);
      if (!serial.length && !noSerial.length) res.sendStatus(404);
      else res.render('pages/armazem/delivery/tecStock', {tecnico: req.query.tec, serials: serial, noSerials: noSerial});
    });
  });
}

function tecItem (req, res, next) {
  stockModel.findTecItem(req.body.tec, req.body.item, function (err, items) {
    if (err) next(err);
    res.render('pages/armazem/partials/item_modal', {items: items});
  });
}

function item (req, res, next) {
  stockModel.findTecItem(req.query.city, req.query.item, function (err, item) {
    if (err) next(err);
    if (!item.length) res.sendStatus(404);
    else res.render('pages/armazem/delivery/tBody', {item: item[0], quantity: req.query.quantity});
  });
}

function validateItem (req, res, next) {
  let msg = '';
  stockModel.validateItem(req.query.item, req.query.city, function (err, item) {
    if (err) next(err);
    if (!item.length) msg = 'O item não existem em stock';
    else if (item[0].quantity < req.query.quantity) msg = 'O stock do item ' + req.query.item + ' é de ' + item[0].quantity + ' unidades, o teu valor é de ' + req.query.quantity;
    res.json(msg);
  });
}

function getGuia (req, res, next) {
  /*
  tecsModel.findName(req.query.tec, function (err, tec) {
    if (err) next(err);
    let date = moment.tz(timeZone).format('DD MM YYYY');
    let hour = moment.tz(timeZone).format('HH:mm');
    res.render('pages/armazem/delivery/guia', {items: req.query.items, city: req.query.city, tec: tec, dateNow: date, hourNow: hour});
  });
  */
  makePdfV2(req, res, next);
}

function makePdf (req, res, next) {
  let nos = 'data:image/jpeg;base64,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';
  let spnos = 'data:image/jpeg;base64,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';
  let tecName = req.query.tec;
  tecName = tecName.split(' ');
  let name = moment.tz(timeZone).format(' YYYY-MM-DD_HH-mm-ss') + '_' + tecName[0] + '_' + tecName[1];
  let html = req.query.html;
  let options = {
    format: 'A4',
    base: 'file:///D:/xampp/htdocs/sp_nos_dev/public/',
    header: {
      contents: '<img src="' + nos + '" align="left"><img src="' + spnos + '" align="right">'
    }
  };

  pdf.create(html, options).toFile('./public/guias/' + name + '.pdf', function (err, results) {
    if (err) return console.log(err);
    res.json({results: results, name: name}); // { filename: '/app/businesscard.pdf' }
  });
}

function makePdfV2 (req, res, next) {
  tecsModel.findName(req.query.tec, function (err, tec) {
    if (err) return res.status(500).json(err);
    let date = moment.tz(timeZone).format('DD MM YYYY');
    let hour = moment.tz(timeZone).format('HH:mm');
    let pdfInfo = {
      items: req.query.items,
      city: req.query.city,
      tec: tec[0],
      dateNow: date,
      hourNow: hour
    };
    console.log(pdfInfo)
    generatePdf(pdfInfo, function (err, pdf) {
      if (err) return res.status(500).json(err);
      res.status(200).json(pdf);
    });
  });
}

function generatePdf (pdfInfo, callback) {
  let nos = 'data:image/jpeg;base64,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';
  let spnos = 'data:image/jpeg;base64,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';
  let Lisboa = 'Rua Soeiro Pereira Gomes, 7 Piso -1 Armazém, 1600-196 Lisboa';
  let Porto = 'Rua Justino Teixeira Edificio Campanhã, Porta A 1º 4300 – 273 Campanhã, Porto';
  let morada = pdfInfo.city === 'Lisboa' ? Lisboa : Porto;
  let table = [
    [ 'Referência', 'Designação', 'S/N', 'Quantidade' ]
  ];

  for (let i in pdfInfo.items) {
    let tempArray = [];
    tempArray.push(pdfInfo.items[i].ref);
    tempArray.push(pdfInfo.items[i].name);
    tempArray.push(pdfInfo.items[i].serial);
    tempArray.push(pdfInfo.items[i].quantity);
    table.push(tempArray);
  }
  let pdfContent = {
    pageSize: 'A4',
    pageMargins: [40, 110],
    header: [{
      columns: [
        {
          image: nos,
          alignment: 'left',
          fit: [100, 100],
          margin: [ 20, 10, 0, 20 ]
        },
        {
          image: spnos,
          alignment: 'right',
          fit: [100, 100],
          margin: [ 0, 10, 10, 20 ]
        }
      ]}
    ],
    content: [
      {
        text: 'COMPROVATIVO DO TRANSPORTE DE BENS',
        alignment: 'center',
        fontSize: 18
      },
      {
        text: 'PERTENCENTES AO ATIVO IMOBILIZADO',
        alignment: 'center',
        fontSize: 18
      },
      {
        text:
`
A NOS Comunicações, S.A., contribuinte n.º 502 604 751, declara que pertencem ao seu ativo imobilizado² os bens transportados, que se encontram discriminados abaixo.

O transporte tem como local de origem :

[x] a morada ${morada}
[  ] as moradas que constam dos documentos designados por «ordens de trabalho» (OT).

Estes bens têm como local de destino:

[  ] a morada ___________________________________________________________________________
[x] as moradas que constam dos documentos designados por «ordens de trabalho» (OT).

`
      },
      {
        columns: [
          { text:
`Nome do Técnico: ${pdfInfo.tec.name}
Matricula: ${pdfInfo.tec.matricula}

`
          },
          { text:
`Data : ${pdfInfo.dateNow} Hora : ${pdfInfo.hourNow}
Empresa: Manpower

`
          }
        ]
      },
      {
        table: {
          headerRows: 1,
          body: table
        }
      }
    ],
    footer: function (currentPage, pageCount) {
      let footer = [];
      let alinia = {
        text: '² De acordo com o n.º 1, alínea c) do artigo 3.º do Decreto-Lei n.º 147/2003, de 11 de julho, alterado pelo Decreto-Lei n.º 198/2012, de 24 de agosto e pela Lei n.º 66-B/2012, de 31 de Dezembro, estão excluídos da obrigação de emissão de documentos de transporte “os bens pertencentes ao ativo imobilizado”. Os n.ºs 3 e 4 do artigo 3.º do Decreto-Lei n.º 147/2003, de 11 de julho, definem que a prova da proveniência e destino dos bens não sujeitos à obrigatoriedade de documento de transporte, pode ser feita mediante a apresentação de qualquer documento comprovativo da natureza e quantidade dos bens, sua proveniência e destino.',
        fontSize: 8,
        margin: [40, 0]
      };
      if (currentPage == 1) {
        footer.push(alinia);
      }

      footer.push(
        {
          columns: [
            {
              text:
`
NOS Comunicações, S.A.
Sede: Edifício NOS Rua Actor António Silva, 9
1600-404 Lisboa Portugal
Telf. +351 21 791 4800 Fax. +351 21791 4850/1
`,
              fontSize: '8',
              margin: [40, 0]
            },
            {
              text:
`
Nº Pessoa Colectiva PT502 604 751
Capital Social 25.477.270 euros
Mat. nº 02838/930729, C.R.C. de Lisboa
Página ${currentPage.toString() + ' de ' + pageCount}
`,
              fontSize: '8',
              margin: [40, 0]
            }
          ]
        }
      );
      return footer;
    }
  };
  var fonts = {
    Roboto: {
      normal: 'public/fonts/Roboto-Regular.ttf',
      bold: 'public/fonts/Roboto-Medium.ttf',
      italics: 'public/fonts/Roboto-Italic.ttf',
      bolditalics: 'public/fonts/Roboto-MediumItalic.ttf'
    }
  };
  let tecName = pdfInfo.tec.name;
  tecName = tecName.split(' ');
  let name = moment.tz(timeZone).format('YYYY-MM-DD_HH-mm-ss') + '_' + tecName[0] + '_' + tecName[1];
  let pdfLocation = `./public/guias/${name}.pdf`;

  var PdfPrinter = require('pdfMake');
  var printer = new PdfPrinter(fonts);
  var fs = require('fs');

  var pdfDoc = printer.createPdfKitDocument(pdfContent);
  pdfDoc.pipe(fs.createWriteStream(pdfLocation)).on('finish', (err, res) => {
    callback(null, name);
  });
  pdfDoc.end();
}
