from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class ProgrammerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    profile_picture = serializers.ImageField(max_length=None, use_url=True, required=False)
    categories = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='categories', write_only=True
    )

    class Meta:
        model = Programmer
        fields = ['user', 'phone_number', 'address', 'experience', 'rate', 'categories', 'category_id', 'skills', 'bio', 'profile_picture', 'cv']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        validated_data['user'] = user
        return super().create(validated_data)

class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    profile_picture = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Client
        fields = ['user', 'phone_number', 'address', 'bio', 'profile_picture']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        validated_data['user'] = user
        return super().create(validated_data)

class WebDeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebDeveloper
        fields = '__all__'

class BackEndDeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackEndDeveloper
        fields = '__all__'

class NetworkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Networking
        fields = '__all__'

class MachineLearningSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineLearning
        fields = '__all__'

class CloudServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CloudServices
        fields = '__all__'

class AdminCustomerSupportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminCustomerSupport
        fields = '__all__'