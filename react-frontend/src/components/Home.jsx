import React, { Component } from 'react';
import md5 from 'md5';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Web3 from 'web3';
import { DIGI_VOTE_ADDRESS, DIGI_VOTE_ABI, URL } from '../config';
import '../styles/App.scss';
import Candidates from './Candidates';
import Sidebar from './Sidebar';

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      account: '',
      candidateCount: 0,
      candidates: [],
      activePosition: '',
      candidatesSelected: {},
      votingError: false
    };
    this.setActiveCandidate = this.setActiveCandidate.bind(this);
    this.setCandidateSelected = this.setCandidateSelected.bind(this);
    this.finishVoting = this.finishVoting.bind(this);
    this.resetVotingError = this.resetVotingError.bind(this);
  }

  componentWillMount() {
    this.loadBlockChainData();
  }

  setCandidateSelected(candidate, position) {
    const { candidatesSelected } = this.state;
    const newCandidatesSelected = { ...candidatesSelected };
    newCandidatesSelected[position] = candidate;
    this.setState({ candidatesSelected: newCandidatesSelected,  votingError: false })
  }

  async loadBlockChainData() {
    try {
      const web3 = new Web3(URL);

      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });

      const candidateContract = new web3.eth.Contract(DIGI_VOTE_ABI, DIGI_VOTE_ADDRESS);
      this.setState({ candidateContract });
      
      console.log(candidateContract.methods)

      const candidateCount = await candidateContract.methods.candidateCount().call();
      this.setState({ candidateCount });

      for (var i = 1; i <= candidateCount; i++) {
        const candidates = await candidateContract.methods.candidates(i).call();
        if (i === 1) {
          this.setState({ activePosition: candidates.position })
        }
        this.setState({
          candidates: [...this.state.candidates, candidates]
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  setActiveCandidate (elemId, position) {
    const div =  document.querySelector('.active');
    div.classList.remove('active');
    const div2 =  document.querySelector(`#${elemId}`);
    div2.classList.add('active');
    this.setState({ activePosition: position })
  }

  finishVoting() {
    this.setState({ votingError: false })
    const { candidatesSelected } = this.state;
    const { user } = this.props;
    const web3 = new Web3(URL);
    
    const md5HashOfUserEmail = md5(user.email);
    
    if(Object.keys(candidatesSelected).length > 0) {
      let candidateValues = Object.values(candidatesSelected);
      const candidateArr = [];
      candidateValues.forEach(({votes, id, name, position})=>{
        candidateArr.push({votes, id, name, position})
      })
      // const r = web3.eth.abi.encodeParameter('bytes32[]', ['123', '123']);
      console.log(candidateArr);
      // this.state.candidateContract.methods.voteForCandidates(md5HashOfUserEmail, candidateArr)
      // .call()
        // .send({ from: this.state.account })
        // .once('receipt', (receipt) => {
        //   console.log(receipt);
        // })
    } else {
      this.setState({ votingError: true });
      setTimeout(()=>{
        this.setState({ votingError: false });
      }, 5000)
    }
  }

  resetVotingError() {
    this.setState({ votingError: false })
  }

  render() {
    const { candidates, activePosition } = this.state;
    const { user, logout } = this.props;
    // TODO: add loading module when fetching data

    return (
      <div className="home">
        <header>
          <span>Hi, {user.name}</span>
          <FontAwesomeIcon icon={faPowerOff} className="logout" title="Log out" onClick={()=>logout({}, true)}/>
        </header>
        {candidates.length > 0 && <div className="home-body">
          <Sidebar candidates={candidates} setActiveCandidate={this.setActiveCandidate}/>
          <Candidates
            position={activePosition}
            candidates={candidates}
            setActiveCandidate={this.setActiveCandidate}
            setCandidateSelected={this.setCandidateSelected}
            candidatesSelected={this.state.candidatesSelected}
            finishVoting={this.finishVoting}
            votingError={this.state.votingError}
            resetVotingError={this.resetVotingError}
          />
        </div>}
      </div>
    )
  }
}

export default Home;
