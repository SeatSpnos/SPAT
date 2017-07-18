const path = require('path');

module.exports = function (req, file, cb) {
  let filetypes = /jpeg|jpg|png|tiff|tif|gif|jiff|pdf|doc|docx|xls|xlsx|csv|ppt|pptx|msg/;
  let mimetype = filetypes.test(file.mimetype);
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: File upload only supports the following filetypes - ' + filetypes);
};
