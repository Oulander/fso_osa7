const alertReducer = (store = {text: '',type: ''}, action) => {
  switch (action.type) {
  case 'SETALERT': {
    return {
      text: action.text,
      alertType: action.alertType
    }
  }
  default: return store
  }
}

export const setAlert = (text, alertType, timeout = 4) => {
  return async (dispatch) => {
    dispatch({
      type: 'SETALERT',
      alertType: alertType,
      text: text
    })
    setTimeout(() => {
      dispatch({
        type: 'SETALERT',
        text: '',
        alertType: ''
      })
    }, timeout * 1000)
  }
}



export default alertReducer
