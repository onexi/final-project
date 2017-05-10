# JM: this script includes a one-dimensional table that
# numpy will interpolate. This script is loaded by 
# servo-degreepositionnotessel.js
import sys
import numpy as np

# format: {input position : measured degree}
theassociation = {
	0: 21,
	5: 27,
	10: 35
}
#xp = [21,27,35]
#fp = [0,5,10]

fp, xp = zip(*sorted(theassociation.items()))

#print 'degrees', xp
#print 'positions', fp

def main():
	degree = sys.argv[1]
	#print 'degree targ:', degree
	#print 'interp pos:', np.interp(int(degree),xp,fp)/100
	interp_position = np.interp(int(degree),xp,fp)/100
	sys.stdout.write(str(interp_position))
	sys.stdout.flush()
	sys.exit(0)
	return interp_position

if __name__ == '__main__':
	main()