module.exports = Object.freeze({
  PLAYER_RADIUS: 16,
  PLAYER_SPEED: 150,
  SCORE_PER_SECOND: 1,
  BOMB_FUSE_TIME: 5,
  BOMB_RADIUS: 50,

  MAP_SIZE: 408,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    BOMB: 'bomb',
    GAME_OVER: 'dead',
  },
});