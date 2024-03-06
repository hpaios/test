/* eslint-disable unicorn/no-useless-promise-resolve-reject */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

// eslint-disable-next-line max-statements
export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    'method': body ? 'POST' : 'GET',
    ...customConfig,
    'headers': {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (error) {
    return Promise.reject(error.message ? error.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, 'method': 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}
