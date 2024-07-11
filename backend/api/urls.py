from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'api/categories', CategoryViewSet)
router.register(r'api/programmers', ProgrammerViewSet, basename='programmer')
router.register(r'api/clients', ClientViewSet, basename='client')

urlpatterns = [
    path("api", include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/user/', UserView.as_view(), name='user'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/public-search/', PublicProgrammerSearchView.as_view(), name='public-programmer-search'),
]
