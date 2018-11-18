import * as React from 'react';

import './index.css';

// import { ButtonAdd } from 'containers/Buttons';

export interface IProps {
  itemId: string;
}

// <div className='Item__btns'>
//           <div className='Button Button--refresh' />
//           <div className='Button Button--edit' />
//           <div className='Button Button--decline' />
//           <div className='Button Button--accept' />
//           <div className='Button Button--star' />
//           <div className='Button Button--star-filled' />
//         </div>

function ButtonRefresh() {
  return (<div className='Button Button--refresh' onClick={ handleClick } />);

  function handleClick() {
    console.log('refresh');
  }
}


function ButtonAdd() {
  return (<div className='Button Button--star' onClick={ handleClick } />);

  function handleClick() {
    console.log('star');
  }
}

export default function Buttons(props: IProps) {
  return (
    <div className='Item__btns'>
      <ButtonRefresh />
      <ButtonAdd />
    </div>
  );
}
