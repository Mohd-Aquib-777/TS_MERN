import React from 'react';
import ReactDOM from 'react-dom/client';

import {ShowName,Clock,ShowByCLass, ShowTimeByClass,Form, Toggle, Blog, FormClass,WelcomeDailog} from './Clock.js';
import {Calculator} from './TemporatureCalculter' 

import reportWebVitals from '../reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const root1 = ReactDOM.createRoot(document.getElementById('root1'));
const root2 = ReactDOM.createRoot(document.getElementById('root2'));
root.render(
  <React.StrictMode>
    <ShowName name="aquib" />
  </React.StrictMode>
);

function tick(){
  root1.render(
    <>
      <Clock />
    </>  
  )
}

setInterval(tick,1000)

root2.render(
  <React.StrictMode>
    
    <ShowByCLass name="shavez"/>
    </React.StrictMode>
)

const root3 = ReactDOM.createRoot(document.getElementById('root3'));
const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
root3.render(
  <>
   <ShowTimeByClass />
   <Form />
   <Toggle /> 
   <Blog posts= {posts} />
   <FormClass />
   <Calculator />
   <WelcomeDailog />
  </>
  
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
