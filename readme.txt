1.001 Project README
By: Jonathan Miller
Project: Angel Eye

OVERVIEW
========

“Angel Eye” is a ‘roadway guardian’ system that watches street intersections (via camera) and broadcasts just-in-time alerts to road users to mitigate collisions or to otherwise enhance situational awareness.

I wanted to build the hardware output component. This project involved the construction of a two-axis servo gimbal that is controlled by a Tessel board. The Tessel receives commands from a remote user or script to point a laser pointer toward an intended area, e.g. the upper left corner of a projection screen.

The remote user/script issues a command for the gimbal to point at a specific (x, y) coordinate on a street intersection (or, for demo purposes, a projection screen). Then the system interpolates the coordinates and translates the coordinates into two-axis positional data to feed to the horizontal, (x), and vertical, (y), servos, respectively.


LIBRARIES REQUIRED
==================
pre-installed with Arduino:
	servo.h
install via npm:
    tessel (JavaScript)
    servo-pc9685 (JavaScript)
install via pip:
    scipy (Python)
    numpy (Python)


HARDWARE REQUIRED
=================
1 Tessel board
1 Tessel servo board
2 medium-duty servos (must be able to reliably move with ~2 pounds' payload)
1 laser pointer
1 projector
assorted clamps and fixtures
1 mini USB cable
1 laptop (as control unit)


CHALLENGES AND REFLECTIONS
==========================

Hardware was hard for me
------------------------
This is my first hardware project. I never used Arduinos or Tessels before. I started with Arduino and made decent progress but got held back in making the Arduino interface with a remote server. Bruce suggested I try a Tessel, which enabled me to program in JavaScript, to make use of the onboard WiFi chip, and to use a separate servo board to manage power load on the hardware. (I had no idea such things were an issue so thank goodness I had some ‘adult supervision’!)

Managing trigonometry and map projections
-----------------------------------------
It took me much trial and error to figure out how to make a 'pixel grid' on a projection screen and associate those coordinates with x and y servo signals. I succeeded, but it's much clunkier and less accurate right now than I hoped.

'Black Box' Scope
------------------------
My project felt like it suffered from reasonable (on paper) scope but seemingly simple tasks, like correlating servo input to degree output, were incredibly time consuming.

The items in my scope were like a black box, in which I had to wade much deeper into programming concepts and mathematics than I anticipated to complete basic elements of what I originally hoped to achieve.

