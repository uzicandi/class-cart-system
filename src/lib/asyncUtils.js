import produce from 'immer';

export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return param => async dispatch => {
    dispatch({ type });

    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
        error: true
      });
    }
  };
};

export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return produce(state, draft => {
          draft[key] = reducerUtils.loading();
        });
      case SUCCESS:
        return produce(state, draft => {
          draft[key] = reducerUtils.success(action.payload.data);
        });
      case ERROR:
        return produce(state, draft => {
          draft[key] = reducerUtils.error(action.payload);
        });
      default:
        return state;
    }
  };
};

export const reducerUtils = {
  initial: (data = null) => ({
    loading: false,
    data,
    error: null
  }),
  loading: (preveState = null) => ({
    data: preveState,
    loading: true,
    error: null
  }),
  success: data => ({
    data,
    loading: false,
    error: null
  }),
  error: error => ({
    data: null,
    loading: false,
    error
  })
};
