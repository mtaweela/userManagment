var fs = require('fs');

let upload = (req, res) => {
  if (!fs.existsSync(__dirname + '/../public/images')){
    fs.mkdirSync(__dirname + '/../public/images');
  }

  if (!req.files)
    return res.status(400).send();

  let sampleFile = req.files.sampleFile;

  if(sampleFile === undefined || (sampleFile.mimetype !== "image/png" && sampleFile.mimetype !== "image/jpeg")) {
    return res.status(415).send()
  }

  let filename = sampleFile.md5();
  let ext = sampleFile.mimetype === "image/png" && ".png" || sampleFile.mimetype === "image/jpeg" && ".jpg"

  sampleFile.mv(__dirname + `/../public/images/${filename + ext}`, function(err) {
    if (err)
      return res.status(500).send();

    res.status(200).send(filename + ext);
  });
};

module.exports = {
    upload
};