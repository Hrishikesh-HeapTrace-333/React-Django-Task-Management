from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=100)
    
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    organizations = models.ManyToManyField(Organization, blank=True)
    
class Ticket(models.Model):
    ticketName = models.CharField(max_length=100)
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assigned_tickets')
    assignedTo = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='received_tickets')
   
class TicketInfo(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    priority = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=100, null=True, blank=True)
    points = models.IntegerField(null=True, blank=True)
    sprint = models.IntegerField(null=True, blank=True)
    dueDate = models.DateField(null=True, blank=True)
