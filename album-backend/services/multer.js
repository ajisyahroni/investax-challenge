const path = require('path')
const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let albumName = String(req.body.album).charAt(0).toUpperCase() + String(req.body.album).slice(1)
        let dirCandidate = path.join(process.cwd(), `albums`, albumName)

        fs.mkdirSync(dirCandidate, { recursive: true });
        cb(null, dirCandidate);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '_' + file.originalname;
        cb(null, fileName.replace(/\s/g, '_').replace(/,/g, ''))
    }
});

const upload = multer({ storage: storage })
module.exports = upload