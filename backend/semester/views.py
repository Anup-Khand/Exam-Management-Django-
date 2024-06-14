from django.shortcuts import render
from .models import semester
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SemesterSerializer
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def semester_api(request):
    if request.method == 'GET':
        id = request.data.get('id')
        if id is not None:
            sem = semester.objects.get(pk=id)
            serializer = SemesterSerializer(sem)
            return Response(serializer.data)
        sem = semester.objects.all()
        serializer = SemesterSerializer(sem, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = SemesterSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Semester is Inserted',
                'data': serializer.data
            }
            print(serializer.data)
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)
    if request.method == 'PUT':
        id = request.data.get('id')
        sem = semester.objects.get(pk=id)
        serializer = SemesterSerializer(sem, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Semester is Updated',
                'data': serializer.data
            }
            print(serializer.data)
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)
    if request.method == 'DELETE':
        id = request.data.get('id')
        sem = semester.objects.get(pk=id)
        sem.delete()
        response_data = {
            'msg': 'Semester Deleted',
            'data': id
        }
        return Response(response_data, status=status.HTTP_200_OK)
