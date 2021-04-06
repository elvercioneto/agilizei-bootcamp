/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
       
        
 // solução proposta por Jaque Nunes, Turma 5 do Agilizei Bootcamp

      cy.intercept('POST', '**/api/1/databases/userdetails/collections/newtable?**', {
          statusCode: 200,
          body: {}
        }).as('postNewtable');

        cy.intercept('POST', '**/api/1/databases/userdetails/collections/usertable?**', {
          statusCode: 200, 
          body: {}
        }).as('postUsertable');

        cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {
          statusCode: 200,
          body: {}
        }).as('getNewtable');

        

      cy.visit('Register.html');

      //type
      cy.get('input[placeholder="First Name"]').type(chance.first());
      cy.get('input[ng-model^=Last]').type(chance.last());
      cy.get('input[ng-model^=Email]').type(chance.email());
      cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false}));

      //check => interagir com radios e checkboxes
      cy.get('input[value=FeMale]').check();
      cy.get('input[type=checkbox]').check('Cricket');
      cy.get('input[type=checkbox]').check('Hockey');

      //select -> select & select2 (combos)
      cy.get('select#Skills').select('Javascript');
      cy.get('select#countries').select('Argentina');
      cy.get('select#country').select('Australia', {force: true}); //o force true serve pra forçar interação com elemento oculto
      cy.get('select#yearbox').select('1996');
      cy.get('select[ng-model^=month]').select('February');
      cy.get('select#daybox').select('24');
      cy.get('input#firstpassword').type('Agilizei@2020');
      cy.get('input#secondpassword').type('Agilizei@2020');

      //attachFile => input file...upload de arquivos
      cy.get('input#imagesrc').attachFile('imagem-foto.png');

      cy.get('button#submitbtn').click();

      
      cy.wait('@postNewtable').then((resNewtable) => {
          // com o intercept
          expect(resNewtable.response.statusCode).to.eq(200)
        })
    
        cy.wait('@postUsertable').then((resUsertable) => {
          // com o intercept
          expect(resUsertable.response.statusCode).to.eq(200)
        })
    
        cy.wait('@getNewtable').then((resNewtable) => {
          // com o intercept
          expect(resNewtable.response.statusCode).to.eq(200)
        })
      

      cy.url().should('contain', 'WebTable');
        
    });
    
});

