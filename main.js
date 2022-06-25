music_1 = "";
music_2 = "";

music_1_stat = "";
music_2_stat = "";

leftWristX = 0;
leftWristY = 0;

scoreleftWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;


function preload() {
    music_1 = loadSound("music.mp3");
    music_2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    music_1_stat = music_1.isPlaying();
    music_2_stat = music_2.isPlaying();

    fill("#FF0000");
    stroke("FF0000");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        music_2.stop();

        if (music_1_stat == false) {
            music_1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
        }
    }

    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music_1.stop();

        if (music_2_stat == false) {
            music_2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
        }
    }

}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function gotPoses(results) {
    if(results.length > 0) {

        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreleftWrist)
    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}