const shared = {
  getHealthCheck: async () => {
    // const url = utils.shared.formatQueryString(constants.routeApis.HEALTH_CHECK, 'date=2024-08-21');
    // const url = stringFormat(constants.routeApis.HEALTH_CHECK, { id: companyId })
    const url = constants.routeApis.HEALTH_CHECK;
    return await utils.http.get<any>(
      url,
      undefined,
      constants.shared.SELECTOR_IDS.TEST_BUTTON_ID,
      'getHealthCheck: success'
    );
  }
};

export default shared;
