#include<bits/stdc++.h>
using namespace std;

int main(){
	int n,ans=1;
	cin>>n;
	for(int i=0;i<n;i++){
		ans*=8;
	}
	cout<<ans%10;
	return 0;
}