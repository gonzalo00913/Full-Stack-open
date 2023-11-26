describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const user = {
      name: "Nombre del Usuario",
      username: "nombreusuario",
      password: "contrasena123",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#login-form").should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("gonzalo00913");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();

      cy.contains("Nombre del Usuario is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("gonzalo00913");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();

      cy.get(".error").should("have css", "color", "rgb(255, 0, 0)");
    });
  });
});
