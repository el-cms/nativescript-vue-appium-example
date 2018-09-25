const assert = require('chai').assert
const nsAppium = require('nativescript-dev-appium')

let driver

// In case you need the server to started programmatically
before('start server', async () => {
  await nsAppium.startServer()
})

after('stop server', async () => {
  await nsAppium.stopServer()
})

// Driver creation/destruction
before('create driver', async () => {
  driver = await nsAppium.createDriver()
})

after('quit driver', async () => {
  await driver.quit()
  console.log('Bye.')
})

// Actual tests
describe('Interface buttons', async () => {
  it('Have a button for the cats', async () => {
    const submitBtn = await driver.findElementByAccessibilityId('mainMenuCatsButton')
    assert.isTrue(await submitBtn.isDisplayed())
  })
  it('Have a button for the dogs', async () => {
    const submitBtn = await driver.findElementByAccessibilityId('mainMenuDogsButton')
    assert.isTrue(await submitBtn.isDisplayed())
  })
  it('Have a button for the caribous', async () => {
    const submitBtn = await driver.findElementByAccessibilityId('mainMenuCaribousButton')
    assert.isTrue(await submitBtn.isDisplayed())
  })
})

