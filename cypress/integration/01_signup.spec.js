context("Access signup", () => {
	before(() => {
		cy.visit("");
		cy.wait(10000);
	});

	beforeEach(() => {
		cy.visit("");

		cy.get(".sign-up-button").click();
		cy.contains(".ant-modal", "Welcome To Food Steps");

		cy.contains(".ant-tabs-tab", "Sign Up").click();
	});

	it("signup success", () => {
		cy.get("#signup-form input#username.ant-input").type("cyTester1");
		cy.get("#signup-form input#password.ant-input").type("12345678");
		cy.get("#signup-form input#confirm.ant-input").type("12345678");
		cy.get("#signup-form input#email.ant-input").type("abc@abc.com");

		cy.get(".ant-modal-content")
			.contains("button", "Register")
			.click({ force: true });

		cy.wait(500);
		cy.contains(
			"div.ant-message-success",
			`Successfully created account! Welcome cyTester1!`
		);
	});

	it("signup user name existed", () => {
		cy.get("#signup-form input#username.ant-input").type("cyTester1");
		cy.get("#signup-form input#password.ant-input").type("12345678");
		cy.get("#signup-form input#confirm.ant-input").type("12345678");
		cy.get("#signup-form input#email.ant-input").type("abc@abc.com");

		cy.get(".ant-modal-content")
			.contains("button", "Register")
			.click({ force: true });

		cy.wait(500);
		cy.contains(
			"div.ant-message-notice",
			`This username is already used! Please choose another username.`
		);
	});
});
