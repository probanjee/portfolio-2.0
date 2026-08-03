import fs from 'fs';
import path from 'path';

const sourcePdf = path.join('inspiration', 'Prosun_Banerjee_CV.pdf');
const sourceAvatar = path.join('inspiration', 'avatar.png');

const destDir = path.join('public', 'assets');
const destPdf = path.join(destDir, 'Prosun_Banerjee_CV.pdf');
const destAvatar = path.join(destDir, 'avatar.png');

try {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
  }

  // Copy PDF
  if (fs.existsSync(sourcePdf)) {
    fs.copyFileSync(sourcePdf, destPdf);
    console.log(`Successfully copied ${sourcePdf} to ${destPdf}`);
  } else {
    console.warn(`Warning: Source PDF not found at ${sourcePdf}`);
  }

  // Copy Avatar
  if (fs.existsSync(sourceAvatar)) {
    fs.copyFileSync(sourceAvatar, destAvatar);
    console.log(`Successfully copied ${sourceAvatar} to ${destAvatar}`);
  } else {
    console.warn(`Warning: Source Avatar not found at ${sourceAvatar}`);
  }

  console.log('Asset connection completed successfully!');
} catch (error) {
  console.error('Error copying assets:', error);
}
