from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer

@api_view(['GET', 'POST'])  
def user(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data['user']
        users = User.objects.all()
        serializer = UserSerializer(data=data)
        for user in users:
            if user.email == data['email'] and serializer.is_valid():
                return JsonResponse(serializer.data, status=200)
        print("data: ", data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
