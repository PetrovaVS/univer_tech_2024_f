import { useEffect, useState } from "react";

export const useHook = (param1 = '', param2 = '', param3 = '') => {
  const [stateValue, setStateValue] = useState('default value from hook');

  useEffect(() => {
    if (param1) {
      setStateValue(param1);
    }
  }, [param1, param2, param3]);

  const customMethod = () => {
    // some functionality
  };

  return stateValue;
};
