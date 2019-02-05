#include<stdio.h>
void DFS(int);
int G[10][10],visited[10],v,e,coun=0;    //n is no of vertices and graph is sorted in array G[10][10]
 
void main()
{
    int i,j,s,t,a;
    //printf("Enter number of vertices:");
   
	 scanf("%d%d",&v,&e);
 
    //read the adjecency matrix
	 //printf("\nEnter adjecency matrix of the graph:");
   
	for(i=0;i<e;i++){
       scanf("%d%d",&s,&t);
       G[s-1][t-1]=1;
       G[t-1][s-1]=1;
    }
    scanf("%d",&a);
    //visited is initialized to zero

   for(i=0;i<v;i++)
        visited[i]=0;
 
    DFS(a-1);
    printf("%d\n",coun+1);

}
 
void DFS(int i)
{
  int j;
  coun++;
	// printf("\n%d",i);
    visited[i]=1;
	
	for(j=0;j<v;j++)
       if(!visited[j] && G[i][j]==1)
            DFS(j);
}