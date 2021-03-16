export const URL = 'http://localhost:8545';
export const DIGI_VOTE_ADDRESS = '0xD76984A978461dCBc5442E910920293010DEae2b';

export const DIGI_VOTE_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "name": "votes",
        "type": "uint256"
      },
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "position",
        "type": "string"
      },
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    // "signature": "0x6f0470aa"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "candidateCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    // "signature": "0xa9a981a3"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "voterCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    // "signature": "0xa9a981a3"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "votingStartTime",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    // "signature": "0xa9a981a3"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "votingTime",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    // "signature": "0xa9a981a3"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    // "signature": "0x90fa17bb"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_voterHash",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_candidates",
        "type": "tuple[]",
        "components": [
          {
            "name": "votes",
            "type": "uint256"
          },
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "position",
            "type": "string"
          },
        ],
      }
    ],
    "name": "voteForCandidates",
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    // "signature": "0xf6733cbb"
  }
]
