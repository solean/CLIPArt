import React, { useState, useEffect } from 'react';
import './App.css';
import useWeb3Modal from './hooks/useWeb3Modal';
import { Button, Header, OuterContainer, Input, Title } from './components';
import { Contract } from '@ethersproject/contracts';


const CONTRACT_ADDR = '0x4dfd8f73b09b5edca9a20864e590e38698fd4591';


function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function AddressDisplay({ address }) {
  if (!address) return '';

  let addressStr = address.slice(0, 6) + '...' + address.slice(-4);
  return (
    <div style={{ display: 'inline-block' }}>
      { addressStr }
    </div>
  )
}

async function doStuff(provider, setConnectedAddress) {
  let signer = provider.getSigner();
  let address = await signer.getAddress();
  setConnectedAddress(address);
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [connectedAddress, setConnectedAddress] = useState('');

  useEffect(() => {
    if (provider && provider.connection) {
      doStuff(provider, setConnectedAddress);
    }
  }, [provider]);

  return (
    <div className="App">
      <Header>
        <Title>
          Test
        </Title>
        <div>
          { connectedAddress ? <AddressDisplay address={connectedAddress} /> : '' }
          <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
        </div>
      </Header>
      <OuterContainer>
        <img src={process.env.PUBLIC_URL + '/zilla.png'} width="500" height="500" alt="Godzilla by Monet" />
        
      </OuterContainer>
    </div>
  );
}

export default App;
