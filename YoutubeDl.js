const youtubedl = require('youtube-dl')
const fs = require('fs')

module.exports = class YoutubeDl {

    constructor() {

    }

    setLink(link) {
        this.ytbLink = link;
    }


    setDirectory(directory) {
        this.directory = directory;
    }
    
    downloadLink() {
        console.log(this.ytbLink);
        youtubedl.exec(this.ytbLink, ['-x', '--audio-format', 'mp3'], {cwd: `${this.directory}/`}, (err, output) => {
            if (err) {
                console.log(err);
            } else {
                console.log(output);
            }
           
        });
        //this.ytb = youtubedl(this.link, ["-x"],  { cwd: __dirname });

        /*this.ytb.on("info", (info) => {
            console.log('Download started')
            console.log('filename: ' + info._filename)
            console.log('size: ' + info.size)
        });*/

        //this.ytb.pipe(fs.createWriteStream('myvideo.mp4'))
    }



    getInfo() {
        return new Promise((resolve, reject) => {
            console.log(this.ytbLink);
            this.ytb = youtubedl.getInfo(this.ytbLink, (_err, _res) => {
                if (_err) {
                    console.log(_err);
                    reject(_err);
                };
                resolve(_res);
            });
        });
    }
}