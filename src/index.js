import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleWare from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import { tempSetUser } from "./modules/user";
import { HelmetProvider } from "react-helmet-async";
const sagaMiddleware = createSagaMiddleWare();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// local Stroage에 저장된 user 불러와 "" 제거
function loadUser() {
   try {
      const user = localStorage.getItem("user");
      if (!user) return;
      console.log("localuser is : ", user);
      const _id = user.toString().replace(/"/g, "");
      store.dispatch(tempSetUser(_id));
   } catch (e) {
      console.log("Storage is not working");
   }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <HashRouter>
            <HelmetProvider>
               <App />
            </HelmetProvider>
         </HashRouter>
      </Provider>
   </React.StrictMode>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
