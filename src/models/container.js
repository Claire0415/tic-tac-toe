
export default {

  namespace: 'con',

  state: {
    playerValue: 'x',// x or o
    record: [],
    step: 0,
    winner: '',
    history: ''
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
    // *isComplete() {

    // }
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
