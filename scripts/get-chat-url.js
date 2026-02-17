#!/usr/bin/env node
/**
 * Helper script to get the chat URL from config for codegen
 */
const testConfig = require('../test.config');
console.log(testConfig.chatURL);
