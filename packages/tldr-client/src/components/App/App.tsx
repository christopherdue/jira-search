import React, { ReactElement } from 'react';
import TLDRButton from './TLDRButton';
import './App.global.scss';
import { getUsersMessages } from '../../utils/helper';
import { getTldr } from '../../utils/httpClient';

function App(): ReactElement {
  const handleButtonClick = async () => {
    const usersMessages = getUsersMessages();
    try {
      const response = await getTldr(usersMessages.join(','));
      //  use response to create a note in the ticket
      console.log(response);
    } catch (err) {
      console.error(`Couldn't get TLDR, ${err}`);
    }
  };

  return <TLDRButton onClick={handleButtonClick} />;
}

export default App;
