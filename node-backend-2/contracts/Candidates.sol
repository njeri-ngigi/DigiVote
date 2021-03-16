pragma solidity >0.5.0;
pragma experimental ABIEncoderV2;

contract Candidates {
  uint public candidateCount = 0;
  uint public voterCount = 0;
  uint public votingStartTime;
  uint public votingTime = 24 hours;

  struct Candidate {
    uint votes;
    uint id;
    string name;
    string position;
  }

  mapping (uint => Candidate) public candidates;
  mapping(string => bool) public voters;
  
  // event CandidateCreated(uint id, string name, string position);

  constructor() public {
    createCandidate(1, 'Jakana Mvule', 'president');
    createCandidate(2, 'Freddie Mercury', 'president');
    createCandidate(3, 'Kat Valentine', 'president');
    createCandidate(4, 'Lucie Shelly', 'president');

    createCandidate(5, 'Lady White', 'academics and research');
    createCandidate(6, 'Einstein', 'academics and research');
    createCandidate(7, 'Elon Musk', 'academics and research');

    createCandidate(8, 'Richard Mwanza', 'social activities');
    createCandidate(9, 'Maureen Kamene', 'social activities');

    createCandidate(10, 'Kelvin Kamande', 'communcations');
    
    createCandidate(11, 'Ian Mugambi', 'auditor general');
    createCandidate(12, 'Mirielle Kimanzi', 'auditor general');
    votingStartTime = block.timestamp;
  }

  // TODO: add modifier — only admins should be able to do this
  function createCandidate(uint _id, string memory _name, string memory _position) private {
    candidateCount++;
    candidates[_id] = Candidate(0, _id, _name, _position);
  }

  function voteForCandidates(string memory _voterHash, Candidate[] memory _candidates) public {
    bool hasVoted = voters[_voterHash];
    require(!hasVoted);
    require((votingStartTime+votingTime) <= block.timestamp);
    voters[_voterHash] = true;
    voterCount++;
    
    for (uint i = 0; i < _candidates.length; i++) {
      uint candidateId = _candidates[i].id;
      candidates[candidateId].votes++;
    }
  }

  // TODO: add modifier — only admins should be able to do this
  // function addManyCandidates(Candidate[] memory _candidates) public {
  //   for (uint i = 0; i < _candidates.length; i++) {
  //     Candidate memory candidate  = _candidates[0];
  //     createCandidate(candidate.id, candidate.name, candidate.position);
  //     emit CandidateCreated(candidate.id, candidate.name, candidate.position);
  //   }
  // }

  // function viewCandidate(uint _id) external view returns(Candidate memory) {
  //   return candidates[_id];
  // }
}