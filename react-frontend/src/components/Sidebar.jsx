import React from 'react';
import '../styles/App.scss';
import { toTittleCase } from '../utils/helpers';

const sidebar = ({ candidates, setActiveCandidate }) => {
  const positionsList = [];
  candidates.forEach(({ position }) => {
    if (positionsList.indexOf(position) === -1) {
      positionsList.push(position);
    }
  });

  const positions = positionsList.map((item, index) => {
    const elemClass = index === 0 ? 'position active' : 'position';
    const elemId =`candidate_${index}`;
    return (
      <div className={elemClass} id={elemId} onClick={()=>setActiveCandidate(elemId, item)} key={elemId}>
        {toTittleCase(item)}
      </div>
    )
  })

  return (
    <div className="sidebar">
      <p> Candidates </p>
      <div>
        {positions}
      </div>
      <hr/>
    </div>
  );
}

export default sidebar;
