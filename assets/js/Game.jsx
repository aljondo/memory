import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';
//import { Button } from 'reactstrap';

export default function run_game(root, channel) {
  ReactDOM.render(<Game channel={channel} />, root);
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    console.log("channel")
    console.log(this.channel)
    this.state = {
      clickCount: 0,
      completed: [],
      guesses: [],
      timeout: false
    }

    this.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp) });

    this.clickHandler = this.clickHandler.bind(this)
    this.resetGame = this.resetGame.bind(this);
  }

  gotView(view) {
    console.log("GOT VIEW")
    console.log(view.game)
    //set timeout
    if(view.game.timeout) {
      //setTimeout(function() {
        //console.log("TIME")
      //}, 1000);
      setTimeout(self.unTimeout, 1000)
      setTimeout(() => {
        this.channel.push("clear")
          .receive("ok", this.gotView.bind(this));
      }, 1000)
    }
    console.log("timing out")
    this.setState(view.game);
  }

  clickHandler(letter) {
    console.log("CLICKED")
    console.log(letter)
    console.log(this)
    console.log(this.channel)
    if(!this.state.timeout) {
      this.channel.push("guess", { letter: letter })
        .receive("ok", this.gotView.bind(this));
    }
        //.receive("error", resp => { console.log("somethings going wrong af", resp) });
  }

  unTimeout() {
    console.log("TIME")
    this.setState({ timeout: false });
  }

  resetGame() {
    if(!this.state.timeout) {
      this.channel.push("rest")
          .receive("ok", this.gotView.bind(this));
    }
  }

  render() {
    var click = this.clickHandler;
    var tileHolder = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];

    return (
      <div>
        {tileHolder.map(function(tiles, index) {
          return (
            <div key={"row " + index}>
              {tiles.map(function(tileId) {
                //need to find if this letter is in guesses or completed
                //const className = this.state.boardDict[letter].completed ? "completed" : "";
                //const className = "pls";

                let isGuess = false;
                let isCompleted = false;
                let letter;
                const guesses = this.state.guesses;
                const completed = this.state.completed;

                console.log(this.state.completed)

                const guessedElement = guesses.find(function(letter) { return letter.id === tileId; });
                const completedElement = completed.find(function(letter) { return letter.id === tileId; });

                if(guessedElement) {
                  isGuess = true;
                  letter = guessedElement.letter;
                }

                if(completedElement) {
                  isCompleted = true;
                  letter = completedElement.letter;
                }

                //is it hidden?
                return (
                  <Tile 
                    boardId={tileId}
                    clickHandler={click}
                    key={tileId}
                    letter={letter}
                    isCompleted={isCompleted}
                    isGuess={isGuess}
                    >
                  </Tile>
                );
              }, this)}
            </div>
          );
        }, this)}
        <div>
          {"Click count: " + this.state.clickCount}
        </div>
        <div>
          <button onClick={this.resetGame}>
            Restart
          </button>
        </div>
      </div>
    )
  }
}
