
// function onMouseInput(e) {
//   handleInput(e.clientX, e.clientY);
// }

// function onTouchInput(e) {
//   const touch = e.touches[0];
//   handleInput(touch.clientX, touch.clientY);
// }
import { updateDirection } from './networking'

function onKeyDown(e) //https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
{
    // Detect which key was pressed - refer to keycodes https://keycode.info/
    if( e.key == 'w' ) //W
        handleInput('up');
    else if (e.key == 'a') //A
        handleInput('left');
    else if (e.key == 's') //S
        handleInput('down');
    else if (e.key == 'd')
        handleInput('right');
}

function handleInput(dir) {
  // const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(dir);
  //CALL FUNCTION FROM NETWORKING JS TO SEND TO SERVER
}

export function startCapturingInput() {
  window.addEventListener('keypress', onKeyDown);
  // window.addEventListener('click', onMouseInput);
  // window.addEventListener('touchstart', onTouchInput);
  // window.addEventListener('touchmove', onTouchInput);
}

export function stopCapturingInput() {
  window.removeEventListener('keypress', onKeyDown);
 
}