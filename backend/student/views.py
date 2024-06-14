from django.shortcuts import render
from .models import Students, UnverifiedStudent
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import StudentsSerializer, UnverifiedStudentsSerializer, LoginSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password, make_password
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def student_api(request):
    if request.method == 'GET':
        stuid = request.data.get('id')
        if stuid is not None:
            stu = Students.objects.get(pk=stuid)
            serializer = StudentsSerializer(stu)
            return Response(serializer.data)
        stu = Students.objects.all()
        serializer = StudentsSerializer(stu, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        print(request.data)
        Is_verified = request.data.get('Is_verified')

        # print(Is_verified)
        if Is_verified:
            stuid = request.data.get('id')
            try:
                stu = UnverifiedStudent.objects.get(pk=stuid)
                # unserializer = UnverifiedStudentsSerializer(stu)
            except UnverifiedStudent.DoesNotExist:
                return Response({'msg': 'Unverified student not found'}, status=404)

            stu.delete()  # Delete the unverified student

            serializer = StudentsSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                responseData = {
                    'msg': "Data is verified",
                    'data': stuid
                }
                return Response(responseData)
            return Response(serializer.errors, status=400)
        # return Response({'msg': 'Student is not verified'})
        data = request.data.copy()
        if data.get('Is_verified') == '':
            data['Is_verified'] = True
        if 'password' in data:
            data['password'] = make_password(data['password'])
            # print(data)
        serializer = StudentsSerializer(data=data, partial=True)
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            responseData = {
                'msg': "Data is Inserted",
                'data': serializer.data
            }
            return Response(responseData)
        return Response(serializer.errors, status=400)

    if request.method == 'PUT':
        stuid = request.data.get('id')
        stu = Students.objects.get(pk=stuid)
        serializer = StudentsSerializer(stu, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Student is Updated',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        id = request.data.get('id')
        stu = Students.objects.get(pk=id)
        stu.delete()
        responseData = {
            'msg': "Student data is deleted",
            'data': id
        }
        return Response(responseData)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def unverifiedstudent_api(request):
    if request.method == 'GET':
        stuid = request.data.get('id')
        if stuid is not None:
            stu = UnverifiedStudent.objects.get(pk=stuid)
            serializer = UnverifiedStudentsSerializer(stu)
            return Response(serializer.data)
        stu = UnverifiedStudent.objects.all()
        serializer = UnverifiedStudentsSerializer(stu, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        print(request.data)
        # Copy the data to avoid modifying the original request data
        data = request.data.copy()
        if 'password' in data:
            data['password'] = make_password(data['password'])
            print(data)
        serializer = UnverifiedStudentsSerializer(
            data=data, partial=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Data Inserted into Unverified Database',
                'data': serializer.data  # This contains the serialized data
            }
            return Response(response_data)
        return Response(serializer.errors, status=400)
    
    if request.method == 'PUT':
        stuid = request.data.get('id')
        stu = UnverifiedStudent.objects.get(pk=stuid)
        serializer = UnverifiedStudentsSerializer(stu, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'msg': 'Student is Updated',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        id = request.data.get('id')
        stu = UnverifiedStudent.objects.get(pk=id)
        stu.delete()
        responseData = {
            'msg': "Student data is deleted",
            'data': id
        }
        return Response(responseData)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def login_api(request):
    if request.method == 'POST':
        print(request.data)
        serializer = LoginSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            print(email, password)
            try:
                user = Students.objects.get(email=email)
                print(user)
                if check_password(password, user.password):
                    # request.session['user_id'] = user.id
                    refresh = RefreshToken.for_user(user)
                    response_data = {
                        'msg': 'Login Successful',
                        'data': {
                            'user_id': user.id,
                            'name': user.name,
                            'email': user.email,
                            'access_token': str(refresh.access_token),
                        }
                    }
                    return Response(response_data, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
            except Students.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
