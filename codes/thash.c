// C program to find GCD of two numbers 
#include <stdio.h> 

/*Complete this fuction to find GCD of two numbers*/
int gcd(int a, int b) 
{ 
	/*Write your code here*/
} 

/*Please do not change anything below this line*/
int main() 
{ 
	int a,b;
	scanf("%d%d",&a,&b);
	if(a < 0 || b < 0) {
		printf("-1\n");
		return 0;
	}
	printf("%d\n",gcd(a, b)); 
	return 0; 
} 
