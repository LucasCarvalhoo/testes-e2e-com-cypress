// cypress/e2e/signup.cy.js

import { faker } from '@faker-js/faker/locale/en'

describe('Sign up', () => {
  // cypress/e2e/signup.cy.js

  describe('Sign up', () => {
    const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
    const password = Cypress.env('USER_PASSWORD')

    it('successfully login using confirmation code sent via email', () => {
      cy.fillSignupFormAndSubmit(emailAddress, password)
    })
  })
})
