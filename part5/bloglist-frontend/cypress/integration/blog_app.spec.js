describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user1 = {
      username: 'nategg',
      name: 'Nate Grobe',
      password: 'testing'
    }

    const user2 = {
      username: 'nateg',
      name: 'Nate Gro',
      password: 'testing'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('nategg')
      cy.get('#password').type('testing')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('nategg')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.get('#error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('nategg')
      cy.get('#password').type('testing')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Add Blog').click()
      cy.get('#title').type('cypress test blog')
      cy.get('#author').type('Tester')
      cy.get('#url').type('www.test.ca')

      cy.get('#create-button').click()

      cy.contains('cypress test blog Tester')
    })

    it('A blog can be liked', function() {
      cy.contains('Add Blog').click()
      cy.get('#title').type('cypress test blog')
      cy.get('#author').type('Tester')
      cy.get('#url').type('www.test.ca')
      cy.get('#create-button').click()
      cy.contains('view').click()

      cy.get('.likes').contains(0)
      cy.contains('like').click()
      cy.get('.likes').contains(1)
    })

    it('A blog can be deleted by its creator', function() {
      cy.contains('Add Blog').click()
      cy.get('#title').type('cypress test blog')
      cy.get('#author').type('Nate Grobe')
      cy.get('#url').type('www.test.ca')
      cy.get('#create-button').click()
      cy.contains('view').click()

      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'cypress test blog')
    })

    it('A blog can\'t be deleted by someone who is not its creator', function() {
      cy.contains('Add Blog').click()
      cy.get('#title').type('cypress test blog')
      cy.get('#author').type('Nate Grobe')
      cy.get('#url').type('www.test.ca')
      cy.get('#create-button').click()

      cy.contains('logout').click()
      cy.reload()

      cy.get('#username').type('nateg')
      cy.get('#password').type('testing')
      cy.contains('login').click()

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.contains('cypress test blog')
    })
  })
})
