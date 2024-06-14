from django.shortcuts import render
from .models import Leave
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import LeaveSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def Leave_api(request):
    if request.method == 'GET':
        leaveid = request.data.get('leaveid')
        if leaveid is not None:
            leave = Leave.objects.get(pk=leaveid)
            serializer = LeaveSerializer(leave)
            return Response(serializer.data)
        leave = Leave.objects.all()
        serializer = LeaveSerializer(leave, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = LeaveSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data created'})
        return Response(serializer.errors, status=400)
    if request.method == 'PUT':
        leaveid = request.data.get('leaveid')
        leave = Leave.objects.get(pk=leaveid)
        serializer = LeaveSerializer(leave, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data updated'})
        return Response(serializer.errors, status=400)
    if request.method == 'DELETE':
        leaveid = request.data.get('leaveid')
        leave = Leave.objects.get(pk=leaveid)
        leave.delete()
        return Response({'msg': 'Data deleted'})