from django.shortcuts import render
from .models import Feeling, Log
import datetime

# Create your views here.

def index(request):
    message = "Select a feeling from the list \n \n Click 'Dig Deeper' to explore related feelings \n \n Choose a date in the calendar to log past feelings"

    if request.method == "POST" and 'addentry' in request.POST:
        user = request.user
        feelings = request.POST.getlist("feelings")
        
        #Checks if a date was selected and uses today's date as default
        if request.POST["date"] != '':
            date = request.POST["date"]
        else:
            date = datetime.date.today()
        

        for item in feelings:
            feeling = Feeling.objects.get(feeling = item)
            try:
                log = Log(user = user, feeling = feeling, date = date)
                log.save()
                message = 'Feelings logged with success'
            except:
                log = []
                message = ''
    
    elif request.method == "POST" and 'deleteentry' in request.POST:
        user = request.user
        date = request.POST["date"]

        log = Log.objects.filter(user = user, date = date)
        log.delete()

        message = 'Entry deleted with success'
    
    main = Feeling.objects.values('category').distinct().order_by('category')
    feelings = Feeling.objects.order_by('category','feeling').exclude(feeling__in=main)

    try:
        log = Log.objects.filter(user = request.user)
    except:
        log = []
        message += '\n\n **IMPORTANT**: In order to use the log, please create an user account and log in before using the app'

    return render(request, "feelings/index.html", {"feelings": feelings, "main": main, "log":log, "message": message})
