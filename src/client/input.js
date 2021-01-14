
// function onMouseInput(e) {
//   handleInput(e.clientX, e.clientY);
// }

// function onTouchInput(e) {
//   const touch = e.touches[0];
//   handleInput(touch.clientX, touch.clientY);
// }
import { updateDirection } from './networking'

let key = {a:false, s:false, d:false, w:false};

function onKeyDown(e) //https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
{
    // Detect which key was pressed - refer to keycodes https://keycode.info/
    if( e.key == 'w' ) { //W
      key.w = true;
      handleInput(false, 'up');
    }  
    else if (e.key == 'a') { //A
      key.a = true;
      handleInput(false, 'left');
    }
    else if (e.key == 's') { //S
      key.s = true;
      handleInput(false, 'down');
    }
    else if (e.key == 'd') {
      key.d = true;
      handleInput(false, 'right');
    }
}

function onKeyUp(e) {
  if( e.key == 'w' ) //W
    key.w = false;
  else if (e.key == 'a') //A
    key.a = false;
  else if (e.key == 's') //S
    key.s = false;
  else if (e.key == 'd')
    key.d = false;
  handleInput(true, 'down');
}

function handleInput(idle, dir) {
  // const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(idle, dir);
  //CALL FUNCTION FROM NETWORKING JS TO SEND TO SERVER
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  // window.addEventListener('click', onMouseInput);
  // window.addEventListener('touchstart', onTouchInput);
  // window.addEventListener('touchmove', onTouchInput);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
}