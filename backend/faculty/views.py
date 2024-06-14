
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Faculty
from .serializers import FacultySerializer


@csrf_exempt
# Create your views here.
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def Faculty_Api(request):
    if request.method == "GET":
        id = request.data.get('id')
        if id is not None:
            fac = Faculty.objects.get(id=id)
            serializer = FacultySerializer(fac)
            return Response(serializer.data)

        fac = Faculty.objects.all()
        serializer = FacultySerializer(fac, many=True)
        return Response(serializer.data)

# ****************Insert Data**************
    if request.method == "POST":
        serializer = FacultySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Faculty is Inserted',
                'data': serializer.data
            }
            print(serializer.data)
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors)

# *************Update data*******************
    if request.method == "PUT":
        print(request.data)
        id = request.data.get('id')
        fac = Faculty.objects.get(pk=id)
        print("FC", fac)
        serializer = FacultySerializer(fac, data=request.data, partial=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Faculty is Updated',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors)

# ***************Delete data*******************

    if request.method == "DELETE":
        print(request.data)
        id = request.data.get("id")
        fac = Faculty.objects.get(pk=id)
        serializer = FacultySerializer(fac)
        fac.delete()
        response_data = {
            'msg': 'Faculty Deleted',
            'data': id
        }
        return Response(response_data, status=status.HTTP_200_OK)
