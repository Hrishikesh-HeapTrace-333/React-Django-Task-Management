from datetime import timezone
from django.db import models
from rest_framework import serializers

class Organization(models.Model):
    name = models.CharField(max_length=100)
    
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    organizations = models.ManyToManyField(Organization, blank=True)
    
class Ticket(models.Model):
    ticketName = models.CharField(max_length=100)
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assigned_tickets')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    points = models.IntegerField(null=True, blank=True)
    sprint = models.IntegerField(null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)   
    isAssigned = models.BooleanField(null=True, blank=True, default=False)

class TicketInfo(models.Model):
    STATUS_CHOICES = [
        ('created', 'Created'),
        ('in-progress', 'In Progress'),
        ('done', 'Done'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    assignedTo = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='received_tickets')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    dueDate = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='created')
    created_to_in_progress_at = models.DateTimeField(null=True, blank=True)
    in_progress_to_done_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.status == 'in-progress' and self.created_to_in_progress_at is None:
            self.created_to_in_progress_at = timezone.now()
        if self.status == 'done' and self.in_progress_to_done_at is None and self.created_to_in_progress_at is not None:
            self.created_to_in_progress_at = timezone.now()
        super().save(*args, **kwargs)
         
    def create(self, validated_data):
        ticket = validated_data.get('ticket')

        if ticket.isAssigned:
            raise serializers.ValidationError("This ticket is already assigned to someone.")

        ticket.isAssigned = True
        ticket.save()

        return TicketInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        previous_assigned_to = instance.assignedTo
        previous_status = instance.status  
        
        instance.ticket = validated_data.get('ticket', instance.ticket)
        instance.assignedTo = validated_data.get('assignedTo', instance.assignedTo)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.dueDate = validated_data.get('dueDate', instance.dueDate)
        
        new_status = validated_data.get('status', instance.status)
        if previous_status == 'created' and new_status == 'in-progress':
            instance.created_to_in_progress_at = timezone.now()
        elif previous_status == 'in-progress' and new_status == 'done':
            instance.in_progress_to_done_at = timezone.now()

        if instance.assignedTo and instance.assignedTo != previous_assigned_to:
            instance.ticket.isAssigned = True
            instance.ticket.save()

        instance.save()  
        return instance