
export default {

  namespace: 'con',

  state: {
    playerValue: 'x',// x or o
    chessArr: new Array(9).fill(null),
    record: [],
    count: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
        if (location.pathname === '/con') {
          dispatch({
            type: 'play'
          })
        }
      })
    },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
  },

  reducers: {
    play(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
