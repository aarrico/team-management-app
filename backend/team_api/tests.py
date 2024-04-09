from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase
from .models import TeamMember
from .serializers import TeamMemberSerializer

member_no_role = {'first_name': 'Ash', 'last_name': 'Ketchum',
                  'phone': '+13107409999', 'email': 'ash@pkmn.com'}
member_with_role = {'first_name': 'Professor', 'last_name': 'Oak',
                    'phone': '+13107409998', 'email': 'oak@pkmn.com', 'role': 'admin'}
member_missing_required_field = {
    'first_name': 'Ash', 'phone': '+13107409999', 'email': 'ash@pkmn.com'}


class TeamMemberTests(TestCase):
    def setUp(self):
        self.default_role = TeamMember.objects.create(**member_no_role)

    def test_create_team_member(self):
        self.assertEqual(self.default_role.first_name, 'Ash')
        self.assertEqual(self.default_role.last_name, 'Ketchum')
        self.assertEqual(self.default_role.phone, '+13107409999')
        self.assertEqual(self.default_role.email, 'ash@pkmn.com')
        self.assertEqual(self.default_role.profile_pic_src, None)
        self.assertEqual(self.default_role.deleted_at, None)
        self.assertEqual(self.default_role.role, 'regular')


class TeamAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('member-list-create')

    def test_create_team_member_all_fields(self):
        response = self.client.post(
            self.create_url, member_with_role, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['first_name'],
                         member_with_role['first_name'])
        self.assertEqual(response.data['last_name'],
                         member_with_role['last_name'])
        self.assertEqual(response.data['email'], member_with_role['email'])
        self.assertEqual(response.data['phone'], member_with_role['phone'])
        self.assertEqual(response.data['role'], member_with_role['role'])
        self.assertEqual(response.data['profile_pic_src'], None)

    def test_retrieve_team_member(self):
        member = TeamMember.objects.create(**member_no_role)
        detail_url = reverse('member-get-update-delete', kwargs={'pk': member.id})
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, TeamMemberSerializer(member).data)
        
    def test_delete_team_member(self):
        member = TeamMember.objects.create(**member_no_role)
        delete_url = reverse('member-get-update-delete', kwargs={'pk': member.id})
        response = self.client.delete(delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_create_member_missing_field(self):
        response = self.client.post(self.create_url, member_missing_required_field, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('last_name', response.data)
        
