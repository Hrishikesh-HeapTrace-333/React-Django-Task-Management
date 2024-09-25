from rest_framework import serializers
from .models import Organization, User, Ticket, TicketInfo

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name'] 

class UserSerializer(serializers.ModelSerializer):
    organizations = OrganizationSerializer(many=True, read_only=True) 

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'organizations']

class TicketSerializer(serializers.ModelSerializer):
    assignee = UserSerializer(read_only=True) 
    assignedTo = UserSerializer(read_only=True, allow_null=True) 

    class Meta:
        model = Ticket
        fields = ['id', 'ticketName', 'assignee', 'assignedTo']

class TicketInfoSerializer(serializers.ModelSerializer):
    ticket = TicketSerializer(read_only=True)
    organization = OrganizationSerializer(read_only=True)

    class Meta:
        model = TicketInfo
        fields = [
            'id', 'ticket', 'organization', 'createdAt', 'updatedAt', 
            'description', 'priority', 'status', 'points', 'sprint', 'dueDate'
        ]
