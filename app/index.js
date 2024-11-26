import React from 'react'
import { Redirect } from 'expo-router'


const index = () => {
  return (
    // <Redirect href="/(authenticate)/login"/>  //redirects the user to different route.
//    <Redirect href="/(home)"/>
   <Redirect href="/start"/>
//    <Redirect href="/profile"/>
  )
}

export default index;