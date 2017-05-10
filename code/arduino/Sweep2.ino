/* Sweep
 by BARRAGAN <http://barraganstudio.com>
 This example code is in the public domain.

 modified 8 Nov 2013
 by Scott Fitzgerald
 http://www.arduino.cc/en/Tutorial/Sweep
*/

#include <Servo.h>

//Servo myservo;  // create servo object to control a servo
Servo panServo;  // create servo object to control a servo
Servo tiltServo;  // create servo object to control a servo

// twelve servo objects can be created on most boards

//int pos = 0;
int panPos = 0;
int tiltPos = 0;

   // variable to store the servo position

void setup() {
  panServo.attach(9);  // attaches the servo on pin 9 to the servo object
  tiltServo.attach(10);  // attaches the servo on pin 10 to the servo object
}

void loop() {


  for (panPos = 0; panPos <=  ; panPos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    panServo.write(panPos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  for (panPos = 180; panPos >= 0; panPos -= 1) { // goes from 180 degrees to 0 degrees
    panServo.write(panPos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
 }


delay (2000);

 // tiltServo.write(pos); 

 for (tiltPos = 0; tiltPos <= 40; tiltPos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    tiltServo.write(tiltPos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  for (tiltPos = 180; tiltPos >= 0; tiltPos -= 1) { // goes from 180 degrees to 0 degrees
    tiltServo.write(tiltPos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }



}

/*
void loop() {
  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }


}

*/



