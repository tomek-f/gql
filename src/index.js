class GraphQLClientError extends Error {

  constructor(response, request) {
    const message = `${GraphQLClientError.extractErrroMessage(response)}: ${JSON.stringify({ response, request })}`;

    super(message);

    this.response = response;
    this.request = request;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, GraphQLClientError);
    }
  }

  static extractErrroMessage(response) {
    try {
      return response.errors[0].message;
    } catch (err) {
      return `GraphQL Error (Code: ${response.status})`;
    }
  }

}

async function getBody(response) {
  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.startsWith('application/json')) {
    return response.json();
  }

  return response.text();
}

function headersJSON(obj) {
  return new Headers({
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
    ...obj,
  });
}

export default async function gqlight(
  url = '',
  {
    query,
    variables,
    body,
    method = 'post',
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

  if (response.ok && !result.errors && result.data) {
    if (!rawRequest) {
      return result.data;
    }

    return { ...result, status, headers: responseHeaders };
  }

  const errorResult = typeof result === 'string' ? { error: result } : result;

  throw new GraphQLClientError(
    { ...errorResult, status, headers: responseHeaders },
    { query, variables },
  );
}
