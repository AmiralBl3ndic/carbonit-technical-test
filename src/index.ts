import 'module-alias/register';
import Terrain from '@/model/terrain.model';

if (process.argv.length <= 2) {
  console.log('No file to scan');
  process.exit(0);
}

const filesToParse = process.argv.slice(-1);

filesToParse.forEach((file: string) => {
  console.log(`Parsing file ${file}`);

  const terrain = Terrain.parseFile(file);

  terrain.run();

  terrain.saveResultToFile(`${file}.result`);

  console.log('\n==================================\n');
});
