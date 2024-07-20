// sessionMiddleware.js
const sessionMiddleware = (store) => (next) => (action) => {
    const state = store.getState();
    const timestamp = state.auth.timestamp;
    const expireTime = 3600 * 1000; // 1 hour in milliseconds
  
    if (timestamp && Date.now() - timestamp > expireTime) {
      store.dispatch({ type: 'auth/clearUser' });
    }
  
    return next(action);
  };
  
  export default sessionMiddleware;
  