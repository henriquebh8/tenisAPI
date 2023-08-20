#!/usr/bin/env node
'use strict';

import { bootstrap } from '../main';

const port = Number( 3001 );

try {
    bootstrap(port);
    console.log('server running on port: ',port )
} catch (error) {
    console.error(`Error starting server`);
    process.exit(-1);
}
