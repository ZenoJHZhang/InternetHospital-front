
<template>
  <div>
    <div class="container">
      <div class="bigVideo">
        <video id="remoteVideo" class="video" autoplay playsinline></video>
        <p>等待对方进入</p>
      </div>
      <div class="smallVideo" id="smallVideo">
        <video id="localVideo" class="video" muted autoplay playsinline></video>
      </div>
    </div>
    <button id="btn-open-room" @click="openRoom()">Open Room</button>
    <button id="btn-join-room" @click="joinRoom()">Join Room</button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      predefinedRoomId: 2323232,
      connection: ""
    };
  },
  methods: {
    openRoom() {
      this.connection.open(this.predefinedRoomId);
    },
    joinRoom() {
      this.connection.join(this.predefinedRoomId);
    }
  },
  mounted() {
    this.$nextTick(function generate() {
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
    });
  }
};
</script>
<style scoped>
		.container {
			position: relative;
			width: 640px;
			height: 480px;
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
			width: 25%;
			height: 25%;
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
			margin-top: 34%;
			text-align: center;
			color: #e2e2e2;
			vertical-align: middle;
		}
</style>
