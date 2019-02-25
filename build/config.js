#!/usr/bin/env node

function getConfig(envName) {
    process.env['NODE_ENV'] = envName;
    return require('config');
}

function buildEnvConfig(config) {
    const envConfig = config.get('Environment');
    return Object.keys(envConfig)
        .map((key) => (`export ${key}="${envConfig[key]}"`));
}

function buildCloudFormationParameters(config) {
    const cfConfig = config.get('CloudFormation');
    return Object.keys(cfConfig)
        .map((key) => `${key}=${cfConfig[key]}`)
        .join(' ');
}

function buildTagParameters(config) {
    const tagConfig = config.get('Tags');
    return Object.keys(tagConfig)
        .map((key) => `${key}=${tagConfig[key]}`)
        .join(' ');
}

function createEnvFile(config) {
    const envFileContent = ['#!/usr/bin/env bash'];
    envFileContent.push(...buildEnvConfig(config));
    envFileContent.push(`export CloudFormationParams="${buildCloudFormationParameters(config)}"`);
    envFileContent.push(`export TagParams="${buildTagParameters(config)}"`);

    const fs = require('fs');
    return fs.writeFileSync('./.env', envFileContent.join('\n'));
}

try {
    createEnvFile(getConfig(process.argv[2]));
    process.exit(0);
} catch(error) {
    console.error(JSON.stringify(error, null, 2))
    process.exit(1);
}
