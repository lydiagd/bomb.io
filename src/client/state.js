let lastGameUpdate = null;

export function initState() {

}

// Handle a newly received game update.
export function processGameUpdate(update) {
  lastGameUpdate = update;
}

export function getCurrentState() {
  return lastGameUpdate;
}