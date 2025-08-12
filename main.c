#include <stdio.h>
int main() {
char name[100];
printf("請輸入你的名字: ");
scanf("%s", name);
printf("你好, %s!", name);
int age;
printf("請輸入你的年齡: ");
scanf("%d", &age);
printf("age: %d!", age);
return 0;
}
