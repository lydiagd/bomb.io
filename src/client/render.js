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
  //const { me, others } = getCurrentState();
  // if (!me) {
  //   return;
  // }

  // Draw background
  context.drawImage(
    getAsset('char_one/Char.png'),
    0,
    0,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  context.restore();

  // Draw all players
  //renderPlayer(me, me);
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

function renderPlayer(me, player) {
    const { x, y } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;
  
    // Draw ship
    // context.save();
    // context.translate(canvasX, canvasY);
    // context.rotate(direction);
    // context.drawImage(
    //   getAsset('ship.svg'),
    //   -PLAYER_RADIUS,
    //   -PLAYER_RADIUS,
    //   PLAYER_RADIUS * 2,
    //   PLAYER_RADIUS * 2,
    // );
    // context.restore();
  
    
  }