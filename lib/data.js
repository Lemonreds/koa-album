const fs = require('fs'),
    path = require('path'),
    assets = '../assets'
/**
 * 数据的获取
 * 相当于一个API 
 */

 /**
  * 获取所有的相册
  * 目录： /assets/albums
  */
function getAlbumsData() {

    let albums = path.resolve(__dirname, path.join(assets, 'albums')),
        folders = fs.readdirSync(albums),
        info = getAssetsJSON('albums.json'),
        data = []

    folders.forEach((file) => {

        let folderPath = path.join(albums, file),
            stat = fs.statSync(folderPath)

        // 仅处理相册文件夹
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

            // 获取 alums.json 内关于本相册的数据
            if (info[file]) {
                for (let attr in info[file]) {

                    if (attr === 'thumb') {
                        // 封面
                        config[attr] =  `albums//${file}//${info[file][attr]}`
                        continue;
                    }
                    // 其他数据
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

/**
 * 获取某个相册的所有照片数据
 * @param {} albumname 
 */
function getPohotoData(albumname) {

    let _path = path.resolve(__dirname, path.join(assets, albumname)),
        photos = []

    let info = getAssetsJSON('albums.json')

    // 读取所有照片
    if (fs.existsSync(_path)) {
        photos = fs.readdirSync(_path)
    }
    // 拼接照片为完整的路径
    photos = photos.map((value) => {
        return `${albumname}//${value}`
    })


    // 相册的名字(已过滤路径)
    albumname = albumname.substring(albumname.lastIndexOf('/') + 1, albumname.length)

    // 拼接数据
    return {
        album: {
            name: albumname,
            photos: photos,
            des: info[albumname] ? info[albumname].des : "No descrption"
        }
    }
}

/**
 * 获取站点的配置文件 
 */
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