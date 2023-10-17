#include <stdio.h>
void * fun(int p10[],int key[]);
 int main()
{
    int plaintext[] = {0,0,1,1,0,1,1,0};
    int key[]={0,0,1,0,0,1,0,1,1,1};
    int P10[] = {3,5,2,7,4,10,1,9,8,6};
	int		  P8[] = {6,3,7,4,8,5,10,9};
	int		  P4[] = {2,4,3,1};
	int		  EP[] = {4,1,2,3,2,3,4,1};
	int		  IP[] = {2,6,3,1,4,8,5,7};
    int       IPinverse[] = {4,1,3,5,7,2,8,6};


    int S0[4][4]  = {{01,00,11,10},{11,10,01,00},{00,10,01,11},{11,01,11,10}};
	int	S1[4][4] = {{00,01,10,11},{10,00,01,11},{11,00,01,00},{10,01,00,11}};
    

   fun(P10,key);

}

void * fun(int p10[],int key[])
{
     for (size_t i = 0; i < 10; i++)
     {
       p10[i] = key[p10[i]-1];  
       printf("%d",p10[i]);
     }

     

     int part1[5];
     int part2[5];

      printf("\n");
     for (size_t m = 0; m < 5; m++)
     {
        part1[m]=p10[m];
        printf("%d",part1[m]);
     }
     printf("\n");
     for (size_t n = 0; n < 5; n++)
     {
        part2[n]=p10[5+n];
         printf("%d",part2[n]);
     }

     //for 1st 5 bit shifting by 1bit
     int tempfor5bit;
     tempfor5bit = part1[4];
     part1[4]=part1[0];
     part1[0]=tempfor5bit;

     tempfor5bit = part2[4];
     part2[0]=part2[1];
      part2[1]=part2[2];
       part2[2]=part2[3];
       part2[3]=part2[4];
       part2[4]=tempfor5bit;
    
    printf("\n\n");
     for (size_t n = 0; n < 5; n++)
     {
         printf("%d",part1[n]);
     }
     printf("\n");
     for (size_t n = 0; n < 5; n++)
     {
         printf("%d",part2[n]);
     }
     

      for (size_t i = 0; i < 10; i++)
     {
       p10[i] = key[p10[i]-1];  
       printf("%d",p10[i]);
     }

      


     
     return 0;


     
}

