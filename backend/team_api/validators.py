from django.core.exceptions import ValidationError
import phonenumbers

def is_phone_valid(phone_number):
    try:
        phonenumbers.parse(phone_number, None)
    except:
        raise ValidationError('Phone number format is invalid')