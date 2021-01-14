
// function onMouseInput(e) {
//   handleInput(e.clientX, e.clientY);
// }

// function onTouchInput(e) {
//   const touch = e.touches[0];
//   handleInput(touch.clientX, touch.clientY);
// }
import { updateDirection } from './networking'

let keys = [];

function onKeyDown(e) //https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
{
    // Detect which key was pressed - refer to keycodes https://keycode.info/
    var key = 'down';
    if( e.key == 'w' ) { //W
      key = 'up';
    }  
    else if (e.key == 'a') { //A
      key = 'left';
    }
    else if (e.key == 's') { //S
      key = 'down';
    }
    else if (e.key == 'd') {
      key = 'right';
    }
    //Check if element is already in stack and push if not
    let found = false;
    for(var i = 0; i < keys.length; i++) {
      if ( keys[i] == key ) { 
        found = true;
      }
    }
    if(!found) {
      keys.push(key);
      handleInput(false, key);
    }
}

function onKeyUp(e) {
  var key = 'down';
  if( e.key == 'w' ) { //W 
    key = 'up';
  }
  else if (e.key == 'a') { //A
    key = 'left'
  }
  else if (e.key == 's') { //S
    key = 'down';
  }
  else if (e.key == 'd') {
    key = 'right';
  }
  //Check for last button pressed
  for(var i = 0; i < keys.length; i++) {
    if ( keys[i] == key ) { 
      keys.splice(i, 1); 
    }
  }
  if(keys.length != 0) {
    handleInput(false, keys[0]);
  }
  else {
    handleInput(true, 'down');
  }
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