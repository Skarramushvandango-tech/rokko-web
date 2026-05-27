const fs = require('fs');
  const path = require('path');

  const dir = path.join(__dirname, '..', 'public', 'assets', 'wallpaper');
  const files = fs.readdirSync(dir)
    .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort();

  const out = path.join(__dirname, '..', 'src', 'data', 'wallpapers.json');
  fs.writeFileSync(out, JSON.stringify(files, null, 2));
  console.log('Wallpaper manifest written:', files);
  