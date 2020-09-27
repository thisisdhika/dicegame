import * as React from "react";

import CoreDice from "./lib/core.dice";
import md5 from "js-md5";
import classNames from "classnames";

export default class App extends React.Component {
  state = {
    playerGameLogs: [],
    players: [],
    username: "",
    dices: 4,
  };

  DC = undefined;

  componentDidMount() {
    // this.setState({ playerGameLogs: this.DC.state.players });
  }

  handlePlayGame() {
    const { players, dices } = this.state;
    this.DC = new CoreDice({ players, dices });

    this.DC.run();
    this.setState({ playerGameLogs: this.DC.state.players });
  }

  handleContinueGame() {
    this.DC.run();
    this.setState({ playerGameLogs: this.DC.state.players });
  }

  render() {
    return (
      <main className="app bg-gray-200">
        <div className="container">
          <div className="flex-auto flex flex-col">
            <h1 className="text-4xl leading-6 font-bold text-center mt-8">
              Dice Game <br />
              <small className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                By: Dhika Putra Ardana
              </small>
            </h1>
            <div className="flex flex-wrap justify-center items-start">
              {this.state.players.length > 0 && (
                <div
                  className={classNames([
                    "flex flex-wrap",
                    this.DC === undefined ? "w-3/5" : "w-full",
                  ])}
                >
                  <h3 className="w-full">Players Registrated</h3>
                  {this.state.players.map((player) => (
                    <div className="w-1/2">
                      <div
                        className="player shadow-lg rounded p-4 bg-white mr-4 mt-4"
                        key={player.id}
                      >
                        <div className="flex justify-start items-center">
                          <div className="rounded-full overflow-hidden w-12 h-12">
                            <img
                              src={`http://www.gravatar.com/avatar/${md5(
                                player.username.toLowerCase().trim()
                              )}?d=identicon`}
                              alt={player.username}
                            />
                          </div>
                          <h5 className="font-bold ml-3">
                            {player.username} <br />
                            {this.state.playerGameLogs.length > 0 && (
                              <small>
                                Score:{" "}
                                {
                                  this.state.playerGameLogs.find(
                                    (p) => p.id === player.id
                                  ).scores
                                }
                              </small>
                            )}
                          </h5>
                        </div>
                        {this.state.playerGameLogs.length > 0 && (
                          <ul className="list-none mt-4">
                            {this.state.playerGameLogs
                              .find((p) => p.id === player.id)
                              .roundsLog.map((round, index) => (
                                <li
                                  key={index}
                                  className="font-bold text-gray-800 flex flex-wrap justify-start items-center"
                                >
                                  <span className="w-full">
                                    Ronde #{index + 1}
                                  </span>
                                  <span className="w-full text-gray-600">
                                    Dadu Tersisa : {player.dices} Buah
                                  </span>
                                  <span className="w-full text-gray-600">
                                    Hasil Perolehan Lempar Dadu :
                                  </span>
                                  {round.map((r, rK) => (
                                    <h1 key={rK}>
                                      {r.diceValue}
                                      {round.length > rK + 1 ? ", " : ""}
                                    </h1>
                                  ))}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}

                  {this.DC !== undefined && (
                    <button
                      type="button"
                      disabled={
                        this.state.playerGameLogs.filter((p) => p.playing)
                          .length <= 1
                      }
                      onClick={this.handleContinueGame.bind(this)}
                      className="group w-full relative flex justify-center items-center py-2 px-4 mt-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      {this.state.playerGameLogs.filter((p) => p.playing)
                        .length > 1 ? (
                        <>
                          Lanjutkan Permainan{" "}
                          <i className="fa fa-play ml-1"></i>
                        </>
                      ) : (
                        "Permainan Berakhir"
                      )}
                    </button>
                  )}
                  {this.DC !== undefined &&
                    this.state.playerGameLogs.filter((p) => p.playing).length <=
                      1 && (
                      <div className="shadow-lg bg-white rounded-lg w-full text-center p-4 mt-8">
                        <h1 className="font-bold">
                          <small className="text-gray-600">
                            Permainan Dimenangkan oleh :
                          </small>{" "}
                          <br />
                          {
                            this.state.playerGameLogs.sort(
                              (a, b) => b.scores - a.scores
                            )[0].username
                          }
                        </h1>
                        <p>
                          Dengan Perolehan Score{" "}
                          <span className="font-black">
                            {
                              this.state.playerGameLogs.sort(
                                (a, b) => b.scores - a.scores
                              )[0].scores
                            }
                          </span>
                        </p>
                      </div>
                    )}
                </div>
              )}
              {this.DC === undefined && (
                <div className="p-6 bg-white shadow-xl rounded-lg w-2/5">
                  <h2 className="text-center text-2xl leading-9 font-extrabold text-gray-900">
                    Add New Player
                  </h2>
                  <form className="mt-2" action="#">
                    <input type="hidden" name="remember" value="true" />
                    <div className="flex flex-wrap">
                      <div className="pr-4 w-3/4">
                        <input
                          name="username"
                          type="text"
                          required
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                          placeholder="Email address / Username"
                          value={this.state.username}
                          onChange={({ target: { value: username } }) =>
                            this.setState({ username })
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          this.setState(({ players, username }) => {
                            return username
                              ? {
                                  players: [
                                    ...players,
                                    { id: players.length + 1, username },
                                  ],
                                  username: "",
                                }
                              : {};
                          })
                        }
                        className="w-1/4 group relative flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                      >
                        Add
                      </button>

                      <div className="mt-6 flex flex-wrap justify-center items-center">
                        <label htmlFor="dices">Jumlah Dadu</label>
                        <div className="group flex flex-wrap items-center justify-center flex-auto ml-4">
                          <button
                            type="button"
                            onClick={() =>
                              this.setState(({ dices }) => ({
                                dices: dices > 1 ? dices - 1 : dices,
                              }))
                            }
                            className="mr-2 group relative flex justify-center items-center w-8 h-8 border border-transparent text-sm leading-5 font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            id="dices"
                            name="dices"
                            type="text"
                            readOnly
                            required
                            className="text-center appearance-none w-16 rounded-md relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                            value={this.state.dices}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              this.setState(({ dices }) => ({
                                dices: dices < 10 ? dices + 1 : dices,
                              }))
                            }
                            className="ml-2 group relative flex justify-center items-center w-8 h-8 border border-transparent text-sm leading-5 font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    {this.state.players.length > 1 && (
                      <button
                        type="button"
                        onClick={this.handlePlayGame.bind(this)}
                        className="group w-full relative flex justify-center items-center py-2 px-4 mt-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                      >
                        Play the Game <i className="fa fa-play ml-1"></i>
                      </button>
                    )}
                  </form>
                </div>
              )}
            </div>
            <div className="px-6 pb-6 pt-4 mt-6 shadow-xl bg-white rounded-lg">
              <h3 className="font-bold">Peraturan:</h3>
              <ol className="list-decimal pl-5">
                <li>
                  Pada awal permainan, setiap pemain mendapatkan dadu sejumlah M
                  unit.
                </li>
                <li>
                  Semua pemain akan melemparkan dadu mereka masing-masing secara
                  bersamaan
                </li>
                <li>
                  Setiap pemain akan mengecek hasil dadu lemparan mereka dan
                  melakukan evaluasi seperti berikut:
                  <ol className="list-disc pl-5">
                    <li>
                      Dadu angka 6 akan dikeluarkan dari permainan dan
                      ditambahkan sebagai poin bagi pemain tersebut.
                    </li>
                    <li>
                      Dadu angka 1 akan diberikan kepada pemain yang duduk
                      disampingnya. Contoh, pemain pertama akan memberikan dadu
                      angka 1 nya ke pemain kedua.
                    </li>
                    <li>
                      Dadu angka 2,3,4 dan 5 akan tetap dimainkan oleh pemain.
                    </li>
                  </ol>
                </li>
                <li>
                  Setelah evaluasi, pemain yang masih memiliki dadu akan
                  mengulangi step yang ke-2 sampai tinggal 1 pemain yang
                  tersisa.
                  <ol className="list-disc pl-5">
                    <li>
                      Untuk pemain yang tidak memiliki dadu lagi dianggap telah
                      selesai bermain.
                    </li>
                  </ol>
                </li>
                <li>Pemain yang memiliki poin terbanyak lah yang menang.</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
