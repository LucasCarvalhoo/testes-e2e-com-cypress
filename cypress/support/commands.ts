/// <reference types="cypress" />

// cypress/support/commands.js

declare namespace Cypress {
    interface Chainable<Subject> {
      fillSignupFormAndSubmit(email: string, password: string): Chainable<void>;
    }
    interface Chainable<Subject> {
      fillLoginFormAndSubmit(email: string, password: string): Chainable<void>;
    }
  }  

Cypress.Commands.add('fillSignupFormAndSubmit', (email, password) => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.visit('/signup')
    cy.get('#email').type(email)
    cy.get('#password').type(password, { log: false })
    cy.get('#confirmPassword').type(password, { log: false })
    cy.contains('button', 'Signup').click()
    cy.get('#confirmationCode').should('be.visible')
    cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
      sentTo: email
    }).then(message => {
      const confirmationCode = message.html.body.match(/\d{6}/)[0]
      cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)
      cy.wait('@getNotes')
    })
  })

Cypress.Commands.add('fillLoginFormAndSubmit', (email, password) => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.visit('/login')
    cy.get('#email').type(email)
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Login').click()
    
    cy.get('h1').should('be.visible')
    cy.get('h4').should('be.visible')
  })