from django.contrib import admin
from .models import YearModel
# Register your models here.


@admin.register(YearModel)
class YearAdmin(admin.ModelAdmin):
    list_display = ['id', 'Year']
    search_fields = ['Year']
