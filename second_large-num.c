#include <stdio.h>

int main()
{
    int n;
    scanf("%d",&n);
    int a=-1,b=-1;
    while(n){
        int t=n%10;
        if(a<t){
            if(b<a){
                b=a;
            }
            a=t;
        }else if(a>t&&b<t){
            b=t;
        }
        n/=10;
        
    }
    printf("%d",b);
}
/*Input:
  1234
  Output:
  Second largest number:3/*
