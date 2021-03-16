import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Component } from 'react';
import { toTittleCase } from '../utils/helpers';

class Candidates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readyToVote: false,
    }

    this.startVoting = this.startVoting.bind(this);
    this.selectCandidate = this.selectCandidate.bind(this);
  }

  startVoting() {
    this.setState({ readyToVote: true });
  }

  selectCandidate(candidate) {
    const { position, setCandidateSelected } = this.props;
    setCandidateSelected(candidate, position);
  }

  render() {
    const { readyToVote } = this.state;
    const { 
      candidates, position, candidatesSelected, finishVoting, votingError, resetVotingError
    } = this.props;
    const candidatesInPositions = [];

    candidates.forEach((candidate) => {
      if(candidate.position === position) {
        candidate.image = 'https://placeimg.com/400/400/animals';
        candidatesInPositions.push(candidate);
      }
    });

    // TODO: add candidate pages with manifestos an
    const candidateList = candidatesInPositions.map((candidate) => {
      const compareCandidate = candidatesSelected[position];
      let checkedClass = 'checked';
      if (compareCandidate) {
        checkedClass = compareCandidate.name === candidate.name ? 'checked show' : 'checked';
      }
      return (
        <div className="candidate-wrapper" data-position={position} id={`candidate_id_${candidate.id}`} key={candidate.name}>
          <div className="candidate">
            <img src={candidate.image} alt={`${candidate.name}`}/>
            <p>{candidate.name}</p>
            {readyToVote && <FontAwesomeIcon icon={faCheckCircle} className={checkedClass}/>}
          </div>
          {readyToVote && <button className="choose" onClick={() => this.selectCandidate(candidate)}>Cast vote</button>}
        </div>
      )
    });

    return (
      <div className="candidates">
        {!readyToVote && <button className="vote" onClick={this.startVoting}>Are you ready to vote?</button>}
        {readyToVote && <button className="vote" onClick={finishVoting}>Submit your votes?</button>}
        {votingError && 
          <div class="voting-error">
            <span>You have to vote for atleast 1 candidate</span>
            <button onClick={resetVotingError}>Ok?</button>
          </div>
        }
        <div className="candidate-cat">
          <h2>{toTittleCase(position)}</h2>
        </div>
        <div className="candidates-list">
          {candidateList}
        </div>
      </div>
    );
  }
}

export default Candidates;
