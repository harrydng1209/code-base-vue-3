import shared from './shared.api';
import company from './company.api';

interface IApis {
  shared: typeof shared;
  company: typeof company;
}

const apis: IApis = {
  shared,
  company
};

export default apis;
