class GraphQLClientError extends Error {

  constructor(response, request) {
    const message = `GraphQL Error: ${GraphQLClientError.extractErrorMessage(response)}`;

    super(message);

    this.response = response;
    this.request = request;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, GraphQLClientError);
    }
  }

  static extractErrorMessage(response) {
    let message;

    try {
      message = response.error // string
        || response.errors && response.errors[0].message // object
        || Array.isArray(response.result) && response.result.find(({ errors }) => errors.length).errors[0].message; // array
    } catch (err) {
      message = `status ${response.status}`;
    }

    return message;
  }

}

async function getBody(response) {
  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.startsWith('application/json')) {
    return response.json();
  }

  return response.text();
}

const checkResults = ({ data, errors }) => data && !errors;

function headersJSON(obj) {
  return new Headers({
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
    ...obj,
  });
}

export default async function gqlite(
  url = '',
  {
    query,
    variables,
    body,
    method = 'post',
    errorRequestVariables = false,
    headers,
    rawRequest,
    ...rest
  } = {},
) {
  body = JSON.stringify(body || { query, variables });

  const response = await fetch(url, {
    method,
    headers: headersJSON(headers),
    body,
    ...rest,
  });

  const result = await getBody(response);
  const { headers: responseHeaders, status } = response;

  if (response.ok && (checkResults(result) || result.length && result.every(checkResults))) {
    if (!rawRequest) {
      return result.data;
    }

    return { result, status, headers: responseHeaders };
  }

  const resultType = Array.isArray(result) ? 'array' : typeof result;
  let errorResult;

  switch (resultType) {
    case 'string':
      errorResult = { error: result };
      break;
    case 'array':
      // in batch request (array of query and variables objects)
      errorResult = { result };
      break;
    default:
      errorResult = result;
  }

  throw new GraphQLClientError(
    { ...errorResult, status, headers: responseHeaders },
    { query, variables: errorRequestVariables ? variables : '*** set `errorRequestVariables` to `true` ***' },
  );
}
