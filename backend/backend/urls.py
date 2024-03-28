from django.urls import path, include

urlpatterns = [
    path('api/', include('team_api.urls'))
]
