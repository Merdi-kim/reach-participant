import { 
  useNavigate
 } from 'react-router-dom'
 import MyAlgoConnect from '@randlabs/myalgo-connect';
import '../../styles/home.css'

function Home() {

  const navigate = useNavigate()

  const connectWallet = async() => {
    const myAlgoConnect = new MyAlgoConnect();
    try {
      const wallet = await myAlgoConnect.connect();
      navigate('/interact')
    } catch(err) {
      window.alert("failed to connect")
    }
    
  }

  return (
    <div className='home_container'>
      <div className='modal'>
        <p>Building in bear market has never been as fun as now. The first five people to whitelist here will be my priviledged builders </p>
        <button onClick={connectWallet}>Connect wallet</button>
      </div>
    </div>
  )
}

export default Home