from django.urls import path
from .views import TeamMembersListCreate, TeamMemberGetUpdateDelete

urlpatterns = [
    path('team/', TeamMembersListCreate.as_view()),
    path('team/<str:pk>', TeamMemberGetUpdateDelete.as_view())
]
