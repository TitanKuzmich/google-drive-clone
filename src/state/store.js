import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"

import app from 'state/reducers/app'
import folders from "state/reducers/folders"

const composeEnhancers = composeWithDevTools({
  name: "Template"
})

const reducer = combineReducers({
  app,
  folders
})


const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store