/* global describe it after before beforeEach */

const assert = require('chai').assert
const until = require('test-until')
require('./general.js')

// users
const owner = { username: 'soge__' }
const testUser = { username: 'test' }

const tmi = require('./general.js').tmi

describe('System - Moderation', function () {
  before(async () => {
    await tmi.waitForConnection()
    // enable links with spaces to be moderated
    global.commons.sendMessage.reset()

    global.parser.parse(owner, '!set moderationLinksWithSpaces true')
    await until(() => {
      if (global.commons.sendMessage.called) {
        return global.commons.sendMessage.calledWith(
          global.translate('core.settings.moderation.moderationLinksWithSpaces.true'))
      } else return false
    }, 10000)
  })
  beforeEach(() => {
    global.commons.timeout.reset()
    global.commons.sendMessage.reset()
  })
  describe('Links', function () {
    describe('http://google.com - moderation OFF', function () {
      before(async () => {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationLinks false')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      after(async () => {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationLinks true')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, 'http://www.google.com')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('#42 - proc hrajes tohle auto je dost na nic ....', function () {
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, 'proc hrajes tohle auto je dost na nic ....')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('#44 - 1.2.3.4', function () {
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, '1.2.3.4')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('#47 - vypadá že máš problémy nad touto počítačovou hrou....doporučuji tvrdý alkohol', function () {
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, 'vypadá že máš problémy nad touto počítačovou hrou....doporučuji tvrdý alkohol')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('http://google.COM', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'http://google.COM')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('google.COM', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'google.COM')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('google . com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'google . com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('http://google.com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'http://google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('http://google . com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'http://google . com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('http://www.google.com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'http://www.google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('http://www . google.com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'http://www . google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('http://youtu.be/123jAJD123', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'http://youtu.be/123jAJD123')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('https://google.com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'https://google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('https://www.google.com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'https://www.google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('https://youtu.be/123jAJD123', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'https://youtu.be/123jAJD123')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('google.com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('www.google.com', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'www.google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('youtu.be/123jAJD123', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'youtu.be/123jAJD123')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
  })
  describe('Symbols', function () {
    describe('!@#$%^&*()(*&^%$#@#$%^&*) - moderation OFF', function () {
      before(async () => {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationSymbols false')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      after(async () => {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationSymbols true')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, '!@#$%^&*()(*&^%$#@#$%^&*)')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('!@#$%^&*()(*&^%$#@#$%^&*)', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, '!@#$%^&*()(*&^%$#@#$%^&*)')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('!@#$%^&*( one two (*&^%$#@#', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, '!@#$%^&*( one two (*&^%$#@#')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('!@#$%^&*( one two three four (*&^%$#@ one two three four #$%^&*)', function () {
      it('not timeout user', function (done) {
        global.parser.isModerated(testUser, '!@#$%^&*( one two three four (*&^%$#@ one two three four #$%^&*)')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('!@#$%^&*()(*&^', function () {
      it('not timeout user', function (done) {
        global.parser.isModerated(testUser, '!@#$%^&*()(*&^')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
  })
  describe('Long Message', function () {
    describe('asdfstVTzgo3KrfNekGTjomK7nBjEX9B3Vw4qctminLjzfqbT8q6Cd23pVSuw0wuWPAJE9vaBDC4PIYkKCleX8yBXBiQMKwJWb8uonmbOzNgpuMpcF6vpF3mRc8bbonrfVHqbT00QpjPJHXOF88XrjgR8v0BQVlsX61lpT8vbqjZRlizoMa2bruKU3GtONgZhtJJQyRJEVo3OTiAgha2kC0PHUa8ZSRNCoTsDWc76BTfa2JntlTgIXmX2aXTDQEyBomkSQAof4APE0sfX9HvEROQqP9SSf09VK1weXNcsmMs - moderation OFF', function () {
      before(async function () {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationLongMessage false')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      after(async function () {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationLongMessage true')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, 'asdfstVTzgo3KrfNekGTjomK7nBjEX9B3Vw4qctminLjzfqbT8q6Cd23pVSuw0wuWPAJE9vaBDC4PIYkKCleX8yBXBiQMKwJWb8uonmbOzNgpuMpcF6vpF3mRc8bbonrfVHqbT00QpjPJHXOF88XrjgR8v0BQVlsX61lpT8vbqjZRlizoMa2bruKU3GtONgZhtJJQyRJEVo3OTiAgha2kC0PHUa8ZSRNCoTsDWc76BTfa2JntlTgIXmX2aXTDQEyBomkSQAof4APE0sfX9HvEROQqP9SSf09VK1weXNcsmMs')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('asdfstVTzgo3KrfNekGTjomK7nBjEX9B3Vw4qctminLjzfqbT8q6Cd23pVSuw0wuWPAJE9vaBDC4PIYkKCleX8yBXBiQMKwJWb8uonmbOzNgpuMpcF6vpF3mRc8bbonrfVHqbT00QpjPJHXOF88XrjgR8v0BQVlsX61lpT8vbqjZRlizoMa2bruKU3GtONgZhtJJQyRJEVo3OTiAgha2kC0PHUa8ZSRNCoTsDWc76BTfa2JntlTgIXmX2aXTDQEyBomkSQAof4APE0sfX9HvEROQqP9SSf09VK1weXNcsmMs', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'asdfstVTzgo3KrfNekGTjomK7nBjEX9B3Vw4qctminLjzfqbT8q6Cd23pVSuw0wuWPAJE9vaBDC4PIYkKCleX8yBXBiQMKwJWb8uonmbOzNgpuMpcF6vpF3mRc8bbonrfVHqbT00QpjPJHXOF88XrjgR8v0BQVlsX61lpT8vbqjZRlizoMa2bruKU3GtONgZhtJJQyRJEVo3OTiAgha2kC0PHUa8ZSRNCoTsDWc76BTfa2JntlTgIXmX2aXTDQEyBomkSQAof4APE0sfX9HvEROQqP9SSf09VK1weXNcsmMs')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
  })
  describe('Caps', function () {
    describe('AAAAAAAAAAAAAAAAAAAAAA - moderation OFF', function () {
      before(async function () {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationCaps false')
        global.parser.parse(owner, '!set moderationSpam false')
        await until(() => global.commons.sendMessage.calledTwice, 10000)
      })
      after(async function () {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationCaps true')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, 'AAAAAAAAAAAAAAAAAAAAAA')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('AAAAAAAAAAAAAAAAAAAAAA', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'AAAAAAAAAAAAAAAAAAAAAA')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('ЙЦУЦЙУЙЦУЙЦУЙЦУЙЦУЙЦ', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'ЙЦУЦЙУЙЦУЙЦУЙЦУЙЦУЙЦ')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('123123123213123123123123213123', function () {
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, '123123123213123123123123213123')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('AAAAAAAAAAAAAaaaaaaaaaaaa', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'AAAAAAAAAAAAAaaaaaaaaaaaa')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
  })
  describe('Spam', function () {
    describe('Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum - moderation OFF', function () {
      before(async function () {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationSpam false')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      after(async function () {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!set moderationSpam true')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
      })
      it('will not timeout user', function (done) {
        global.parser.isModerated(testUser, 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
    })
    describe('Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('Lorem Ipsum Lorem Ipsum test 1 2 3 4 Lorem Ipsum Lorem Ipsum', function () {
      it('timeout user', async () => {
        global.parser.isModerated(testUser, 'Lorem Ipsum Lorem Ipsum test 1 2 3 4 Lorem Ipsum Lorem Ipsum')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
  })
  describe('!permit', function () {
    describe('parsing \'!permit\'', function () {
      it('should send parse error', async function () {
        global.commons.sendMessage.reset()
        global.parser.parse(owner, '!permit')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
        assert.equal(global.commons.sendMessage.getCall(0).args[0], global.translate('moderation.permit-parse-failed'))
      })
    })
    describe('parsing \'!permit [username]\'', function () {
      it('should send success message', async function () {
        global.parser.parse(owner, '!permit test')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
        assert.equal(global.commons.sendMessage.getCall(0).args[0], global.translate('moderation.user-have-link-permit')
          .replace('$username', '@test')
          .replace('$count', 1)
          .replace('$link', 'link'))
      })
      it('should not timeout user on first link message', function (done) {
        global.parser.isModerated(testUser, 'http://www.google.com')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
      it('should timeout user on second link message', async function () {
        global.parser.isModerated(testUser, 'http://www.google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
    describe('parsing \'!permit [username]\' - case sensitive test', function () {
      it('should send success message', async function () {
        global.parser.parse(owner, '!permit TEST')
        await until(() => global.commons.sendMessage.calledOnce, 10000)
        assert.equal(global.commons.sendMessage.getCall(0).args[0], global.translate('moderation.user-have-link-permit')
          .replace('$username', '@test')
          .replace('$count', 1)
          .replace('$link', 'link'))
      })
      it('should not timeout user on first link message', function (done) {
        global.parser.isModerated(testUser, 'http://www.google.com')
        setTimeout(() => { assert.isTrue(global.commons.timeout.notCalled); done() }, 500)
      })
      it('should timeout user on second link message', async function () {
        global.parser.isModerated(testUser, 'http://www.google.com')
        await until(() => global.commons.timeout.calledOnce, 10000)
      })
    })
  })
})
