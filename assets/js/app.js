// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

import socket from "./socket";

import run_game from "./Game";

function form_init() {
  console.log("form_init")
  //not super feelin this rn
  let channel;

  var url = 'game/' + $('#game-input').val();
  $('#game-link').attr('href', url);
  
  $('#game-input').change(function() {
    var url = 'game/' + $('#game-input').val();
    $('#game-link').attr('href', url);
  });

  /*$('#game-button').click(() => {
    //let name = $('#game-input').val();
    //$("#game-button").href = "game/" + name;
    //channel = socket.channel("games:" + name, {});

    /*channel.join()
        .receive("ok", resp => { console.log("joined af", resp )})
        .receive("error", resp => { console.log("Unable to join", resp) });*/
    //run_game(root, channel)
  
}

function gotView(view) {
  console.log("we in")
}

function start() {
  let root = document.getElementById('root');
  if (root) {
    //let channel = socket.channel("games:" + window.gameName, {}) ill do that later
    let channel = socket.channel("games:" + window.gameName, {});
    run_game(root, channel)
  }

  if (document.getElementById('index-page')) {
    form_init();
  }
}

$(start);