/* eslint-env jest */

import t from 'tcomb'
import { validate, refinements as r } from './tcomb'

describe('Tcomb validate', () => {
  const ValidateTestSchema = t.struct({
    id: t.String,
    number: t.Number
  })

  it('should pass valid data', () => {
    expect(validate({ id: 'testid', number: 123 }, ValidateTestSchema)).toMatchSnapshot()
  })
  it('should error on ivalid data', () => {
    expect(() => validate({ nope: 'wrongprop' }, ValidateTestSchema)).toThrowErrorMatchingSnapshot()
    expect(() => validate({ nope: 'wrongprop' }, 'Not a tcomb type')).toThrowErrorMatchingSnapshot()
  })
})

describe('Tcomb refinement', () => {
  describe('False', () => {
    it('should pass `false`', () => {
      expect(r.False(false)).toMatchSnapshot()
    })
    it('should error on everything except `false`', () => {
      expect(() => r.False(true)).toThrowErrorMatchingSnapshot()
      expect(() => r.False('string')).toThrowErrorMatchingSnapshot()
      expect(() => r.False(-1)).toThrowErrorMatchingSnapshot()
      expect(() => r.False(1)).toThrowErrorMatchingSnapshot()
      expect(() => r.False(-1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.False(1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.False(0)).toThrowErrorMatchingSnapshot()
      expect(() => r.False(null)).toThrowErrorMatchingSnapshot()
      expect(() => r.False(undefined)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('Absoluteurl', () => {
    it('should pass absolute url', () => {
      expect(r.Absoluteurl('http://test.com')).toMatchSnapshot()
      expect(r.Absoluteurl('https://test.com')).toMatchSnapshot()
      expect(r.Absoluteurl('//test.com')).toMatchSnapshot()
    })
    it('should error on everything except absolute url', () => {
      expect(() => r.Absoluteurl(true)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl('/url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl('url/')).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl('url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(-1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(-1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(0)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(null)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(undefined)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('Imagefile', () => {
    it('should pass path with image file', () => {
      expect(r.Imagefile('file.jpg')).toMatchSnapshot()
      expect(r.Imagefile('file.jpeg')).toMatchSnapshot()
      expect(r.Imagefile('file.png')).toMatchSnapshot()
      expect(r.Imagefile('file.gif')).toMatchSnapshot()
      expect(r.Imagefile('file.svg')).toMatchSnapshot()
    })
    it('should error on everything except path with image file', () => {
      expect(() => r.Imagefile(true)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile('http://test.com/imagelikepath.svg/')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile('http://test.com')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile('/url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile('url/')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile('url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile(-1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile(1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile(-1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile(1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile(0)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile(null)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagefile(undefined)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('Handle', () => {
    it('should pass handle', () => {
      expect(r.Handle('@test')).toMatchSnapshot()
    })
    it('should error on everything except handle', () => {
      expect(() => r.Handle(true)).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle('http://@test/')).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle('http://test.com')).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle('@url/test')).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle('@url:test')).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle('@url\\test')).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle('/url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle('url/')).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle('url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle(-1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle(1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle(-1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle(1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle(0)).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle(null)).toThrowErrorMatchingSnapshot()
      expect(() => r.Handle(undefined)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('EqualKeysAndProperty', () => {
    const EqualKeysAndId = r.EqualKeysAndProperty('id')(t.dict(t.String, t.Any, 'Testdata'))

    it('should pass object with equal keys and property value', () => {
      expect(EqualKeysAndId({ 235: { id: '235' } })).toMatchSnapshot()
      expect(EqualKeysAndId({ test: { id: 'test' } })).toMatchSnapshot()
    })
    it('should error on everything except object with equal keys and property value', () => {
      expect(() => EqualKeysAndId({ 235: { id: 235 } })).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId({ 235: { id: 111 } })).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId({ test: { id: 'nope' } })).toThrowErrorMatchingSnapshot()
      // @todo This one throws only first error, should not stop
      // expect(() => EqualKeysAndId({ id1: { id: 'nope' }, id2: { id: 'nopetwice' } })).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId({ test: { other: 'property' } })).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId(true)).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId('string')).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId(111)).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId(0)).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId(null)).toThrowErrorMatchingSnapshot()
      expect(() => EqualKeysAndId(undefined)).toThrowErrorMatchingSnapshot()
      expect(() => r.EqualKeysAndProperty('id')('string')).toThrowErrorMatchingSnapshot()
      expect(() => r.EqualKeysAndProperty('id')(111)).toThrowErrorMatchingSnapshot()
    })
  })
})
