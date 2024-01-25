import React from 'react';
import LoadingImage  from '../../assets/images/loader-2_food.gif';
const Loading = () => {
  return (
    <div style={{width:"100%",height:"60vh",display:'flex',alignItems:"center",justifyContent:"center",flexDirection:"column"}}>

<img src={LoadingImage} width={300}  alt="Loading..."/>
  <h4>Loading...</h4>
    </div>
  )
}

export default Loading;