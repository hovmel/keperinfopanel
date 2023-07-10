import {useState} from 'react';

const UseInputState = (defaultValue = '') => {
  const [value, setValue] = useState<string>(defaultValue);
  const [error, setError] = useState<string>('');

  const handleValue = (val: string) => {
    setValue(val);
    if (error) {
      setError('');
    }
  };
  return [value, handleValue, error, setError];
};

export default UseInputState;
