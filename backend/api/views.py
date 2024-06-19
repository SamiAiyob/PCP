from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from .serializer import *
import jwt, datetime

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProgrammerViewSet(viewsets.ModelViewSet):
    queryset = Programmer.objects.all()
    serializer_class = ProgrammerSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        #print(data)
        user_data = {
                    'name':data['user.name'],
                     'email':data['user.email'],
                     'password':data['user.password']}

        if not user_data:
            return Response({"error": "User data is required"}, status=status.HTTP_400_BAD_REQUEST)


        programmer_data = data
        #print(programmer_data)

        category_id = programmer_data['category_id']

        if category_id:
            try:
                category = Category.objects.get(pk=category_id)
                #programmer_data['categories'] = category
            except Category.DoesNotExist:
                return Response({"error": "Category not found"}, status=status.HTTP_400_BAD_REQUEST)

        programmer_serializer = ProgrammerSerializer(data=programmer_data)
        programmer_serializer.is_valid(raise_exception=True)
        programmer = programmer_serializer.save()

        category_name = category.name.lower()
        if category_name == 'webdeveloper':
            WebDeveloper.objects.create(programmer=programmer)
        elif category_name == 'backenddeveloper':
            BackEndDeveloper.objects.create(programmer=programmer)
        elif category_name == 'networking':
            Networking.objects.create(programmer=programmer)
        elif category_name == 'ai/machinelearning':
            MachineLearning.objects.create(programmer=programmer)
        elif category_name == 'cloudservices':
            CloudServices.objects.create(programmer=programmer)
        elif category_name == 'admin/customersupport':
            AdminCustomerSupport.objects.create(programmer=programmer)

        return Response(programmer_serializer.data, status=status.HTTP_201_CREATED)


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def create(self, request, *args, **kwargs):
        data = request.data # Convert QueryDict to mutable dictionary

        user_data = {
                    'name':data['user.name'],
                     'email':data['user.email'],
                     'password':data['user.password']}

        if not user_data:
            return Response({"error": "User data is required"}, status=status.HTTP_400_BAD_REQUEST)

        client_data = data
        

        client_serializer = ClientSerializer(data=client_data)
        client_serializer.is_valid(raise_exception=True)
        client = client_serializer.save()

        return Response(client_serializer.data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        user_type = 'client' if hasattr(user, 'client') else 'programmer'


        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {'jwt': token,
                         'user_type': user_type,
                         'user_id': user.id }

        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {'message': 'success logout'}
        return response