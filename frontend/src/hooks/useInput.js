import { useState, useCallback } from 'react';

export default () => {
  const [value, setValue] = useState("");
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
}