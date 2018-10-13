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

  sampleFile.mv(__dirname + '/../public/images/filename.jpg', function(err) {
    if (err)
      return res.status(500).send();

    res.status(200).send();
  });
};

module.exports = {
    upload
};