// cypress/e2e/login.cy.js

import { faker } from '@faker-js/faker/locale/en'

describe('guiLogin', () => {
    const emailAddress = `${Cypress.env('USER_EMAIL')}`
    const password = Cypress.env('USER_PASSWORD')

    it('successfully login using confirmation code sent via email', () => {
        cy.guiLogin(emailAddress, password)
    })
})
