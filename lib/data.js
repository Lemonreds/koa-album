const fs = require('fs'),
    path = require('path'),
    assets = '../assets'


function getAlbumsData() {

    let albums = path.resolve(__dirname, path.join(assets, 'albums')),
        folders = fs.readdirSync(albums),
        info = getAssetsJSON('albums.json'),
        data = []

    folders.forEach((file) => {

        let folderPath = path.join(albums, file),
            stat = fs.statSync(folderPath)

        if (stat.isDirectory()) {

            let photos = fs.readdirSync(folderPath)
            let config = {
                name: 'Unknown name',
                thumb: `albums//${file}//${photos[0]}`,
                des: 'No descrption',
                time: 'No time.',
                href: `albums/${file}`,
                length: photos.length || 0
            }

            if (info[file]) {
                for (let attr in info[file]) {

                    if (attr === 'thumb') {

                        config[attr] =  `albums//${file}//${info[file][attr]}`
                        continue;
                    }
                    config[attr] = info[file][attr]
                }
            }

            data.push(config)
        }
    })

    data.sort((a, b) => {
        return a < b ? -1 : 1
    })

    return {
        albums: data
    }
}

function getPohotoData(albumname) {

    let _path = path.resolve(__dirname, path.join(assets, albumname)),
        photos = []

    let info = getAssetsJSON('albums.json')


    if (fs.existsSync(_path)) {
        photos = fs.readdirSync(_path)
    }

    photos = photos.map((value) => {
        return `${albumname}//${value}`
    })


    albumname = albumname.substring(albumname.lastIndexOf('/') + 1, albumname.length)

    return {
        album: {
            name: albumname,
            photos: photos,
            des: info[albumname] ? info[albumname].des : "No descrption"
        }
    }
}

function getSitesConfigData() {
    return {
        sites: getAssetsJSON('sites.json')
    }
}

/**
 * 获取assets下json文件
 * 
 * @param {string} filename 
 * @return {object}
 */
function getAssetsJSON(filename) {

    let _path = path.resolve(__dirname, path.join(assets, filename))
    return JSON.parse(fs.readFileSync(_path))

}




exports.getAlbumsData = getAlbumsData
exports.getPohotoData = getPohotoData
exports.getSitesConfigData = getSitesConfigData