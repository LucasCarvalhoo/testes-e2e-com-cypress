// cypress/e2e/signup.cy.js

import { faker } from '@faker-js/faker/locale/en'

describe('Sign up', () => {
  // cypress/e2e/signup.cy.js



    it.only('Login', function(){
      const emailAddress = `${Cypress.env('USER_EMAIL')}`
      const password = Cypress.env('USER_PASSWORD')

      cy.intercept('GET', '**/notes').as('getNotes')
      cy.visit('/login')
      cy.get('#email').type(emailAddress)
      cy.get('#password').type(password, { log: false })
      cy.contains('button', 'Login').click()
      cy.wait('@getNotes')

      cy.get('h1').should('be.visible')
      cy.get('h4').should('be.visible')
    })
  })

