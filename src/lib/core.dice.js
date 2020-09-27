export class CoreDice {
  finish = false;
  state = {
    players: [],
    dices: 1,
    playing: true,
  };

  constructor(state) {
    this.state = state;

    this.state.players.forEach((player) => {
      player.scores = 0;
      player.dices = this.state.dices;
      player.rounds = [];
      player.roundsLog = [];
      player.playing = true;
    });
  }

  run() {
    if (this.state.players.filter((p) => p.playing).length <= 1) return this;
    else return this.throw().evaluate();
  }

  throw() {
    const players = this.state.players.filter((p) => p.playing);

    players.forEach((player) => {
      for (let i = 0; i < player.dices; i++) {
        const diceValue = this.randomDice();

        player.rounds.push({
          diceValue,
          amountDices: player.dices,
        });
      }
    });

    return this;
  }

  evaluate() {
    const players = this.state.players.filter((p) => !!p.playing);

    players.forEach((player) => {
      player.rounds.forEach((round) => {
        if (round.diceValue === 6) {
          player.scores += 1;
        }
      });
    });

    for (let index = 0; index < players.length; index++) {
      const player = players[index];

      for (let r = 0; r < player.rounds.length; r++) {
        const round = player.rounds[r];

        if (round.diceValue === 6) {
          player.dices -= 1;
        } else if (round.diceValue === 1) {
          player.dices -= 1;

          if (index + 1 >= players.length) {
            players[0].dices += 1;
          } else {
            players[index + 1].dices += 1;
          }
        }
      }

      player.roundsLog.push(player.rounds);
      player.rounds = [];
      if (player.dices < 1) {
        player.playing = false;
        break;
      }
    }

    return this;
  }

  randomDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

export default CoreDice;
