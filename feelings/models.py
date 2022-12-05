from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime

# Create your models here.

class User(AbstractUser):
    pass

class Feeling(models.Model):
    category = models.TextField()
    feeling = models.TextField()

    def __str__(self):
        return self.feeling

class Log(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE,default='admin',)
    feeling = models.ForeignKey('Feeling', on_delete=models.CASCADE,)
    date = models.DateField(default = datetime.date.today)
   


