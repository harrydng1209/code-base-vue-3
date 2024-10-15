import { getActivePinia, type Pinia, type Store } from 'pinia';

interface IPinia extends Pinia {
  _s: Map<string, Store>;
}

const getPinia = (): IPinia => {
  const pinia = getActivePinia() as IPinia;
  if (!pinia) throw new Error('There is no active Pinia instance');
  return pinia;
};

const disposeAll = () => {
  const pinia = getPinia();
  pinia._s.forEach((store) => store.$dispose());
};

const resetAll = () => {
  const pinia = getPinia();
  pinia._s.forEach((store) => store.$reset());
};

export default {
  disposeAll,
  resetAll
};
