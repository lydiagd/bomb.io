const Constants = require('./constants');
const Player = require('./player');
const Bomb = require('./bomb');

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.bombs = [];
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
    this.numPlayers = 0;
    setInterval(this.update.bind(this), 1000 / 60);
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;
    this.numPlayers++;
    // Generate a position to start this player at.
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.players[socket.id] = new Player(socket.id, username, x, y); //create new player
  }

  removePlayer(socket) {
    this.numPlayers--;
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleInput(socket, idle, dir) { //or pass in some version of x and y
    if (this.players[socket.id]) {
      this.players[socket.id].setIdle(idle);
      if(!idle) {
        this.players[socket.id].setDirection(dir);
      }
    }
  }

  // ... ...


  //Add UPDATES
  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // Update each player
    Object.keys(this.sockets).forEach(playerID => {
      
      this.players[playerID].update(dt);
      //ENTER CODE NEEDED TO UPDATE EACH PLAYER
      //player.update(dt);
    });

    //Update each bomb
    const exploding = [];
    for(let i = 0; i < this.bombs.length; i++ ) {
      if(this.bombs[i].update(dt)) {
        exploding.push(this.bombs[i]);
      }
    }
    this.bombs = this.bombs.filter(bomb => !exploding.includes(bomb));

    //Decide whether or not a new bomb should be spawned
    if(this.numPlayers > 0 && Math.random()*50 < 1) {
      const x = Constants.MAP_SIZE * (Math.random());
      const y = Constants.MAP_SIZE * (Math.random());
      //console.log('Spawned bomb at x:' + x + " y:" + y);
      this.bombs.push(new Bomb(x,y));
    }

    // Check if any players are dead
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      // if (player.hp <= 0) {
      //   socket.emit(Constants.MSG_TYPES.GAME_OVER);
      //   this.removePlayer(socket);
      // }
    });

    // Send a game update to each player every other time (LEADERBOARD)
    if (this.shouldSendUpdate) {
      // const leaderboard = this.getLeaderboard();
      Object.keys(this.sockets).forEach(playerID => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit(
          Constants.MSG_TYPES.GAME_UPDATE,
          this.createUpdate(player, null),//fill null with leaderboard
        );
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  // }
//END UPDATE()

  // getLeaderboard() {
  //   return Object.values(this.players)
  //     .sort((p1, p2) => p2.score - p1.score)
  //     .slice(0, 5)
  //     .map(p => ({ username: p.username, score: Math.round(p.score) }));
  // }

  createUpdate(player, leaderboard) {
    const nearbyPlayers = Object.values(this.players).filter(
      p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );

    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: nearbyPlayers.map(p => p.serializeForUpdate()),
      bombs: this.bombs.map(b => b.serializeForUpdate()),
    };
  }
}

module.exports = Game;