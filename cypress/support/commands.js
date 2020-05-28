import 'cypress-file-upload'

Cypress.Commands.add("file_upload", (file, element, type) => {
  const selector = element;
  const fixturePath = file;
  cy.get(selector).then(subject =>
    cy.window().then(win =>
      cy
        .fixture(fixturePath, "base64")
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
          const el = subject[0];
          const testFile = new win.File([blob], name, { type });
          const dataTransfer = new win.DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          cy.wrap(subject).trigger("change", { force: true });
        })
    )
  )
})

Cypress.Commands.add('typeInStripeElement', (element, value) => {
  cy.get(`#${element} iframe`)
    .then($iframe => {
      const $body = $iframe.contents().find("body")
      cy.wrap($body)
        .find(`input[name^="${element}"]`)
        .type(value, { delay: 10 })
    })
})

Cypress.Commands.add('conditionalRoute', (options) => {
  let xHookPackage;
  const xHookUrl = 'https://unpkg.com/xhook@latest/dist/xhook.min.js';
  cy.request(xHookUrl)
    .then(response => {
      xHookPackage = response.body;
    });
  Cypress.on('window:before:load', win => {
    win.eval(xHookPackage);
    win.xhook.before(request => {
      if (request.method === options.method
        && request.url.includes(options.url)
        && (options.requiredKey && Object.keys(JSON.parse(request.body)).includes(options.requiredKey))
      ) {
        debugger
        return {
          status: options.status || 200,
          text: options.response
        }
      }
    })
  })
})