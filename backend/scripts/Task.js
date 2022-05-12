class Task{
    constructor(id, description, duration, dispBegin, dispEnd, isDone, weekDays, timeBegin, timeEnd) {
        //Int - Task identification
        this.id = id;
        
        //String - Description of the task
        this.description = description; 

        //Int - Time in minutes of the task
        this.duration = duration;

        //[Int, Int] - Begin of diponibility of the task in [hours, minutes]
        this.dispBegin = dispBegin; 

        //[Int, Int] - End of diponibility of the task in [hours, minutes]
        this.dispEnd = dispEnd; 

        //Boolean - True => If the task's checkbox was marked / False => Otherwise
        this.isDone = isDone; 

        //Vector with 7 Booleans - Indicates in which days the task needs to be done with true, from Sunday to Saturday
        //e.g. [false, false, false, true, false, true, false] indicates the task needs to be done on Wednesday and Friday
        this.weekDays = weekDays;

        //[Int, Int] - Beginning of which time the task was allocated in [hours, minutes]
        this.timeBegin = timeBegin;
        
        //[Int, Int] - End of which time the task was allocated in [hours, minutes]
        this.timeEnd = timeEnd;
    }

    //Getters
    get getId(){
        return this.id;
    }

    get getDescription(){
        return this.description;
    }

    get getDuration(){
        return this.duration;
    }

    get getDispBegin(){
        return this.dispBegin;
    }

    get getDispEnd(){
        return this.dispEnd;
    }

    get getIsDone(){
        return this.isDone;
    }

    get getWeekDays(){
        return this.weekDays;
    }

    get getTimeBegin(){
        return this.timeBegin;
    }

    get getTimeEnd(){
        return this.timeEnd;
    }

    //Setters
    setId(_id){
        this.id = _id;
    }
    
    setDescription(_description){
        this.description = _description;
    }

    setDuration(_duration){
        this.duration = _duration;
    }

    setDispBegin(_dispBegin){
        this.dispBegin = _dispBegin;
    }

    setDispEnd(_dispEnd){
        this.dispEnd = _dispEnd;
    }

    setIsDone(_isDone){
        this.isDone = _isDone;
    }

    setWeekDays(_weekDays){
        this.weekDays = _weekDays;
    }

    setTimeBegin(_timeBegin){
        this.timeBegin = _timeBegin;
    }

    setTimeEnd(_timeEnd){
        this.timeEnd = _timeEnd;
    }
}

/*
class Planner{
    
    constructor([tasks]){
        
    }
    
    {
        "Domingo" : [task1, task2...],
        "Segunda" : [task3, task4...]
    }
}
*/