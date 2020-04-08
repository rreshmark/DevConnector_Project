import {createStore, applyMiddleware,compose} from 'redux';
//compose lib is used while we have more enhancemnets needed
import thunk from 'redux-thunk';
import rootReducer from './reducers'
//rootReducer is a name given to the combinereducer function and as it is in the index file which is the starting point,we need not specify like  './reducers/index.js'


const middleware=[thunk];
const store= createStore(
    rootReducer,
  //() => [],
  //defining reducers as array
   {},
   //preloadedstate
   compose(
   applyMiddleware(...middleware),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )
);

export default store;
   //here is where the enhancements gets applied..
   //spread the current data in the store and thunk it
   // ... refers to spread operator refer video 3/29 34:00.The idea of the spread operator is to make a copy of the existing data e.g arr[1,2,3,4] after spreading it if we want to add 6 to it we can do it like  ...arr,6 [1,2,3,4,6]. wecan delete too.
