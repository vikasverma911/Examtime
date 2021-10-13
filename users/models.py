from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
   is_student = models.BooleanField()
   is_teacher = models.BooleanField()

   def __str__(self):
       return self.username

class Student(models.Model):
   user = models.OneToOneField(User,on_delete=models.CASCADE)
   
   # need to add class,section,ranking
   def __str__(self):
      return self.user.username

