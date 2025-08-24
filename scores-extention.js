(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Cette extension doit être chargée en mode non sandboxé.');
  }

  function createUser(username) {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) {
      users[username] = { scores: [] };
      localStorage.setItem("users", JSON.stringify(users));
      return "User created: " + username;
    }
    return "User already exists!";
  }

  function deleteUser(username) {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
      delete users[username];
      localStorage.setItem("users", JSON.stringify(users));
      return "User deleted: " + username;
    }
    return "User not found!";
  }

  function addScore(username, score) {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) return "User not found!";
    users[username].scores.push(Number(score));
    users[username].scores.sort((a, b) => b - a);
    localStorage.setItem("users", JSON.stringify(users));
    return "Score added: " + score;
  }

  function getScores(username) {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) return "[]";
    return JSON.stringify(users[username].scores);
  }

  function clearScores(username) {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
      users[username].scores = [];
      localStorage.setItem("users", JSON.stringify(users));
      return "Scores cleared!";
    }
    return "User not found!";
  }

  Scratch.extensions.register({
    name: 'Scores Manager',

    blocks: [
      {
        opcode: 'createUser',
        blockType: Scratch.BlockType.REPORTER,
        text: 'create user [USERNAME]',
        arguments: {
          USERNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Player1" }
        }
      },
      {
        opcode: 'deleteUser',
        blockType: Scratch.BlockType.REPORTER,
        text: 'delete user [USERNAME]',
        arguments: {
          USERNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Player1" }
        }
      },
      {
        opcode: 'addScore',
        blockType: Scratch.BlockType.REPORTER,
        text: 'add score [SCORE] to [USERNAME]',
        arguments: {
          SCORE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
          USERNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Player1" }
        }
      },
      {
        opcode: 'getScores',
        blockType: Scratch.BlockType.REPORTER,
        text: 'get scores of [USERNAME]',
        arguments: {
          USERNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Player1" }
        }
      },
      {
        opcode: 'clearScores',
        blockType: Scratch.BlockType.REPORTER,
        text: 'clear scores of [USERNAME]',
        arguments: {
          USERNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Player1" }
        }
      }
    ],

    createUser: args => createUser(args.USERNAME),
    deleteUser: args => deleteUser(args.USERNAME),
    addScore: args => addScore(args.USERNAME, args.SCORE),
    getScores: args => getScores(args.USERNAME),
    clearScores: args => clearScores(args.USERNAME),
  });

})(Scratch);
