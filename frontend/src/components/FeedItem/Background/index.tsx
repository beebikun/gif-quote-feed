import * as React from 'react';


export interface IProps {
  children: React.ReactNode;
}

const COLORS = [
  '#C62828', '#C51162', '#FF5722',
  '#D500F9', '#651FFF',
  '#304FFE', '#2196F3',
  '#00B8D4', '#00E5FF', '#C6FF00',
  '#00BFA5', '#00E676', '#78909C',
  '#64DD17', '#FFD600', '#546E7A',
  '#FFAB00', '#FF6D00', '#EF5350',
  '#EC407A', '#AA00FF', '#7C4DFF',
  '#673AB7', '#3F51B5', '#2962FF',
  '#40C4FF', '#00B0FF', '#4DD0E1',
  '#18FFFF', '#00838F', '#009688',
];

function getColor() {
  return COLORS[getRandom({ min: 0, max: COLORS.length - 1 })];
}


function getRandom({min, max}: { min: number, max: number }): number {
  return Math.floor(Math.random() * (max - min) ) + min;
}


export default function Background({ children }: IProps) {
  const bg = getColor();

  return (
    <div className='Item' style={ { backgroundColor: bg } } >
      <div className='Item__content'>
        { children }
      </div>
    </div>
  );
}