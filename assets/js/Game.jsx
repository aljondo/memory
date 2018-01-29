import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';
//import { Button } from 'reactstrap';

export default function run_game(root) {
  ReactDOM.render(<Game side={0}/>, root);
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    const letters = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G1', 'G2', 'H1', 'H2'];
    let j, x, i;
    for (i = letters.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = letters[i];
      letters[i] = letters[j];
      letters[j] = x;
    }
    const boardDict = {};
    for(var l in letters) {
      const letterObj = {};
      letterObj.hidden = true;
      letterObj.completed = false;
      boardDict[letters[l]] = letterObj;
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.resetGame = this.resetGame.bind(this);
    this.state = { 
      boardDict,
      letters,
      clickCount: 0,
      currentGuess: "",
      timeOut: false
    };
  }

  clickHandler(letter) { 
    console.log("handling clicks")
    if(!this.state.timeOut) {
      let clickCount = this.state.clickCount;
      clickCount++;
      const boardDict = this.state.boardDict;
      if(this.state.currentGuess === "") {
        boardDict[letter].hidden = false;
        this.setState({currentGuess: letter, clickCount})
      }
      else {
        if(letter.charAt(0) === this.state.currentGuess.charAt(0)) {
          boardDict[letter].hidden = false;
          boardDict[letter].completed = true;
          boardDict[this.state.currentGuess].hidden = false;
          boardDict[this.state.currentGuess].completed = true;
          this.setState({boardDict, clickCount, currentGuess: ""});
        }
        else {
          console.log("else else")
          boardDict[letter].hidden = false;
          boardDict[this.state.currentGuess].hidden = false;

          // setTimeout(this.hideLetters(this.stateCurrentGuess, letter), 1000);
          const self = this;
          const l1 = this.state.currentGuess;
          setTimeout(function() {
            console.log(self.state.currentGuess)
            self.hideLetters(l1, letter)
          }, 1000);
          console.log("second setState")
          this.setState({boardDict, clickCount, currentGuess: "", timeOut: true});
        }
      }
    }
  }

  hideLetters(l1, l2) {
    console.log("hide letters")
    console.log(l1)
    console.log(l2)
    const boardDict = this.state.boardDict;
    boardDict[l1].hidden = true;
    boardDict[l2].hidden = true;
    this.setState({boardDict, timeOut: false});
  }

  resetGame() {
    console.log("is this fucking resetting")
    const letters = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G1', 'G2', 'H1', 'H2'];
    let j, x, i;
    for (i = letters.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = letters[i];
      letters[i] = letters[j];
      letters[j] = x;
    }
    const boardDict = {};
    for(var l in letters) {
      const letterObj = {};
      letterObj.hidden = true;
      letterObj.completed = false;
      boardDict[letters[l]] = letterObj;
    }
    this.setState({ 
      boardDict,
      letters,
      clickCount: 0,
      currentGuess: "",
      timeOut: false
    });
  }

  render() {
    var click = this.clickHandler;
    var tileHolder = [];
    //group letters as 4
    tileHolder.push(this.state.letters.slice(0, 4))
    tileHolder.push(this.state.letters.slice(4, 8))
    tileHolder.push(this.state.letters.slice(8, 12))
    tileHolder.push(this.state.letters.slice(12, 16))

    return (
      <div>
        {tileHolder.map(function(tiles, index) {
          return (
            <div key={"row " + index}>
              {tiles.map(function(letter, index) {
                const className = this.state.boardDict[letter].completed ? "completed" : "";
                return (
                  <Tile 
                    boardId={letter}
                    clickHandler={click}
                    key={index}
                    letter={letter.charAt(0)}
                    hidden={this.state.boardDict[letter].hidden}
                    className={className}
                    >{letter}
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
