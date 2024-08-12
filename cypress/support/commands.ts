/// <reference types="cypress" />

// cypress/support/commands.js

declare namespace Cypress {
    interface Chainable<Subject> {
      fillSignupFormAndSubmit(email: string, password: string): Chainable<void>;
    }
    interface Chainable<Subject> {
      fillLoginFormAndSubmit(email: string, password: string): Chainable<void>;
    }
    interface Chainable<Subject> {
      guiLogin(email: string, password: string): Chainable<void>;
    }
    interface Chainable<Subject> {
      sessionLogin(email: string, password: string): Chainable<void>;
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

      cy.contains('h1', 'Your Notes').should('be.visible')
      cy.contains('a', 'Create a new note').should('be.visible')
    })
  })

Cypress.Commands.add('fillLoginFormAndSubmit', (email, password) => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.visit('/login')
    cy.get('#email').type(email)
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Login').click()

    cy.wait(4000)
    
    cy.get('h1').should('be.visible')
    cy.get('h4').should('be.visible')
  })

Cypress.Commands.add('guiLogin', (
  email = Cypress.env('USER_EMAIL'), 
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/notes').as('getNotes')
    cy.visit('/login')
    cy.get('#email').type(email)
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Login').click()

    cy.wait(4000)
    
    cy.get('h1').should('be.visible')
})

Cypress.Commands.add('sessionLogin', (
  email = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.guiLogin(email, password)
  cy.session(email, login)
})