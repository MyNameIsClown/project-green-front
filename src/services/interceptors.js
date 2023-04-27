const interceptorSuccess = (response) => response

const interceptorErros = (error) => {
  if (error.response) {
    const { status } = error.response

    switch (status) {
      case 401:
        console.log('Error 401: Unauthorized')
    }
  }

  console.log('DATOS DE ERRROR', JSON.stringify(error.response.data, null, 2))
  return Promise.reject(error)
}

export { interceptorSuccess, interceptorErros }
