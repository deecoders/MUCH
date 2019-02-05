#include<stdio.h>
int main(){
    //freopen("in_10","r",stdin);
    //freopen("out_10","w",stdout);
    int n,i;
    scanf("%d",&n);
    int arr[n];
    for(i=0;i<n;i++){
      scanf("%d",&arr[i]);
    }
    int freq[100001]={0};
    for(i=0;i<n;i++){
      freq[arr[i]]++;
    }
    int maxi=-1;
    for(i=1;i<=100000;i++){
      if(freq[i]>maxi){
        maxi=freq[i];
      }
    }
    for(i=1;i<=100000;i++){
      if(freq[i]==maxi)
      printf("%d ",i);
    }
    return 0;
}
