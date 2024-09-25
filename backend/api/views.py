from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Ticket, User, Organization, TicketInfo
from .serializers import UserSerializer, TicketSerializer, OrganizationSerializer, TicketInfoSerializer

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
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET','DELETE','PUT'])
def user_by_id(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = request.data['user']
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'message': 'User deleted successfully'}, status=204)
    
@api_view(['GET', 'POST'])
def ticket(request):
    if request.method == 'GET':
        tasks = Ticket.objects.all()
        serializer = TicketSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data['ticket']
        serializer = TicketSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@api_view(['GET', 'PUT', 'DELETE'])
def ticket_by_id(request, id):
    try:
        ticket = Ticket.objects.get(id=id)
    except Ticket.DoesNotExist:
        return JsonResponse({'error': 'Ticket not found'}, status=404)

    if request.method == 'GET':
        serializer = TicketSerializer(ticket)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = request.data['ticket']
        serializer = TicketSerializer(ticket, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        ticket.delete()
        return JsonResponse({'message': 'Ticket deleted successfully'}, status=204)
    
@api_view(['GET', 'POST'])
def org(request):
    if request.method == 'GET':
        tasks = Organization.objects.all()
        serializer = OrganizationSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data['organization']
        serializer = OrganizationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def org_by_id(request, id):
    try:
        org = Organization.objects.get(id=id)
    except Organization.DoesNotExist:
        return JsonResponse({'error': 'Organization not found'}, status=404)

    if request.method == 'GET':
        serializer = OrganizationSerializer(org)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = request.data['organization']
        serializer = OrganizationSerializer(org, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        org.delete()
        return JsonResponse({'message': 'Organization deleted successfully'}, status=204)
    
@api_view(['GET', 'POST'])
def ticket_info(request):
    try:
        ticketInfo = TicketInfo.objects.all()
    except Ticket.DoesNotExist:
        return JsonResponse({'error': 'Ticket not found'}, status=404)

    if request.method == 'GET':
        serializer = TicketInfoSerializer(ticketInfo, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data['ticketInfo']
        ticket = Ticket.objects.get(id=data['ticket'])
        if ticket.isAssigned:
            return JsonResponse({'error': 'Ticket is already assigned to another user.'}, status=400)
        
        serializer = TicketInfoSerializer(data=data)
        if serializer.is_valid():
            ticket.isAssigned = True
            ticket.save() 
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@api_view(['GET', 'PUT', 'DELETE'])
def ticket_info_by_id(request, id):
    try:
        ticket_info = TicketInfo.objects.get(id=id)
    except TicketInfo.DoesNotExist:
        return JsonResponse({'error': 'Ticket information not found'}, status=404)

    if request.method == 'GET':
        serializer = TicketInfoSerializer(ticket_info)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = request.data['ticketInfo']
        serializer = TicketInfoSerializer(ticket_info, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        ticket_info.delete()
        return JsonResponse({'message': 'Ticket information deleted successfully'}, status=204)