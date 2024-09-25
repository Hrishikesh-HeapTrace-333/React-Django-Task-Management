import jwt
import requests
import logging
from django.http import JsonResponse
from django.conf import settings

logger = logging.getLogger(__name__)

class TokenCheckMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header:
            try:
                token = auth_header.split(' ')[1]  # Assumes 'Bearer <token>'
                payload = self.decode_token(token)
                if payload is None:
                    return JsonResponse({'error': 'Invalid token'}, status=401)
                request.user = payload  # Attach user payload to the request
            except IndexError:
                return JsonResponse({'error': 'Invalid authorization header format. Expected: Bearer <token>'}, status=401)

        response = self.get_response(request)
        return response

    def decode_token(self, token):
        try:
            jwks_url = "https://hrishikesh-ht333.eu.auth0.com/.well-known/jwks.json"
            jwks = requests.get(jwks_url).json()
            rsa_key = {}

            for key in jwks['keys']:
                if key['kid'] == jwt.get_unverified_header(token)['kid']:
                    rsa_key = {
                        'kty': key['kty'],
                        'kid': key['kid'],
                        'use': key['use'],
                        'n': key['n'],
                        'e': key['e'],
                    }
                    logger.info("RSA Key found: %s", rsa_key)
                    break
            
            if not rsa_key:
                logger.warning("No RSA key found for the given token kid")
                return None
            
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=['RS256'],
                audience="https://hrishikesh-ht333.eu.auth0.com/api/v2/",  
                issuer="https://hrishikesh-ht333.eu.auth0.com//"
            )
            return payload

        except jwt.ExpiredSignatureError:
            logger.error("Token expired")
            return None
        except jwt.InvalidTokenError as e:
            logger.error("Invalid token error: %s", str(e))
            return None
        except Exception as e:
            logger.error("Error decoding token: %s", str(e))
            return None
