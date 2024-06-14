from rest_framework import serializers
from .models import YearModel


class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model = YearModel
        fields = ['id', 'Year']
