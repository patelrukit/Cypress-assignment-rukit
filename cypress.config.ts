const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: 'cypress/support/e2e.ts',
    reporter: 'mochawesome',
            reporterOptions: {
                reportDir: 'cypress/reports',
                overwrite: false,
                html: true,
                json: true,
            },
  }
});
