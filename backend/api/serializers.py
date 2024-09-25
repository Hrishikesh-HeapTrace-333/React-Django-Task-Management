from django.utils import timezone
from rest_framework import serializers
from .models import Organization, User, Ticket, TicketInfo

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name'] 

class UserSerializer(serializers.ModelSerializer):
    organizations = serializers.PrimaryKeyRelatedField(many=True, queryset=Organization.objects.all()) 
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'organizations']
        
    def __init__(self, *args, **kwargs):
        partial = kwargs.pop('partial', False)  
        super().__init__(*args, **kwargs)
        
        if partial:  
            self.fields['email'].required = False 
            self.fields['organizations'].required = False  

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)

        organizations = validated_data.get('organizations', None)
        if organizations is not None:
            instance.organizations.set(organizations)  # Use the list of organization IDs directly

        instance.save()
        return instance
class TicketSerializer(serializers.ModelSerializer):
    assignee = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    organization = serializers.PrimaryKeyRelatedField(queryset=Organization.objects.all()) 

    class Meta:
        model = Ticket
        fields = ['id', 'ticketName', 'points', 'description', 'assignee', 'organization', 'createdAt', 'updatedAt', 'sprint', 'isAssigned']

    def validate(self, data):
        if 'assignee' in data:
            try:
                User.objects.get(id=data['assignee'].id) 
            except User.DoesNotExist:
                raise serializers.ValidationError('Assignee not found')

        if 'organization' in data:
            try:
                Organization.objects.get(id=data['organization'].id) 
            except Organization.DoesNotExist:
                raise serializers.ValidationError('Organization not found')
        return data
    
    def __init__(self, *args, **kwargs):
        partial = kwargs.pop('partial', False)  
        super().__init__(*args, **kwargs)
        
        if partial:  
            self.fields['assignee'].required = False 
            self.fields['organization'].required = False  
            self.fields['ticketName'].required = False  

    def update(self, instance, validated_data):
        instance.ticketName = validated_data.get('ticketName', instance.ticketName)
        instance.points = validated_data.get('points', instance.points)
        instance.description = validated_data.get('description', instance.description)
        instance.assignee = validated_data.get('assignee', instance.assignee)
        instance.organization = validated_data.get('organization', instance.organization)
        instance.sprint = validated_data.get('sprint', instance.sprint)
        instance.save()
        return instance

class TicketInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketInfo
        fields = [
            'id', 'ticket', 'assignedTo', 'priority', 'status', 'dueDate',
            'created_to_in_progress_at', 'in_progress_to_done_at'
        ]
        
    def __init__(self, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        super().__init__(*args, **kwargs)

        if partial:
            self.fields['assignedTo'].required = False
            self.fields['priority'].required = False
            self.fields['dueDate'].required = False

    def update(self, instance, validated_data):
        previous_status = instance.status  
        
        instance.ticket = validated_data.get('ticket', instance.ticket)
        instance.assignedTo = validated_data.get('assignedTo', instance.assignedTo)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.dueDate = validated_data.get('dueDate', instance.dueDate)
        
        instance.status = validated_data.get('status', instance.status)

        if previous_status == 'created' and instance.status == 'in-progress':
            instance.created_to_in_progress_at = timezone.now()
        elif previous_status == 'in-progress' and instance.status == 'done':
            instance.in_progress_to_done_at = timezone.now()

        instance.save()  
        return instance
    
    
