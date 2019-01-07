describe("A sample mini blog using React", () => {
    it("Shows a content as a placeholder", () => {
        cy.visit("http://localhost:3000");
        cy.get('.post-placeholder').contains('p', 'No post found at the moment')
    })

    it("Clicks and route to Create Post page", () => {
        cy.contains('Create Post').click()
    })

    it("Verify the endpoint", () => {
        cy.url().should('include', '/create')
    })

    it("Check input focus on load", () => {
        cy.focused()
            .should('have.id', 'title')
    })

    context('Form submission', () => {
        it("Add a new blog post", () => {

            const titleText = "Sample title",
                descriptionText = "This is a very simple description",
                bodyText = "This is the sample body of the blog post";

            cy
                .get('input[name="title"]')
                .type(titleText, { delay: 100 })
                .should("have.value", titleText)

            cy
                .get('input[name="description"]')
                .type(descriptionText, { delay: 100 })
                .should("have.value", descriptionText)

            cy
                .get('input[name="body"]')
                .type(bodyText, { delay: 100 })
                .should("have.value", bodyText)

            cy.get('form').submit();

            cy.location('pathname').should("eq", "/")
        })
    })
})