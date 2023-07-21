import { useEffect, useState } from "react";

const useEffectWithKey = (
  effect: React.EffectCallback,
  deps: string[]
) => {
  const [prevKey, setPrevKey] = useState(deps[0]);

  useEffect(() => {
    const newKey = deps[0];

    if (prevKey === newKey) {
      return;
    }

    setPrevKey(newKey);

    effect();
  }, deps);
}

export { useEffectWithKey };

