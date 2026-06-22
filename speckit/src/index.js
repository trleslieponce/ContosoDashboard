const initCommand = require('./commands/init');

function main() {
    // Initialize the application
    console.log('Initializing speckit...');

    // Handle commands
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log('No command provided. Use "init" to initialize the project.');
        return;
    }

    const command = args[0];
    switch (command) {
        case 'init':
            initCommand();
            break;
        default:
            console.log(`Unknown command: ${command}`);
    }
}

main();