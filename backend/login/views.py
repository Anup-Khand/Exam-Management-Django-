from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import User

@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def User_api(request):
    if request.method == 'GET':
        id = request.data.get('id')
        if id is not None:
            user = User.objects.get(pk=id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data created'})
        return Response(serializer.errors, status=400)
    if request.method == 'PUT':
        user = request.data.get('id')
        user = User.objects.get(pk=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data updated'})
        return Response(serializer.errors, status=400)
    if request.method == 'DELETE':
        user = request.data.get('id')
        user = User.objects.get(pk=id)
        user.delete()
        return Response({'msg': 'Data deleted'})

