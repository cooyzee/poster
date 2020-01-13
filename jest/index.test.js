const index = require('./index')

test('sum function', () => {
  expect(index.sum(1, 2)).toBe(3)
})

// toBe uses Object.is to test exact equality
// If you want to check the value of an object, use toEqual instead

test('object assignment', () => {
  const data = {one: 1}
  data['two'] = 2
  expect(data).toEqual({one: 1, two: 2})
})

