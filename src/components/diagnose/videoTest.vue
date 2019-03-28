
<template>
  <div>
    <div class="container" ref="container">
      <div class="bigVideo">
        <video id="remoteVideo" class="video" autoplay playsinline></video>
        <p>等待医生中</p>
      </div>
      <div class="smallVideo" id="smallVideo">
        <video id="localVideo" class="video" muted autoplay playsinline></video>
      </div>
    </div>
  </div>
</template>
 
<script>
import axion from "@/utils/http_url";
export default {
  data() {
    return {
      predefinedRoomId: "",
      connection: ""
    };
  },
  methods: {
    openRoom() {
      this.connection.open(this.predefinedRoomId, function(
        isRoomOpened,
        roomid,
        error
      ) {
        if (isRoomOpened === true) {
          console.log(isRoomOpened);
        }
      });
    },
    joinRoom() {
      this.connection.join(this.predefinedRoomId);
    },
    connectVideo() {
      this.connection = new RTCMultiConnection();

      // this line is VERY_important
      this.connection.socketURL =
        "https://rtcmulticonnection.herokuapp.com:443/";

      // all below lines are optional; however recommended.

      this.connection.session = {
        audio: true,
        video: true
      };

      this.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      };

      this.connection.onstream = function(event) {
        console.log(event);
        if (event.type == "local") {
          document.getElementById("localVideo").srcObject = event.stream;
        } else if (event.type == "remote") {
          document.getElementById("remoteVideo").srcObject = event.stream;
        }
      };
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      axion.userAuthorizationTest();
      this.connectVideo();
      this.predefinedRoomId = "zjh";
      this.openRoom();
    });
  },
  destroyed() {
    this.connection.closeSocket();
  }
};
</script>
<style scoped>
.container {
  position: relative;
  width: 80%;
  padding: 0;
  height: 600px;
  padding-left: 10%;
}
.bigVideo {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
.smallVideo {
  position: absolute;
  display: inline-block;
  right: 0;
  bottom: 0;
  width: 200px;
  height: 150px;
  cursor: pointer;
}
.smallVideo:hover {
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0.2;
}
.video {
  position: absolute;
  width: 100%;
  height: 100%;
}
.bigVideo p {
  margin-top: 25%;
  text-align: center;
  color: #e2e2e2;
  vertical-align: middle;
}
</style>
