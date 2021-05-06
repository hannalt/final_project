import React from 'react';
import "../AppDark.css";
const DarkMode = () => {
    let clickedClass = "clicked";
    const body = document.body;
    const lightTheme = "light";
    const darkTheme = "dark";
    let theme;
    if (localStorage) {
        theme = localStorage.getItem("theme");
    }
    if (theme === lightTheme || theme === darkTheme) {
        body.classList.add(theme);
      } else {
        body.classList.add(lightTheme);
      }

    const switchTheme = (e) => {
        if(theme === darkTheme) {
            body.classList.replace(darkTheme, lightTheme);
            e.target.classList.remove(clickedClass);
            localStorage.setItem("theme", "light");
            theme = lightTheme;
        } else {
            body.classList.replace(lightTheme, darkTheme);
            e.target.classList.remove(clickedClass);
            localStorage.setItem("theme", "dark");
            theme = darkTheme;
        }
    }

    console.log('here')

    return (
        <button
            className = {theme === "dark" ? clickedClass : ""}
            id= "darkMode"
            onClick = {(e) => switchTheme(e)}
        >Color Mode</button>
    )
};

export default DarkMode;