const fs = require('fs');
const assert = require('assert');
const { expect } = require('chai');
const mock = require('mock-fs');

describe('all fs functions in /astronomical-diary', () => {
    beforeEach(() => {
    //to create a mock of file.txt in "file" folder
        mock({
            'file': {
                'astronomicalDiary.txt' : 'Astronomical diary',
            }
        });
    });
    
    const file = `${process.cwd()}/file/astronomicalDiary.txt`

    describe('create diary function', () => {
        it('should create a file if none exists', function(done) {
            fs.open(file, "r", function(err) {
                if (err) {
                    fs.writeFile('./file/astronomicalDiary.txt', 'Astronomical diary', function(err) {
                        if (err) { return done(err) }; 
                    });
                }
                done(); 
            });
        expect(fs.existsSync(file)).to.be.true;
        });
    });

    describe('get diary name', () => {
        it('should get diary name if it exists', function() {
            const diaryName = fs.readdirSync('./file').toString();
            assert.strictEqual(diaryName, 'astronomicalDiary.txt');
        });
    });

    describe('write diary function', () => {
        it('should write in the diary if it exists', function() {
            fs.appendFileSync(file, '\n' + 'first observation', function (err) {
                if (err) throw(err);
            });
            expect(fs.readFileSync(file).toString()).to.equal('Astronomical diary\nfirst observation');
        });
    });

    describe ('read diary function', () => {
        it('should read diary text if exists', function(done) {
        fs.readFile(file, function (err, data) {
            if (err) return done(err);
            done();
            })
            expect(fs.readFileSync(file).toString()).to.equal('Astronomical diary');
        });
    });

    describe ('delete diary function', () => {
        it('should delete diary if exists', function(done) {
            if (file) {
                fs.unlinkSync(file);
            done();
            }
            expect(fs.existsSync(file)).to.be.false;
        });
    });

    afterEach(() => {
        mock.restore();
    });
});