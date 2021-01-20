import queryString from 'query-string';

export const propsToParams = (params :any) => {
  return queryString.stringify(params, { skipNull: true, skipEmptyString: true, strict: true });
}