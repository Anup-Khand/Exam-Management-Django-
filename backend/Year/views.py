
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status

from .models import YearModel
from .serializers import YearSerializer


@csrf_exempt
# Create your views here.
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def Year_Api(request):
    if request.method == "GET":
        print(request.data)
        fac = YearModel.objects.all()
        serializer = YearSerializer(fac, many=True)
        return Response(serializer.data)
        # id = request.data.get('id')
        # if id is not None:
        #     fac = YearModel.objects.get(id=id)
        #     serializer = YearSerializer(fac)
        #     return Response(serializer.data)


# ****************Insert Data**************
    if request.method == "POST":
        serializer = YearSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Year is Inserted',
                'data': serializer.data
            }
            print(serializer.data)
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors)

# *************Update data*******************
    if request.method == "PUT":
        print(request.data)
        id = request.data.get('id')
        fac = YearModel.objects.get(pk=id)
        serializer = YearSerializer(fac, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Year is Updated',
                'data': serializer.data
            }
            print(serializer.data)
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors)

# ***************Delete data*******************

    if request.method == "DELETE":
        print(request.data)
        id = request.data.get("id")
        fac = YearModel.objects.get(pk=id)
        fac.delete()
        response_data = {
            'msg': 'Year Deleted',
            'data': id
        }
        return Response(response_data, status=status.HTTP_200_OK)
