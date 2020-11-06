const noVariables = '@tomek-f/gqlite: set `errorRequestVariables` to `true` to get request\'s variables';

class GraphQLClientError extends Error {

  constructor(response, request) {
    const message = `GraphQL Error: ${GraphQLClientError.extractErrorMessage(response)}`;

    super(message);

    this.request = request;
    this.response = response;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, GraphQLClientError);
    }
  }

  static extractErrorMessage(response) {
    let message;

    try {
      message = response.error // string
        || response.errors && response.errors[0].message // object
        || Array.isArray(response.result) && response.result.find(({
          errors,
        }) => errors.length).errors[0].message; // array
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

const checkResults = ({
  data, errors,
}) => data && !errors;

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
    operationName,
    errorRequestVariables = false,
    headers,
    rawRequest,
    ...rest
  } = {},
) {
  const response = await fetch(url, {
    method,
    headers: headersJSON(headers),
    body: JSON.stringify(body || {
      query,
      variables,
      operationName,
    }),
    ...rest,
  });

  const result = await getBody(response);
  const {
    headers: responseHeaders, status,
  } = response;

  if (response.ok && (checkResults(result) || result.length && result.every(checkResults))) {
    if (!rawRequest) {
      return result.data;
    }

    return {
      result,
      status,
      headers: responseHeaders,
    };
  }

  const resultType = Array.isArray(result) ? 'array' : typeof result;
  let errorResult;

  switch (resultType) {
    case 'string':
      errorResult = {
        error: result,
      };
      break;
    case 'array':
      // batch request (array of query and variables objects)
      errorResult = {
        result,
      };
      break;
    default:
      errorResult = result;
  }

  throw new GraphQLClientError(
    {
      ...errorResult,
      headers: responseHeaders,
      status,
    },
    {
      body,
      query,
      variables: errorRequestVariables ? variables : noVariables,
      operationName,
    },
  );
}
