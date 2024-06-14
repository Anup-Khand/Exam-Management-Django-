from rest_framework import serializers
from .models import Students, UnverifiedStudent

from Year.models import YearModel
from faculty.models import Faculty
from subject.models import subject
from semester.models import semester


class StudentsSerializer(serializers.ModelSerializer):
    Year = serializers.SlugRelatedField(
        queryset=YearModel.objects.all(),
        slug_field='Year'
    )
    semester = serializers.SlugRelatedField(
        queryset=semester.objects.all(),
        slug_field='sem'
    )
    faculty = serializers.SlugRelatedField(
        queryset=Faculty.objects.all(),
        slug_field='name'
    )
    Is_verified = serializers.BooleanField(required=False)

    # subject = serializers.SlugRelatedField(
    #     queryset=subject.objects.all(),
    #     slug_field="name"
    # )

    class Meta:
        model = Students
        fields = ['id', 'name', 'email', 'password', 'phone', 'address',
                  'Year',  'semester', 'faculty', 'gender', 'Is_verified']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('password', None)  # Remove the password field
        return representation


class UnverifiedStudentsSerializer(serializers.ModelSerializer):
    Year = serializers.SlugRelatedField(
        queryset=YearModel.objects.all(),
        slug_field='Year'
    )
    semester = serializers.SlugRelatedField(
        queryset=semester.objects.all(),
        slug_field='sem'
    )
    faculty = serializers.SlugRelatedField(
        queryset=Faculty.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = UnverifiedStudent
        fields = ['id', 'name', 'email', 'password', 'phone', 'address',
                  'Year', 'semester', 'faculty', 'gender', 'Is_verified']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=150)
    password = serializers.CharField(write_only=True)
