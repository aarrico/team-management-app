from django.core.exceptions import ValidationError
import phonenumbers

def is_phone_valid(phone_number):
    try:
        number = phonenumbers.parse(phone_number, None)
        if number.country_code != 1:
            raise ValidationError('Phone must be a valid US number') 
    except ValidationError as err:
        raise err