from rest_framework import serializers
from .models import subject
from faculty.models import Faculty

from semester.models import semester


def subject_type_validation(value):
    if value.lower() not in ["elective", "compulsory"]:
        raise serializers.ValidationError(
            "Subjects Type must be elective or compulsory")


class SubjectSerializer(serializers.ModelSerializer):
    syllabus = serializers.FileField(required=False)
    sub_type = serializers.CharField(max_length=255, validators=[
                                     subject_type_validation])
    faculty = serializers.SlugRelatedField(
        queryset=Faculty.objects.all(), slug_field="name")
    semester = serializers.SlugRelatedField(
        queryset=semester.objects.all(), slug_field="sem")

    class Meta:
        model = subject
        fields = ['sub_code', 'name', 'faculty', 'semester', 'implement_year',
                  'syllabus', 'sub_type', 'date_created', 'date_updated']
