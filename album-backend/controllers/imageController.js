const path = require('path')
const fs = require('fs');

const { v4 } = require('uuid');
uuidv4 = v4;
const remove = require('../helpers/array')
Array.prototype.remove = remove

module.exports = {
    checkHealth(req, res) {
        res.json(
            {
                "message": "OK"
            }
        )
    },
    photosList(req, res) {
        const { skip, limit } = req.body
        let localArr = []

        let albumsDir = fs.readdirSync(path.join(process.cwd(), 'albums'));
        let cleanAlbum = Array.from(albumsDir).remove('placeholder');
        
        Array.from(cleanAlbum)
            .map((singleDir) => {
                let files = fs.readdirSync(path.join(process.cwd(), 'albums', singleDir))
                Array.from(files)
                    .map((file) => {
                        localArr.push({
                            id: uuidv4(),
                            album: singleDir,
                            name: file,
                            path: `/albums/${singleDir}/${file}`,
                            raw: req.protocol + '://' + req.get('host') + `/photos/${singleDir}/${file}`
                        })
                    })
            })
        let docsSkipLimit = Array.from(localArr).slice(skip).slice(0, limit)
        res.json({
            message: 'OK',
            documents: docsSkipLimit,
            skip,
            limit,
            count: Array.from(docsSkipLimit).length
        })
    },
    photosUpload(req, res) {
        let albumName = String(req.body.album).charAt(0).toUpperCase() + String(req.body.album).slice(1)
        let uploadedFiles = fs.readdirSync(path.join(process.cwd(), 'albums', albumName))
        let localDocs = []
        uploadedFiles.map(files => {
            localDocs.push({
                id: uuidv4(),
                path: `${albumName}/${files}`,
                album: albumName,
                name: files,
                raw: req.protocol + '://' + req.get('host') + `/photos/${albumName}/${files}`
            })
        })
        res.json({
            message: "OK",
            documents: localDocs
        })
    },
    photoDelete(req, res) {
        const { album, fileName } = req.params
        let filePath = path.join(process.cwd(), 'albums', `${album}/${fileName}`);
        let condition = fs.existsSync(filePath);
        if (condition) {
            fs.unlinkSync(filePath)
            return res.json({
                message: 'OK',
                name: fileName,
                album: album
            })
        }
        res.json({
            message: 'file doesnt exists'
        })
    },
    photoDeletes(req, res) {
        const arrayOfImages = req.body;
        Array.from(arrayOfImages).map(object => {
            if (object.album && object.documents) {
                let docsNoWhiteSpace = String(object.documents).replace(/\s/g, '_')
                let arrayOfDocs = docsNoWhiteSpace.split(",")
                Array.from(arrayOfDocs).map(files => {
                    fs.unlinkSync(path.join(process.cwd(), 'albums', object.album, files))
                })
            }

        })
        return res.json({
            message: "OK"
        })
    }
}