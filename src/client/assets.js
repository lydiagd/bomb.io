const ASSET_NAMES = [
  //FILL WITH ASSET NAMES
  'char_one/Char_down.png',
  'char_one/Char_up.png',
  'char_one/Char_right.png',
  'char_one/Char_left.png'
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`);
      assets[assetName] = asset;
      resolve();
    };
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = assetName => assets[assetName];