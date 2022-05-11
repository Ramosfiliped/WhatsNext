class Task{
    description = "";
    duration = 0;
    dispBegin = [0,0]; //Matheus, poe a hora do jeito que achar melhor [fst, snd] => fst hora de inicio / snd minuto de inicio
    dispEnd = [0,0]; //Matheus, poe a hora do jeito que achar melhor
    isDone = False;

    constructor(description, duration, dispBegin, dispEnd, isDone) {
        this.description = description; //String - Description of the task
        this.duration = duration;       //Float  - Time in minutes of the task
        this.dispBegin = dispBegin;     //Time   - Begin of diponibility of the task
        this.dispEnd = dispEnd;         //Time   - End of diponibility of the task
        this.isDone = isDone;      //Boolean - True => If task completed / False => If task not completed  
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
}