const chai = require('chai')
const _ = require('lodash')
const expect = chai.expect
chai.use(require('chai-http'))

describe('/accounts', () => {
  it('it should filter accounts on country', (done) => {
    chai
      .request('http://localhost:3001')
      .get('/accounts/filter?country=CA&limit=5')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200)
        if (res.body.length > 0) {
          expect(_.get(res, 'body.[0].country')).to.deep.equal('CA')
        }
        done()
      })
  })

  it('it should filter accounts on country & mfa', (done) => {
    chai
      .request('http://localhost:3001')
      .get('/accounts/filter?country=CA&mfa=SMS&limit=5')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200)
        if (res.body.length > 0) {
          expect(_.get(res, 'body.[0].country')).to.deep.equal('CA')
          expect(_.get(res, 'body.[0].mfa')).to.deep.equal('SMS')
        }
        done()
      })
  })

  it('it should filter accounts on country, mfa & firstName', (done) => {
    chai
      .request('http://localhost:3001')
      .get('/accounts/filter?country=CA&mfa=SMS&firstName=Judd&limit=5')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200)
        if (res.body.length > 0) {
          expect(_.get(res, 'body.[0].country')).to.deep.equal('CA')
          expect(_.get(res, 'body.[0].mfa')).to.deep.equal('SMS')
          expect(_.get(res, 'body.[0].firstName')).to.deep.equal('Judd')
        }
        done()
      })
  })

  it('it should sort accounts on amt in DESCENDING order', (done) => {
    chai
      .request('http://localhost:3001')
      .get('/accounts/sort/amt?order=DESCENDING&limit=5')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200)
        if (res.body.length > 1) {
          expect(_.get(res, 'body.[0].amt')).to.be.at.least(_.get(res, 'body.[1].amt'))
        }
        done()
      })
  })

  it('it should sort accounts on createdDate in DESCENDING order', (done) => {
    chai
      .request('http://localhost:3001')
      .get('/accounts/sort/createdDate?order=DESCENDING&limit=5')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200)
        if (res.body.length > 1) {
          expect(new Date(_.get(res, 'body.[0].createdDate'))).to.be.at.least(new Date(_.get(res, 'body.[1].createdDate')))
        }
        done()
      })
  })
})
