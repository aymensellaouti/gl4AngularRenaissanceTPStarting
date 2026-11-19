import {APP_ROUTES} from './../../src/config/routes.config';
import {API} from './../../src/config/api.config';
describe('Visit page Cv', () => {
  it('should show Cv list without card', () => {
    cy.intercept(API.cv, {fixture: 'cvs'})
    cy.visit(APP_ROUTES.cv);
    cy.get('[test-cy="cvsList"]');
    cy.get('[test-cy="cvCard"]').should('not.exist');
    cy.get('[test-cy="cvsList"]').children().first().click();
    cy.intercept(API.cv + 1, { fixture: 'cv1' });
    cy.get('[test-cy="cvDetails"]').click({ force: true });
    cy.location().should((actualLocaltion) => {
      expect(actualLocaltion.pathname).to.equal('/cv/1');
    });
  })
})
