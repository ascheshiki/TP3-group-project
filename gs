#include <iostream>
#include <cmath>
#include <cstdlib>
#include <ctime>
#include <vector>
#include <fstream>

//c++ program to calculate simple poisson eqn in cylindrical coords

int main()
{
  using namespace std;

  ofstream outf("Sample.dat");

cout << "Enter the voltage of the plates: ";
  double v0 = 0;
 cin >> v0;

cout << "Enter the distance between the plates: ";
 double d = 0;
 cin >> d;

cout << "Enter the height of the plates: ";
  double h = 0;
cin >> h;

cout << "Enter the radius of the inner circle: ";
  int r = 0;
 cin >> r;

 double dx=1.0; //grid spacing
 double dy=1.0; //grid spacing

 double dt=0.1; //iteration step size
 double tmax=1000.0; //iteration stop point
 int tstep = tmax/dt; //number of iterations

 int xstep= d/dx;
 int ystep = h/dy;

 double u[xstep+2][ystep+2]; //multidimensional array
 double unew[xstep+2][ystep+2];

 //boundary conditions

 for (int j=0;j<(xstep+2);j++) {
   for (int k=0; k<(ystep+2);k++){
     if (j==0)
      {
        u[j][k]=v0;
        unew[j][k]=u[j][k];
      }
     else if (j==(xstep+1))
     {
	      u[j][k]=-v0;
	      unew[j][k]=u[j][k];
     }
     else if (k==0 || k == ystep+1)
  {
	//linearly decreasing at top and bottom
   	u[j][k] = v0-((double)2*v0*j/(xstep+1));
   	unew[j][k]=u[j][k];
  }
	      else
		{
		    u[j][k]=0;
		    unew[j][k]=u[j][k];
		}
}
  }

 //Loop through iterations
 for (int n=0; n<tstep;n++){

 for (int j=1; j<(xstep+1); j++){
   for (int k=1;k<(ystep+1);k++){

     //Inner circle zero
     if ((pow((k-0.5*(h+1)),2) + pow((j-0.5*(d+1)),2))< pow(r,2))
       unew[j][k]=0;

     else unew[j][k]=(0.25)*(unew[j-1][k] + u[j+1][k] + unew[j][k-1] + u[j][k+1]);

	    }
 }

for (int j=1; j<(xstep+1); j++){
   for (int k=1;k<(ystep+1);k++){
 u[j][k]=unew[j][k];
 }
 }
 }



  for ( int j = 0; j < xstep+2; j++ ) {
   for ( int k = 0; k < ystep+2; k++ ) {

     outf<< j<<" "<< k<< " "<<u[j][k] <<endl;
   }
   }

    return 0;
}

