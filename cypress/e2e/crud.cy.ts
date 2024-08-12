describe('crud', () => {

    it('testing crud', () => {
        cy.intercept('GET', '**/notes').as('getNotes')
        cy.intercept('GET', '**/notes/**').as('getNote')
        cy.sessionLogin()

        cy.visit('/notes/new')
        cy.get('#content').type('noteDescription')
        cy.contains('button', 'Create').click()

    })
})