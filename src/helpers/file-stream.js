const { FileStreamAbstract, errors } = require('../icebear');
const fs = require('fs');

class FileStream extends FileStreamAbstract {

    constructor(filePath, mode, bufferSize) {
        super(filePath, mode, bufferSize);
        // fs works with Buffer instances so we create
        // private buffer based on same chunk of RAM (ArrayBuffer) as public buffer
        if (this.buffer) this._buffer = Buffer.from(this.buffer.buffer);
    }

    open() {
        return new Promise((resolve, reject) => {
            fs.open(this.filePath, this.mode[0], (err, fd) => {
                if (err) {
                    reject(errors.normalize(err));
                    return;
                }
                this.fileDescriptor = fd;
                resolve();
            });
        });
    }

    close() {
        if (this.fileDescriptor == null) return Promise.resolve();
        return new Promise((resolve, reject) => {
            fs.close(this.fileDescriptor, err => {
                if (err) {
                    reject(errors.normalize(err));
                    return;
                }
                resolve();
            });
        });
    }

    /**
     *
     * @return {Promise<number>}
     */
    readInternal() {
        return new Promise((resolve, reject) => {
            fs.read(this.fileDescriptor, this._buffer, 0, this._buffer.byteLength, null,
                (err, bytesRead) => {
                    if (err) reject(errors.normalize(err));
                    resolve(bytesRead);
                });
        });
    }

    /**
     * @param {Uint8Array} buffer
     * @return {Promise}
     */
    writeInternal(buffer) {
        return new Promise((resolve, reject) => {
            fs.write(this.fileDescriptor, Buffer.from(buffer.buffer), 0, buffer.length, null,
                err => {
                    if (err) reject(errors.normalize(err));
                    resolve();
                });
        });
    }
}

module.exports = FileStream;
