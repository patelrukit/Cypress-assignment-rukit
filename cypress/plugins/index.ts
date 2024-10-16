import { addMatchImageSnapshotPlugin } from 'cypress-plugin-snapshots/plugin';
import { PluginConfig } from 'cypress-plugin-snapshots/plugin';

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions => {
    require('cypress-mochawesome-reporter/plugin')(on);

    addMatchImageSnapshotPlugin(on, config);

    return config;
};
