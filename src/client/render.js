import { getAsset } from './assets';
import { getCurrentState } from './state';

const Constants = require('../server/constants');
const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// Make the canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function render() {
  const { me } = getCurrentState();
  if (!me) {
    console.log('Could not get me from server');
    return;
  }

  //console.log('my character is at ' + me.x + ' and ' + me.y);

  // Draw background
  renderBackground(me.x, me.y);

  // Draw all players
  renderPlayer(me);
  //others.forEach(renderPlayer.bind(null, me));
}

// ... Helper functions here excluded

let renderInterval = null;
export function startRendering() {
  renderInterval = setInterval(render, 1000 / 60);
}
export function stopRendering() {
  clearInterval(renderInterval);
}

function renderBackground(x,y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'black');
  backgroundGradient.addColorStop(1, 'gray');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayer(me) {
  context.drawImage(
    getAsset('char_one/Char_' + me.direction +'.png'),
    me.x,
    me.y,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  context.restore();
    
  }