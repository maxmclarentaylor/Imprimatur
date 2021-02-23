const search = require('../src/search')
const data = require('../src/data')


describe('Search Test', () => {
  test(`Can find users by id`, () => {
    const results = search(data, {
      id: 1
    })
    expect(results[0].id).toEqual(1)
  })
  test(`Can find users by id 2`, () => {
    const results = search(data, {
      id: 4
    })
    expect(results[0].id).toEqual(4)
  })

  test(`Will handle dot notation in paths correctly`, () => {
    const results = search(data, {
      'settings.live': true
    })
    expect(results.length).toBe(3)
  })
  test(`Will handle dot notation in paths correctly round 2`, () => {
    const results = search(data, {
      'settings.lastActive': '2021-02-16'
    })
    expect(results.length).toBe(2)
  })

  test(`When a blank query object is specified it will return all data`, () => {
    const results = search(data, [])
    expect(results.length).toBe(5)
  })

  test(`Handle multiple search paths as a logical AND`, () => {
    const results = search(data, {
      'settings.live': true,
      name: 'Bill'
    })
    expect(results[0]).toHaveProperty('name', 'Bill')
    expect(results[0]).toHaveProperty('settings.live', true)
  })

  test(`Handle multiple search paths as a logical AND 2`, () => {
    const results = search(data, {
      'settings.lastActive': '2021-02-15',
      id: 4
    })
    expect(results[0]).toHaveProperty('name', 'Joana')
    expect(results[0]).toHaveProperty('settings.live', false)
  })
})