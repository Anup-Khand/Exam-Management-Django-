from django.shortcuts import render
from .models import attendance
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AttendanceSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def attendance_api(request):
    if request.method == 'GET':
        attid = request.data.get('attid')
        if attid is not None:
            att = attendance.objects.get(pk=attid)
            serializer = AttendanceSerializer(att)
            return Response(serializer.data)
        att = attendance.objects.all()
        serializers = AttendanceSerializer(att, many= True)
        return Response(serializers.data)
    if request.method == 'POST':
        serializer = AttendanceSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data created'})
        return Response(serializer.errors, status=400)
    if request.method == 'PUT':
        attid = request.data.get('attid')
        att = attendance.objects.get(pk=attid)
        serializer = AttendanceSerializer(att, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data updated'})
        return Response(serializer.errors, status=400)
    if request.method == 'DELETE':
        attid = request.data.get('attid')
        att = attendance.objects.get(pk=attid)
        att.delete()
        return Response({'msg': 'Data deleted'})
