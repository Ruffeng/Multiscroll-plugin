// multiScroll.ReactJs by Ruffeng
// https://wwww.github.com/Ruffeng/Multiscroll-plugin

import React from 'react';
import ReactDOM from 'react-dom';
import MultiGroup from './components/multigroup';
import Pages from './components/pagesexample';

// option animTime to set the time transation between slides. If you don't define, by default will be 3.0
// on a <multiscroll> you can define the prop bgColor with an hexadecimal value and it will render automatically.
// E.g: <multiscroll bgColor=#dfedfe>
//
// Pages component is just for the example, you can get rid of.
// Be aware that the only capitalized word is Multigroup. The rest are all in lowercase
// This example has made to center the text. Remember to remove the examples section on css file
// Enjoy :)


  ReactDOM.render(
       <MultiGroup animTime={1.5}>

          <multiScroll>
            <leftSide>
              <Pages pg="1" side="left" />
            </leftSide>
            <rightSide>
              <Pages pg="1" side="right" />
            </rightSide>
          </multiScroll>

          <multiScroll >
            <leftSide>
              <Pages pg="2" side="left" />

            </leftSide>
            <rightSide>
              <Pages pg="2" side="right" />
            </rightSide>
          </multiScroll>

          <multiScroll >
            <leftSide>
               <Pages pg="3" side="left" />
            </leftSide>
            <rightSide>

            </rightSide>
          </multiScroll>
       </MultiGroup>

    ,
    document.getElementById('app')
  );

