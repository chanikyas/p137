status =""
objects=[]
function setup(){
    canvas= createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}

function draw(){
    image(video, 0, 0, 380, 380)

    if(status!=""){ 
        objectDetector.detect(video,gotresult)
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status : object deteficted"
            fill ("blue")
            percent = floor(objects[i].confidence *100)
            text (objects[i].label+ " "+percent+"%",objects[i].x, objects[i].y)
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(objects[i].label==object_name){
                video.stop()
                objectDetector.detect(gotresult)
                document.getElementById("object_name").innerHTML =object_name + " found"
                sinth= window.speechSynthesis
                utterthis=new SpeechSynthesisUtterance(object_name + " found")
                sinth.speak(utterthis)
                
            }

            else{
                document.getElementById("object_name").innerHTML =object_name + " not found"
 
            }
        }
    }
} 

function start(){
    objectDetector = ml5.objectDetector("cocossd",modelloded)
    document.getElementById("status").innerHTML ="Status : Dettecting objects"
    object_name = document.getElementById("object_name").value

}

function modelloded(){
    console.log("modelloded")
    status = true
}

function gotresult(error,result){
    if(error){
        console.log(error)
    }
    else{
       console.log(result)
       objects = result
    }


}