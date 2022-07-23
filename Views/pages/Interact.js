import React from 'react'
import '../../styles/Interact.css'

function Interact() {
  return (
    <div>
      <div className='interact'>
      <fieldset>
        <legend>Please select one of the following</legend>
        <input type="radio" /><label>Deployer</label>
        <input type="radio" /><label>Participant</label> 
      </fieldset>

      <div>
        
      </div>
      </div>
    </div>
  )
}

export default Interact