<template>
<body>
  <button id="btn-open-room" @click="openRoom()">Open Room</button>
  <button id="btn-join-room" @click="joinRoom()">Join Room</button>
</body>
</template>

<script>
import RTCMultiConnection from "rtcmulticonnection";
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
        document.body.appendChild(event.mediaElement);
      };
    });
  }
};
</script>
