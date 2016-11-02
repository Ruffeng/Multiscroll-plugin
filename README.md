# Multiscroll Plugin
This plugin adds the funcion long scrolling + split screen in ReactJs.
To see a live example you can go [here](https://reactplugin.herokuapp.com/)


# Installing

1. Clone the repo
2. `npm install -g gulp` to install Gulp globally.
3. `npm install` to resolve project dependencies.

# Using

Run `npm start` from the command line and you are good to go!

The project is currently setup to transpile code under the _/src_ folder using the _/src/app.js_ file as an entry point.

Our resulting code ends up in the `public` directory.


# How does it work?
You must import the plugin with:
```
import Multigroup from 'multigroup';
```

The on your app you must create this structure:
```
<MultiGroup >
    <multiScroll>
        <leftSide>
              // Page1: Content Left here
        </leftSide>
        <rightSide>
              //page1: Content Right here
        </rightSide>
    </multiScroll>
    <multiScroll>
        <leftSide>
              // Page2: Content Left here
        </leftSide>
        <rightSide>
              // Page2: Content Right here
        </rightSide>
    </multiScroll>
</MultiGroup>
```

As you can see, everything is grouped with ``` <Multigroup>``` tag. **Be aware that Multigroup is the only tag which is capitalized, the rest are first letter downcase.**

Each page is a ```<multiscroll>``` tag. Inside it, you just specify the ```<leftside>``` to put the content on the left div, and ```<rightside>``` to put the content on the rightside. That's it!

## Set up animation time
To set up the animation time you can add the option```animTime on  ```<MultiScroll>``` tag. You can add a float number, so for example it could be something like ```<MultiScroll animTime={1.5} ```. The hashes are necessary to store a float number there.

IF you leave empty, by default will be 3.0 seconds.


## Set up background color
Also, you can specify a default background color for an specific slide. To do that, you have the ```bgColor```. You must put this option on ```<multiScroll>```option.

Example: ```<multiScroll bgColor="#ededed" > ```. It's important to specify the # symbol and put inside quotes.

## Special thanks
I took a boilerplate  browserify + gulp + react + additional items that has been created by [@Caike](https://github.com/caike) and [@Sergiocruz](https://github.com/sergiocruz) ( both from Codeschool). I save up some time thanks to their configuration.

The jellyfish picture has been taken by [@danist07](https://unsplash.com/@danist07).

The building picture has been taken by [@aleccutter](https://unsplash.com/@aleccutter)

Follow me on [github](https://github.com/Ruffeng)
