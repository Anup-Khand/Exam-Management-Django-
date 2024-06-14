from django.shortcuts import render
from .models import subject
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SubjectSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

# Create your views here.


@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def subject_api(request):
    if request.method == 'GET':
        sub_code = request.data.get('sub_code')
        if sub_code is not None:
            sub = subject.objects.get(pk=sub_code)
            serializer = SubjectSerializer(sub)
            return Response(serializer.data)
        sub = subject.objects.all()
        serializer = SubjectSerializer(sub, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        print("This is from client", request.data)
        # Create a mutable copy of request.data
        data = request.data.copy()

        # Check if 'syllabus' is in data and is 'null'
        if data.get('syllabus') == 'null':
            data.pop('syllabus')
        serializer = SubjectSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Subject is Inserted',
                'data': serializer.data
            }
            print(serializer.data)
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)
    if request.method == 'PUT':
        print(request.data)
        sub_code = request.data.get('sub_code')
        try:
            sub = subject.objects.get(pk=sub_code)
        except subject.DoesNotExist:
            return Response({'error': 'Subject not found'}, status=status.HTTP_404_NOT_FOUND)
        data = request.data.copy()
        if 'syllabus' in request.FILES:
            # Delete the old file if a new file is provided
            if sub.syllabus:
                sub.syllabus.delete()
        # Update the syllabus with the new file
            data['syllabus'] = request.FILES['syllabus']
        elif 'syllabus' in data and isinstance(data['syllabus'], str):
            # If the syllabus is a URL (string), remove it from the request data to prevent it from being treated as a new file upload
            data.pop('syllabus')
        serializer = SubjectSerializer(sub, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Subject is Updated',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)
    if request.method == 'DELETE':
        print(request.data)
        sub_code = request.data.get('sub_code')
        sub = subject.objects.get(pk=sub_code)
        sub.delete()
        response_data = {
            'msg': 'Subject Deleted',
            'data': sub_code
        }
        return Response(response_data, status=status.HTTP_200_OK)
