const shared = {
  getCompany: async () => {
    const url = constants.routeApis.COMPANY_API.GET_COMPANY;
    return await utils.http.get<any>(url);
  }
};

export default shared;
