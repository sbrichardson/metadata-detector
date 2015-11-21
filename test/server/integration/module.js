'use strict';

var createReadStream = require('fs').createReadStream,
    metadataDetector = require('../../../src/module.js');

describe('metadata-detector', function () {

    describe('createReadStream()', function () {

        leche.withData([
            [
                '1000-frames-of-noise-encoded-and-tagged-with-itunes.mp3',
                [
                    [ 0, 2129 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg-and-tagged-with-vlc.flac',
                [
                    [ 0, 8376 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg-and-tagged-with-vlc.mp3',
                [
                    [ 0, 4928 ],
                    [ 8061, 8189 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg.flac',
                [
                    [ 0, 8376 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg.mp3',
                [
                    [ 0, 3870 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-itunes-and-tagged-with-mp3tag.mp3',
                [
                    [ 0, 2129 ],
                    [ 5264, 5392 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-itunes-and-tagged-with-vlc.mp3',
                [
                    [ 0, 2129 ],
                    [ 5264, 5392 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-itunes.mp3',
                [
                    [ 0, 2129 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-soundbooth-and-tagged-with-vlc.mp3',
                [
                    [ 0, 6471 ],
                    [ 8559, 8687 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-soundbooth.mp3',
                [
                    [ 0, 5370 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-toast-and-tagged-with-vlc.flac',
                [
                    [ 0, 4233 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-toast.flac',
                [
                    [ 0, 4233 ]
                ]
            ]
        ], function (filename, locations) {

            it('should strip the id3 tag from the file', function (done) {
                var lctns = [],
                    readable = createReadStream('test/fixtures/' + filename),
                    writable = metadataDetector.createLocateStream();

                readable
                    .pipe(writable)
                    .on('error', function (err) {
                        done(err);
                    })
                    .on('finish', function () {
                        expect(lctns).to.deep.equal(locations);

                        done();
                    })
                    .on('location', function (location) {
                        lctns.push(location);
                    });
            });

        });

    });

});
