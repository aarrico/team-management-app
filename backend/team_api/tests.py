from django.test import TestCase
from .models import TeamMember

class TeamMemberTests(TestCase):
    def setUp(self):
        self.sample = TeamMember.objects.create(first_name="Ash", last_name="Ketchum", phone="+13107409999", email="ash@pkmn.com")
        
    def test_create_team_member(self):
        self.assertEqual(self.sample.first_name, "Ash")
        self.assertEqual(self.sample.last_name, "Ketchum")
        self.assertEqual(self.sample.phone, "+13107409999")
        self.assertEqual(self.sample.email, "ash@pkmn.com")
        self.assertEqual(self.sample.profile_pic_src, None)
        self.assertEqual(self.sample.deleted_at, None)