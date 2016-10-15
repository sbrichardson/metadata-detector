var createReadStream = require('fs').createReadStream,
    leche = require('leche'),
    lengthsData = require('../../fixtures/lengths-data.json'),
    locationsData = require('../../fixtures/locations-data.json'),
    metadataDetector = require('../../../src/server/module.js');

describe('metadata-detector', function () {

    describe('createLocateStream()', function () {

        leche.withData(locationsData, function (filename, locations) {

            if (filename.slice(-4) === '.txt') {
                filename = filename.slice(0, -4);
            }

            it('should locate the metadata tags of the file', function (done) {
                var lctns = [],
                    locateStream = metadataDetector.createLocateStream(),
                    readable = createReadStream('test/fixtures/' + filename, {
                        highWaterMark: 128
                    });

                readable
                    .pipe(locateStream)
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

    describe('createStripStream()', function () {

        leche.withData(lengthsData, function (filename, byteLength) {

            if (filename.slice(-4) === '.txt') {
                filename = filename.slice(0, -4);
            }

            it('should strip the metadata tags from the file', function (done) {
                var btLngth = 0,
                    readable = createReadStream('test/fixtures/' + filename, {
                        highWaterMark: 128
                    }),
                    stripStream = metadataDetector.createStripStream();

                readable
                    .pipe(stripStream)
                    .on('data', function (data) {
                        btLngth += data.length;
                    })
                    .on('error', function (err) {
                        done(err);
                    })
                    .on('finish', function () {
                        expect(btLngth).to.equal(byteLength);

                        done();
                    });
            });

        });

    });

    describe('locate()', function () {

        it('should be undefined', function () {
            expect(metadataDetector.locate).to.be.undefined;
        });

    });

    describe('strip()', function () {

        it('should be undefined', function () {
            expect(metadataDetector.strip).to.be.undefined;
        });

    });

});