# JM: this script includes a one-dimensional table that
# numpy will interpolate. This script is loaded by 
# servo-degreepositionnotessel.js
import sys
import numpy as np

# format: {input grid coord : measured turret position}
x_association = {
    0.:.35,
    15.:.498
    }

y_association = {
    0.:.21,
    10.:.0610
    }

gridMeasX, turretMeasX = zip(*sorted(x_association.items()))
gridMeasY, turretMeasY = zip(*sorted(y_association.items()))



#gridTargetX = 0.
#gridTargetY = 5.

def main():
    gridTargetX = float(sys.argv[1])
    gridTargetY = float(sys.argv[2])
    
    turrentTargetX = np.interp(gridTargetX,gridMeasX,turretMeasX)
    turrentTargetY = np.interp(gridTargetY,gridMeasY,turretMeasY)
    interp_position = str('(' + str(turrentTargetX) + ',' + str(turrentTargetY) + ')')
    sys.stdout.write(interp_position)
    sys.stdout.flush()
    sys.exit(0)
    return interp_position

if __name__ == '__main__':
    main()