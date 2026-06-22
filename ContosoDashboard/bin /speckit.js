#!/usr/bin/env node
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log('speckit - minimal CLI stub');
  console.log('');
  console.log('Usage: speckit [options] [text]');
  console.log('Options:');
  console.log('  -h, --help    Show this help');
  process.exit(0);
}
console.log(args.join(' '));
