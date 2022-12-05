from django.contrib import admin
from .models import Feeling, User, Log

# Register your models here.
admin.site.register(Feeling)
admin.site.register(User)
admin.site.register(Log)
