from rest_framework import serializers
from .models import semester


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = semester
        fields = ['id', 'sem']
