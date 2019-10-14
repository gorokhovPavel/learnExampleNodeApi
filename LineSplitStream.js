const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
    constructor(options) {
        super(options);
        this.encoding = options.encoding;
        this.text = '';
    }

    _transform( chunk, encoding, callback ) {
        if( chunk ) {    
            const str = chunk.toString(this.encoding);
            let strArr = str.split(os.EOL);
            this.text += str;
        }
        callback();
    }

    _flush( callback ) {
        const strArrFinal = this.text.split(os.EOL);
        this.text = '';
        strArrFinal.forEach( item=> {
            this.push(item);
        });
        callback();
    }
}

module.exports = LineSplitStream;