from django.urls import path
from team_api.views import TeamMemberListCreate

urlpatterns = [
    path('team/', TeamMemberListCreate.as_view()),
]
