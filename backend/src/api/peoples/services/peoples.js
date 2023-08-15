'use strict';

/**
 * peoples service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::peoples.peoples');
