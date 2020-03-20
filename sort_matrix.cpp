#include<bits/stdc++.h>
using namespace std;
int main(){
	int r,c,a[100][100];
	scanf("%d %d",&r,&c);
	for(int i=0;i<r;i++){
		for(int j=0;j<c;j++){
			scanf("%d",&a[i][j]);
		}
	}
	int temp[r*c],k=0;
	for(int i=0;i<r;i++){
		for(int j=0;j<c;j++){
			temp[k++]=a[i][j];
		}
	}
	sort(temp,temp+k);
	k=0;
	for(int i=0;i<r;i++){
		for(int j=0;j<c;j++){
			a[i][j]=temp[k++];
		}
	}
	for(int i=0;i<r;i++){
		for(int j=0;j<c;j++){
			printf("%d",a[i][j]);
		}
		printf("\n");
	}
}