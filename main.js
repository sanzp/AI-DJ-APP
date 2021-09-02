song = "";

function preload() {
    song = loadSound("Music_Video.mp3")
}
rightwrist_score = 0;
leftwrist_score = 0;
rightwristx = 0;
leftwristx = 0;
rightwristy = 0;
leftwristy = 0;

function setup() {
    canvas = createCanvas(600, 350)
    canvas.position(400, 350)
    video = createCapture(VIDEO)
    video.size(600, 350)
    video.hide()
    posenet = ml5.poseNet(video, modeloaded)
    posenet.on('pose', gotPoses);
}

function modeloaded() {
    console.log("Posenet Modelloaded !")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)

        leftwrist_score = results[0].pose.keypoints[9].score
        rightwrist_score = results[0].pose.keypoints[10].score

        leftwristx = results[0].pose.leftWrist.x
        rightwristx = results[0].pose.rightWrist.x

        leftwristy = results[0].pose.leftWrist.y
        rightwristy = results[0].pose.leftWrist.y
    }
}

function draw() {
    image(video, 0, 0, 600, 350)

    fill("blue")
    stroke("blue")
    if (rightwrist_score > 0.1) {
        circle(rightwristx, rightwristy, 20);
        if (rightwristy > 0 && rightwristy < 70) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x"
            song.rate(0.5)
        }
        if (rightwristy > 70 && rightwristy < 140) {
            document.getElementById("speed").innerHTML = "Speed = 1x"
            song.rate(1)
        }
        if (rightwristy > 140 && rightwristy < 210) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x"
            song.rate(1.5)
        }
        if (rightwristy > 210 && rightwristy < 280) {
            document.getElementById("speed").innerHTML = "Speed = 2x"
            song.rate(2)
        }
        if (rightwristy > 280 && rightwristy < 350) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
            song.rate(2.5)
        }
    }

    if (leftwrist_score > 0.1) {
        circle(leftwristx, leftwristy, 20)
        leftwristy_innumber = Number(leftwristy)
        remove_decimal = floor(leftwristy_innumber)
        volume = remove_decimal / 350
        song.setVolume(volume);
        document.getElementById("vol").innerHTML = "Volume = " + volume

    }
}
function playsong(){
    song.play()
    song.rate(1)
    song.setVolume(1)
}

function stopsong(){
    song.stop()
}