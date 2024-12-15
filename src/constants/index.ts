import shared from './shared.const';
import routePages from './route-pages.const';
import routeApis from './route-apis.const';
import auth from './auth.const';

interface IConstants {
  shared: typeof shared;
  routePages: typeof routePages;
  routeApis: typeof routeApis;
  auth: typeof auth;
}

const constants: IConstants = {
  shared,
  routePages,
  routeApis,
  auth
};

export default constants;
