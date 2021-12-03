import React, { useEffect, useState } from 'react';
import Platform from './Platform.js';

function PlatformItems({ currentItems }) {
  useEffect(()=>{

  }, [currentItems])
  console.log("currentitems", currentItems)
  return (
    <>
      <Platform platforms={currentItems} row={true}/>
    </>
  );
}

export default PlatformItems