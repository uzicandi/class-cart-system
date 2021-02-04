import produce from 'immer';

// Promise에 기반한 Thunk를 만들어주는 함수
// redux-thunk 함수에서 param 받아와서 사용
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  // promiseCreator가 단 하나의 파라미터만 받는다는 전제하게 param 한 개. //#endregion
  // 여러 종류의 파라미터를 전달해야 하는 상황에서는 객체 타입으로 받으면 됨
  // ex: ({id: 1, text:'apple'})
  return param => async dispatch => {
    dispatch({ type }); // 요청이 시작됨
    try {
      const payload = await promiseCreator(param); // api 호출
      dispatch({
        type: SUCCESS, // 성공
        payload
      });
    } catch (error) {
      dispatch({
        type: ERROR, // 실패
        payload: error,
        error: true
      });
    }
  };
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어 줌
// type은 액션의 타입, key는 state의 key (예: product, cart)
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

// 리듀서에서 사용 할 수 있는 여러 유틸 함수
export const reducerUtils = {
  // 초기 상태. 초기 data 값은 null이지만 바꿀 수도 있음.
  initial: (data = null) => ({
    loading: false,
    data,
    error: null
  }),
  // 로딩중 상태. prevState의 경우엔 기본값은 null 이지만
  // 따로 값을 지정하면 null로 바꾸지 않고 다른 값을 유지시킬 수 있음.
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
