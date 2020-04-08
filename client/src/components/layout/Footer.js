//we are using "rfc" and hit enter.. the below piece of code gets added
//embedding html inside js code is called JSX javascriptextensions
//while dealing with JSX we need to use className instead of class in html because js can assume that as class which is used to create blueprint..but in html it is used for styling.
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
    Copyright &copy; {new Date().getFullYear()} Dev Connector
  </footer>
  )
}
//working.. index.html calls App.js and in App.js we have written 3 compnents nav,landing and footer ..so when it comes to the nav bar file..there is a render function which gives back the html content likewise for landing and in footer  it returns the footer content back.g
