#!/usr/bin/env node
require = require('esm')(module /*, options */);

const program = require('commander');

// functions
const {
    search
} = require('../src/function')

program.version('1.0.0')
    .description('Air Quality Index');

program
    .command('find <location>')
    .alias('f')
    .description('find a city/town')
    .action(location => search(location));


program.parse(process.argv);

