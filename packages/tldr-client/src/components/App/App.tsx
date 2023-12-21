import React, { ReactElement } from 'react';
import TLDRButton from './TLDRButton';
import './App.global.scss';
import { getUsersMessages } from '../../utils/helper';
import { getTldr } from '../../utils/httpClient';
import { postInternalNote } from '../../utils/sdkUtils';

function App(): ReactElement {
  const handleButtonClick = async () => {
    const usersMessages = getUsersMessages();
    try {
      const generatedText = await getTldr(usersMessages.join(','));
      const isEmptyGeneratedText = generatedText.trim() === '';
      if (!isEmptyGeneratedText) {
        await postInternalNote(generatedText);
      } else {
        throw new Error(`Empty generated text, no note will be added`);
      }
    } catch (err) {
      console.error(`Couldn't get TLDR, ${err}`);
    }
  };

  return <TLDRButton onClick={handleButtonClick} />;
}

export default App;
