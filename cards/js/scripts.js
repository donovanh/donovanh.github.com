//localStorage.clear();

var maxNumberOfStamps = 8;
var scrolling = 1;

x$.ready(function() {
	
	// On first load, update content list
	getAllItems();
	
	var isTouching = false;
	// Listen for clicks on the cards
	
	x$('#cards').delegate('.cardlinks','click', function(e) {
		var thisID = x$(this).attr('id');
		scrolling = 0;
		fillCardInfo(thisID);
	});
	
	// Listen for delete button
	x$('#card').delegate('button.delete', 'click', function() {
	 	confirmed = confirm("Are you sure you want to delete this card?");
	    if (confirmed) {
	        var cardID = x$(this).attr('id');
	        x$('#card').removeClass().addClass('fadeOut');
	        window.setTimeout(x$('#card').addClass('shrunk'), 500);
	        localStorage.removeItem(cardID);
	        getAllItems(); //refresh the list of items
	        scrolling=1;
	    }
	    return false;
	});
	
	x$('#card').delegate('button.close', 'click', function() {
		x$('#card').removeClass().addClass('shrinkOut');
		scrolling = 1;
	});
	
	// Listen for click on add card +
	x$('.add a').click(function() {
		scrolling = 0;
		x$(this).removeClass('inactive').addClass('active');
		x$('#addCard').removeClass().addClass('growIn');
	});
	
	// Save new card
	x$('#addnew').click(function(e) {
		e.preventDefault();
		if (storeNewItem()) {
			// Clear form
			document.getElementById("addCardForm").reset();
			// Hide form
			x$('#addCard').removeClass().addClass('shrinkOut');
			// Show new card
			showCard();
			// Refresh list
	        getAllItems();
	        scrolling=1;
	    }
		return false;
	});
	
	// Close new card window
	x$('#closenew').click(function(e) {
		e.preventDefault();
		document.getElementById("addCardForm").reset();
		x$('#addCard').removeClass().addClass('shrinkOut');
		x$('.add a').removeClass().addClass('inactive');
		scrolling=1;
		return false;
	});
	
	// Click on a stamp (shows the span)
	x$('#card').delegate('li', 'click', function() {
		x$(this).addClass('active');
		x$(this).find('span').setStyle('display','block');
		// Update this card with the new stamp count
		updateStampCount(x$(this[0].parentNode).attr('id'), 'plus');
	});
	
	// Uncheck the stamp (hides the span)
	x$('#card').delegate('li span', 'click', function() {
		x$(this).setStyle('display', 'none');
		x$(this[0].parentNode).toggleClass('active');
		// Update this card with the new stamp count
		updateStampCount(x$(this[0].parentNode).attr('rel'), 'minus');
	});
	
	x$('.page').touchmove(function(e) {
		if (!scrolling) {
			e.preventDefault();
		}
	});
	
	x$('#cards').touchend(function() {
		var distanceFromTop = window.pageYOffset + 50;
		x$('#card').setStyle('top', distanceFromTop +'px');
	});
	
});





function updateStampCount(itemKey, plusminus) {
	var selectedItem = (localStorage.getItem(itemKey));
	var aSelected = selectedItem.split(';');
	// Count is item number 2
	var currentStamps = parseInt(aSelected[2]);
	if (plusminus == 'plus') {
		currentStamps += 1;
	} else {
		currentStamps -= 1;
	}
	aSelected[2] = currentStamps;
	var values = new Array();
	for (var i = 0; i < aSelected.length; i++) {
	    values.push(aSelected[i]);
	}
	
	// Delete current card
	localStorage.removeItem(itemKey);
	
	// Save updated version
	localStorage.setItem(itemKey, values.join(';'));
    
     
}

function fillCardInfo(itemKey) {
	// Get the item and put it in the item mustache template
	var selectedItem = (localStorage.getItem(itemKey));
	var aSelected = selectedItem.split(';');
	aCardDetail.firstname = aSelected[0];
	aCardDetail.lastname = aSelected[1];
	// Build number of stamps
	var stampsHTML = '<ul id="'+itemKey+'">';
	for (i=0; i < maxNumberOfStamps;i++) {
		if (aSelected[2] > i) {
			// Show a "stamped" stamp
			stampsHTML += '<li class="stamp active" rel="'+itemKey+'"><span>Y</span></li>';
		} else {
			stampsHTML += '<li class="stamp" rel="'+itemKey+'"><span>N</span></li>';
		}
	}
	stampsHTML += '</ul>';
	// Set and display selected card template
	aCardDetail.itemkey = itemKey;
	renderOurTemplate(
		aCardDetail,
		function (markup) {
	    	document.getElementById("card").innerHTML = markup;
	    	x$('.stamphtml').html(stampsHTML);
		},
		'templates/card.mustache'
	);
	showCard();
}

function showCard() {
	x$('#card').removeClass().addClass('growIn');
}

// Template handling logic
var storedTemplate = null;
function renderOurTemplate(view, callback, selectedTemplate) {
	function doRender(template, view) {
		callback(Mustache.to_html(template, view))
	}
	if (storedTemplate) {
		doRender(storedTemplate, view);
	} else {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200 || this.status == 0) {
					storedTemplate = this.responseText;
					doRender(storedTemplate, view);
				} else {
					console.log('something went wrong');
				}
			}
		}
		req.open('GET', selectedTemplate, true);
		req.send();
	}
}

// Template views
var aCardDetail = {};

// Log callback function
function logit(e) {
	console.log(e);
}

// External data request
// passes the response text to callback
function getXHR(url, callback) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200 || this.status == 0) {
				callback(this.responseText);
			} else {
				console.log('something went wrong');
			}
		}
	}
	req.open('GET', url, true);
	req.send();
}
// avoids cross-domain restrictions
function getJSONP(url, callback) {
	var s = document.createElement("script"),
	path = url + "&callback=jsonpCallback";
	window.jsonpCallback = callback;
	s.src = path;
	document.body.appendChild(s);
}


// Card handling functions

function storeNewItem() {
	// Get the elements

	var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var stamps = document.getElementById('numberOfStamps');
    
    // Get their values
	var newFirstname = firstname.value;
	var newLastname = lastname.value;
	var newStamps = stamps.options[stamps.selectedIndex].value;
	var keyLetter = newLastname.charAt(0).toUpperCase();
	
	var newDate = new Date();
    var itemId = newDate.getTime();
    var values = new Array();
        
    //strip html tags
    newFirstname = newFirstname.replace(/(<([^>]+)>)/ig, "").trim();
    newLastname = newLastname.replace(/(<([^>]+)>)/ig, "").trim();
    
    values.push(newFirstname);
    values.push(newLastname);
    values.push(newStamps); 
    values.push(keyLetter); 
    
    // Set up demo data if requested
    if (newFirstname == 'Demo' && newLastname == 'Demo') {
    	setUpDemoNames();
    }
    
    // Put them in localstorage
    if (newFirstname != "" && newLastname != "") {
        try {
            localStorage.setItem(itemId, values.join(';'));
            // Fill and show the card
            fillCardInfo(itemId);
            newFirstname.value = ''; newLastname.value = ''; newStamps.value = '';
            return 1;
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!');
            }
        }
    } else {
        alert("Please fill both name fields.", function() {}, "OK");
        return 0;
    }
}

if (typeof String.prototype.trim != 'function') { // detect native implementation
  String.prototype.trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  };
}

function getAllItems() {
	
    var i = 0;
 	var allCards = new Array();
 	var cardlist = '';
 	var currentLetter = '';
    // loop through each item in the database
    for (i = 0; i <= localStorage.length-1; i++) {
        //lets setup some variables for the key and values
        var itemKey = localStorage.key(i);
        var values = localStorage.getItem(itemKey);
        values = values.split(";"); //create an array of the values
        var firstname = values[0];
        var lastname = values[1];
        var stamps = values[2];
        var keyLetter = values[3];
        var toPush = new Array(keyLetter, lastname, firstname, stamps, itemKey);
 		allCards.push(toPush);
       
	}
	allCards.sort();
	 // add the cards to list
    for (var i = 0; i < allCards.length; i++) {
    	var card = allCards[i];
    	// Get the first letter of surname
    	var thisLetter = card[0];
    	if (thisLetter != currentLetter) {
    		currentLetter = thisLetter;
    		cardlist += '<li class="letter letter'+currentLetter+'"><span>'+currentLetter+'</span></li>';
    	}
		cardlist += '<li><span id="'+card[4]+'" class="cardlinks">'+card[2]+' '+card[1]+'</span></li>';
    }
    x$('#cards').html('<ul>'+cardlist+'</ul>');

}


/* Extending XUI */

// Create the "delegate" functionality from jquery
xui.extend({
    is: function (selector) {
          var matchedNodes = x$(selector), i=0;
          for (i; i<matchedNodes.length; i++)
            if (this[0] == matchedNodes[i]) return true;
          return false;
     },
    delegate: function(selector, event, handler){
        this.on(event, function(evt){
            var elem = evt.target;

            if ( x$(elem).is(selector) ){
                handler.apply(x$(elem), arguments);
            }
        });
    }
});

// Show / hide / add / end

xui.extend({
	/**
	 * Adds more DOM nodes to the existing element list.
	 */
	add: function(q) {
	  [].push.apply(this, slice(xui(q)));
	  return this.set(this.reduce());
	},

	/**
	 * Pops the last selector from XUI
	 */
	end: function () {	
		return this.set(this.cache || []);	 	
	},
  /**
   * Sets the `display` CSS property to `block`.
   */
  show:function() {
    return this.setStyle('display','block');
  },
  /**
   * Sets the `display` CSS property to `none`.
   */
  hide:function() {
    return this.setStyle('display','none');
  },
  fadeOut:function (dur,callback) {
  	this.tween({opacity:"0",duration:dur},callback);
  }
});


function setUpDemoNames() {
	//localStorage.clear();

localStorage.setItem(1321217943, "Master;Kirk;8;K");
localStorage.setItem(1321217944, "John;Rolph;3;R");
localStorage.setItem(1321217945, "Kettell;Massey;0;M");
localStorage.setItem(1321217947, "Gomez;McKeller;3;M");
localStorage.setItem(1321217948, "Wright;MacAlpine;3;M");
localStorage.setItem(1321217949, "Captain;Crutchfield;7;C");
localStorage.setItem(1321217950, "Richard;McCarroll;4;M");
localStorage.setItem(1321217951, "James;Megara;8;M");
localStorage.setItem(1321217952, "Captain;Phillips;7;P");
localStorage.setItem(1321217953, "Bolles;Des;3;D");
localStorage.setItem(1321217954, "Adams;Furlong;8;F");
localStorage.setItem(1321217955, "Darby;Pelkey;8;P");
localStorage.setItem(1321217956, "Alexander;Nesbitt;7;N");
localStorage.setItem(1321217957, "Annes;Turnbull;3;T");
localStorage.setItem(1321217959, "Admiral;McWilliam;3;M");
localStorage.setItem(1321217960, "Thomas;McLenaghan;5;M");
localStorage.setItem(1321217961, "Topan;Frissell;3;F");
localStorage.setItem(1321217962, "servant;Mars;2;M");
localStorage.setItem(1321217963, "Assistant;Akester;0;A");
localStorage.setItem(1321217964, "MP;Smiley;5;S");
localStorage.setItem(1321217965, "Master;Heatley;5;H");
localStorage.setItem(1321217966, "Lasie;Coull;8;C");
localStorage.setItem(1321217967, "Nicholls;Stark;0;S");
localStorage.setItem(1321217968, "Ardle;Wallage;1;W");
localStorage.setItem(1321217969, "Philip;Fall;3;F");
localStorage.setItem(1321217970, "Rowland;Chambers;8;C");
localStorage.setItem(1321217971, "Captain;Crane;6;C");
localStorage.setItem(1321217972, "William;Wager;5;W");
localStorage.setItem(1321217973, "Conclude;Houston;3;H");
localStorage.setItem(1321217975, "Laurentson;Coverdale;0;C");
localStorage.setItem(1321217977, "Waterhouse;Vasey;7;V");
localStorage.setItem(1321217978, "Iohn;Seger;4;S");
localStorage.setItem(1321217979, "Archard;Herrick;8;H");
localStorage.setItem(1321217980, "Richard;Waugh;1;W");
localStorage.setItem(1321217981, "Ardle;Akin;7;A");
localStorage.setItem(1321217982, "Shaberdge;ODonnelly;5;O");
localStorage.setItem(1321217983, "William;Parent;0;P");
localStorage.setItem(1321217984, "Allyne;Dodd;4;D");
localStorage.setItem(1321217985, "Thomas;Denue;0;D");
localStorage.setItem(1321217986, "Powell;Chayne;0;C");
localStorage.setItem(1321217987, "Nicholls;McCartney;5;M");
localStorage.setItem(1321217988, "Barnes;Jubion;5;J");
localStorage.setItem(1321217989, "Jane;McVey;5;M");
localStorage.setItem(1321217990, "John;Horsley;8;H");
localStorage.setItem(1321217991, "de;Onthank;3;O");
localStorage.setItem(1321217992, "Gardyner;Menzies;5;M");
localStorage.setItem(1321217993, "Captain;Murray;1;M");
localStorage.setItem(1321217994, "Thomas;McWhiney;5;M");
localStorage.setItem(1321217995, "Edward;Gaeles;4;G");
localStorage.setItem(1321217996, "Gibbes;Moorehouse;5;M");
localStorage.setItem(1321217997, "Thomas;Dalmage;8;D");
localStorage.setItem(1321217998, "Arthur;Donohghy;0;D");
localStorage.setItem(1321217999, "Philippes;Duval;5;D");
localStorage.setItem(1321218000, "Vaughan;McQuinney;0;M");
localStorage.setItem(1321218001, "Audry;Hagan;0;H");
localStorage.setItem(1321218002, "Francis;MacFarlande;3;M");
localStorage.setItem(1321218003, "Harris;Roach;4;R");
localStorage.setItem(1321218004, "Bright;Wools;7;W");
localStorage.setItem(1321218005, "John;Lewin;3;L");
localStorage.setItem(1321218006, "Edward;Malone;5;M");
localStorage.setItem(1321218007, "Thomas;Mills;3;M");
localStorage.setItem(1321218008, "Iohn;Linton;5;L");
localStorage.setItem(1321218011, "John;Blackshaw;6;B");
localStorage.setItem(1321218012, "John;Lovell;4;L");
localStorage.setItem(1321218013, "Elizabeth;Portfield;7;P");
localStorage.setItem(1321218014, "William;LEstrange;6;L");
localStorage.setItem(1321218015, "Scrivener;Leveque;8;L");
localStorage.setItem(1321218016, "London;McSkimming;3;M");
localStorage.setItem(1321218017, "Iohn;Garner;1;G");
localStorage.setItem(1321218018, "Robert;Amor;5;A");
localStorage.setItem(1321218019, "Iohn;Neily;8;N");
localStorage.setItem(1321218020, "Captain;Brammer;6;B");
localStorage.setItem(1321218021, "Howe;Horne;2;H");
localStorage.setItem(1321218022, "Thomas;Jebow;3;J");
localStorage.setItem(1321218023, "Drake;Whithale;1;W");
localStorage.setItem(1321218024, "Peter;Rowbotham;7;R");
localStorage.setItem(1321218026, "Hesket;Hodginson;2;H");
localStorage.setItem(1321218027, "Nicholas;Patnaude;8;P");
localStorage.setItem(1321218028, "Captain;Sandelands;2;S");
localStorage.setItem(1321218029, "Barbar;Blaik;6;B");
localStorage.setItem(1321218030, "Eseuen;Curtis;6;C");
localStorage.setItem(1321218031, "John;Edford;8;E");
localStorage.setItem(1321218032, "Richard;Chenier;8;C");
localStorage.setItem(1321218033, "Wilson;McTaggart;0;M");
localStorage.setItem(1321218034, "Blunt;Ryannitz;5;R");
localStorage.setItem(1321218035, "Payne;Vleit;6;V");
localStorage.setItem(1321218036, "Sampson;Davies;1;D");
localStorage.setItem(1321218037, "Chamberlain;Scroggie;3;S");
localStorage.setItem(1321218038, "Bedford;Friot;1;F");
localStorage.setItem(1321218041, "Michael;McKell;2;M");
localStorage.setItem(1321218042, "Wyles;Curll;3;C");
localStorage.setItem(1321218043, "Assistant;Vivier;6;V");
localStorage.setItem(1321218044, "Iohn;McCurdy;7;M");
localStorage.setItem(1321218045, "Nichols;Hebert;2;H");
localStorage.setItem(1321218046, "Stilman;Gay;3;G");
localStorage.setItem(1321218047, "Knotford;Grace;7;G");
localStorage.setItem(1321218048, "Gabriell;Cleeveland;6;C");
localStorage.setItem(1321218049, "Wright;Asheline;3;A");
localStorage.setItem(1321218050, "Scrivener;Starke;4;S");
localStorage.setItem(1321218051, "Darby;Desondier;2;D");
localStorage.setItem(1321218052, "George;Blashute;3;B");
localStorage.setItem(1321218053, "John;Glender;8;G");
localStorage.setItem(1321218054, "de;Grisham;8;G");
localStorage.setItem(1321218055, "Hyd;Boles;2;B");
localStorage.setItem(1321218056, "White;Musker;1;M");
localStorage.setItem(1321218057, "Bennet;Corpron;5;C");
localStorage.setItem(1321218058, "Walters;Shearer;8;S");
localStorage.setItem(1321218059, "Captain;Ethrington;5;E");
localStorage.setItem(1321218060, "John;Schyler;4;S");
localStorage.setItem(1321218061, "Barecombe;Duncan;5;D");
localStorage.setItem(1321218062, "Glande;Minzie;1;M");
localStorage.setItem(1321218063, "appraiser;Moorehouse;5;M");
localStorage.setItem(1321218064, "Wade;Fielding;6;F");
localStorage.setItem(1321218065, "John;Warcup;6;W");
localStorage.setItem(1321218066, "Thomas;Walch;7;W");
localStorage.setItem(1321218067, "Gramme;MacVicar;6;M");
localStorage.setItem(1321218068, "Manteo;MacDougald;3;M");
localStorage.setItem(1321218069, "Diego;Maclellan;2;M");
localStorage.setItem(1321218070, "Philip;Elias;5;E");
localStorage.setItem(1321218071, "Thomas;Alfred;2;A");
localStorage.setItem(1321218072, "Winter;Blakemore;6;B");
localStorage.setItem(1321218073, "Randes;Jerome;2;J");
localStorage.setItem(1321218074, "Moonlight;Kavanagh;8;K");
localStorage.setItem(1321218075, "Richard;Paradis;7;P");
localStorage.setItem(1321218076, "Harvye;Bean;4;B");
localStorage.setItem(1321218077, "Brooke;Angle;2;A");
localStorage.setItem(1321218078, "Henry;Liebich;1;L");
localStorage.setItem(1321218079, "Assistant;Lee;6;L");
localStorage.setItem(1321218080, "Walters;Levque;7;L");
localStorage.setItem(1321218081, "steward;Fitzsimmonds;8;F");
localStorage.setItem(1321218082, "Harvie;Railton;8;R");
localStorage.setItem(1321218083, "servant;Fenlyson;3;F");
localStorage.setItem(1321218084, "Clement;Logan;5;L");
localStorage.setItem(1321218085, "Bennet;Torrance;3;T");
localStorage.setItem(1321218086, "Skeuelabs;Kingsborough;4;K");
localStorage.setItem(1321218087, "Captain;Driver;5;D");
localStorage.setItem(1321218088, "Raleghs;Greendall;6;G");
localStorage.setItem(1321218089, "Master;Welch;3;W");
localStorage.setItem(1321218090, "Morris;Hayford;4;H");
localStorage.setItem(1321218091, "William;Jondro;2;J");
localStorage.setItem(1321218092, "John;Shil;4;S");
localStorage.setItem(1321218093, "Kendall;Duffy;4;D");
localStorage.setItem(1321218094, "Annes;Boileau;5;B");
localStorage.setItem(1321218095, "Thomas;Hickcock;5;H");
localStorage.setItem(1321218096, "Luddington;ODell;2;O");
localStorage.setItem(1321218097, "Hyd;Messenger;4;M");
localStorage.setItem(1321218098, "later;Philips;2;P");
localStorage.setItem(1321218099, "Conclude;Hannah;0;H");
localStorage.setItem(1321218100, "Boazio;Calwell;1;C");
localStorage.setItem(1321218101, "Borges;Myers;4;M");
localStorage.setItem(1321218102, "Thomas;Ornum;2;O");
localStorage.setItem(1321218103, "George;Coulson;7;C");
localStorage.setItem(1321218104, "Captain;Munn;1;M");
localStorage.setItem(1321218106, "Richard;Steven;6;S");
localStorage.setItem(1321218107, "Hance;McClenaghan;0;M");
localStorage.setItem(1321218108, "Cottell;Harrington;5;H");
localStorage.setItem(1321218109, "Edward;Warburton;5;W");
localStorage.setItem(1321218110, "Frauncis;Knentyli;4;K");
localStorage.setItem(1321218111, "Phevens;Keddy;6;K");
localStorage.setItem(1321218112, "Harrye;Baldwin;2;B");
localStorage.setItem(1321218113, "Richard;McDougald;8;M");
localStorage.setItem(1321218114, "Smolkin;Balfour;6;B");
localStorage.setItem(1321218115, "John;Taresly;8;T");
localStorage.setItem(1321218116, "the;LaPlante;8;L");
localStorage.setItem(1321218117, "Walter;Elgin;1;E");
localStorage.setItem(1321218118, "Robert;Greglestine;0;G");
localStorage.setItem(1321218119, "Dauid;Baglan;2;B");
localStorage.setItem(1321218120, "Nicholas;Norval;3;N");
localStorage.setItem(1321218121, "Walter;Bunell;7;B");
localStorage.setItem(1321218122, "Abraham;Welbourne;7;W");
localStorage.setItem(1321218123, "Barton;Flint;7;F");
localStorage.setItem(1321218124, "Colman;Swale;2;S");
localStorage.setItem(1321218125, "Iohn;Theoret;2;T");
localStorage.setItem(1321218127, "William;McGrewer;4;M");
localStorage.setItem(1321218128, "Martin;McRoberts;3;M");
localStorage.setItem(1321218129, "Cottell;Tollan;5;T");
localStorage.setItem(1321218130, "Salter;Lavigne;0;L");
localStorage.setItem(1321218131, "William;Brickwood;0;B");
localStorage.setItem(1321218132, "Edward;Best;7;B");
localStorage.setItem(1321218133, "Ketill;McVey;3;M");
localStorage.setItem(1321218134, "Buen;McLune;8;M");
localStorage.setItem(1321218135, "Sampson;Vivier;1;V");
localStorage.setItem(1321218136, "Potkin;Vleit;1;V");
localStorage.setItem(1321218137, "Mannering;Moorehouse;8;M");
localStorage.setItem(1321218139, "Greene;Kilgallen;2;K");
localStorage.setItem(1321218140, "Knotford;Eagleton;4;E");
localStorage.setItem(1321218141, "Matthew;Loban;5;L");
localStorage.setItem(1321218142, "Iames;Gillis;6;G");
localStorage.setItem(1321218144, "mariner;Breckenridge;7;B");
localStorage.setItem(1321218145, "Brockbancke;Reynold;1;R");
localStorage.setItem(1321218146, "Master;Walsh;3;W");
localStorage.setItem(1321218148, "de;Swalis;3;S");
localStorage.setItem(1321218149, "Henry;Kelton;3;K");
localStorage.setItem(1321218150, "Agnes;Hampson;7;H");
localStorage.setItem(1321218151, "Cavendish;Daley;7;D");
localStorage.setItem(1321218152, "Thamas;Prudence;1;P");
localStorage.setItem(1321218153, "Captain;Jane;6;J");
localStorage.setItem(1321218154, "Roebuck;Choulerton;1;C");
localStorage.setItem(1321218155, "Iames;Middleton;7;M");
localStorage.setItem(1321218156, "Anwike;Charters;3;C");
localStorage.setItem(1321218157, "Wright;Pinkard;6;P");
localStorage.setItem(1321218158, "Captain;Hughey;0;H");
localStorage.setItem(1321218159, "Davell;Fondryman;4;F");
localStorage.setItem(1321218160, "Yong;Mouilpied;0;M");
localStorage.setItem(1321218161, "Wright;McClymont;4;M");
localStorage.setItem(1321218162, "Master;Cressey;0;C");
localStorage.setItem(1321218164, "Manuel;McEwen;4;M");
localStorage.setItem(1321218165, "Robert;Craik;7;C");
localStorage.setItem(1321218166, "Earnest;Sweeting;5;S");
localStorage.setItem(1321218167, "Richard;Gilles;7;G");
localStorage.setItem(1321218168, "Fernandez;Landel;8;L");
localStorage.setItem(1321218169, "Smith;Brouillette;3;B");
localStorage.setItem(1321218170, "John;McCuaig;8;M");
localStorage.setItem(1321218171, "Assistant;Crutchfiled;5;C");
localStorage.setItem(1321218173, "Brooke;Gratton;6;G");
localStorage.setItem(1321218174, "Roebuck;Tait;5;T");
localStorage.setItem(1321218175, "Valdes;Aulchin;1;A");
localStorage.setItem(1321218176, "Chappell;Burril;8;B");
localStorage.setItem(1321218178, "William;Smail;5;S");
localStorage.setItem(1321218179, "mariner;Heartsgrove;6;H");
localStorage.setItem(1321218180, "Cely;Jaffray;3;J");
localStorage.setItem(1321218181, "Cooper;Teal;0;T");
localStorage.setItem(1321218182, "Wenefrid;McCowes;7;M");
localStorage.setItem(1321218183, "Barton;Barnbard;6;B");
localStorage.setItem(1321218184, "Assistant;Clelland;4;C");
localStorage.setItem(1321218185, "Walsingham;McLelland;7;M");
localStorage.setItem(1321218187, "Kendall;Byford;3;B");
localStorage.setItem(1321218188, "James;Welsh;3;W");
localStorage.setItem(1321218189, "Stone;Ormston;3;O");
localStorage.setItem(1321218190, "Captain;Spindlo;5;S");
localStorage.setItem(1321218191, "Thorne;McClenaghan;6;M");
localStorage.setItem(1321218192, "Newport;Monteith;3;M");
localStorage.setItem(1321218193, "Stevens;Beau;4;B");
localStorage.setItem(1321218194, "Courtnay;Sheats;1;S");
localStorage.setItem(1321218196, "Walter;Warminton;4;W");
localStorage.setItem(1321218197, "Crtes;Buchan;0;B");
localStorage.setItem(1321218198, "Kelborne;Armour;7;A");
localStorage.setItem(1321218199, "Sampson;Mosley;2;M");
localStorage.setItem(1321218201, "Clarke;Holzworth;0;H");
localStorage.setItem(1321218202, "Captain;Merrick;2;M");
localStorage.setItem(1321218203, "Robert;Wadby;5;W");
localStorage.setItem(1321218204, "Hugh;Albiston;2;A");
localStorage.setItem(1321218205, "Lane;McEwing;6;M");
localStorage.setItem(1321218206, "Captain;Beach;5;B");
localStorage.setItem(1321218207, "William;Litch;2;L");
localStorage.setItem(1321218208, "Maruyn;Sproule;7;S");
localStorage.setItem(1321218209, "Bygatte;Ashman;8;A");
localStorage.setItem(1321218210, "Thomas;Vanligne;4;V");
localStorage.setItem(1321218211, "Robert;Haffie;2;H");
localStorage.setItem(1321218212, "Vincent;Gillespie;1;G");
localStorage.setItem(1321218213, "John;Eastin;3;E");
localStorage.setItem(1321218214, "Arthur;Gault;6;G");
localStorage.setItem(1321218215, "Edward;Stirret;3;S");
localStorage.setItem(1321218216, "Good;Howson;3;H");
localStorage.setItem(1321218217, "Iames;Levers;0;L");
localStorage.setItem(1321218218, "Warner;Perrett;5;P");
localStorage.setItem(1321218219, "John;Massey;5;M");
localStorage.setItem(1321218220, "William;Loy;8;L");
localStorage.setItem(1321218221, "Gerrard;McJunkin;0;M");
localStorage.setItem(1321218222, "Nicholas;Wallar;0;W");
localStorage.setItem(1321218224, "Lieutenant;Cockrane;2;C");
localStorage.setItem(1321218225, "John;Neaves;6;N");
localStorage.setItem(1321218226, "John;Barber;2;B");
localStorage.setItem(1321218227, "Barlowe;Hinkston;0;H");
localStorage.setItem(1321218228, "Bagge;Lake;5;L");
localStorage.setItem(1321218229, "Nicholes;Creasie;7;C");
localStorage.setItem(1321218230, "Granganimeo;Maynard;2;M");
localStorage.setItem(1321218231, "Master;Braithwait;8;B");
localStorage.setItem(1321218232, "Daniel;Goodale;3;G");
localStorage.setItem(1321218233, "Cely;Spindlo;3;S");
localStorage.setItem(1321218234, "Ardle;Tindale;8;T");
localStorage.setItem(1321218235, "Kendall;Walch;5;W");
localStorage.setItem(1321218236, "Francis;Vandem;6;V");
localStorage.setItem(1321218237, "Erisey;Bingham;4;B");
localStorage.setItem(1321218238, "Burke;Wales;7;W");
localStorage.setItem(1321218239, "Wright;Sparrow;5;S");
localStorage.setItem(1321218240, "Cornieles;Persons;4;P");
localStorage.setItem(1321218241, "Sampson;Frene;2;F");
localStorage.setItem(1321218242, "Clement;McCarthur;1;M");
localStorage.setItem(1321218243, "Captain;Cameron;7;C");
localStorage.setItem(1321218244, "Starte;McLaurin;4;M");
localStorage.setItem(1321218245, "Thomas;Humphrys;2;H");
localStorage.setItem(1321218246, "Chipping;Critchfield;1;C");
localStorage.setItem(1321218247, "Hallet;Horn;3;H");
localStorage.setItem(1321218248, "Captain;Bertrand;1;B");
localStorage.setItem(1321218249, "Sir;Shea;7;S");
localStorage.setItem(1321218250, "Martin;Dale;8;D");
localStorage.setItem(1321218251, "Henry;Danston;1;D");
localStorage.setItem(1321218252, "Sare;Hibbard;8;H");
localStorage.setItem(1321218253, "mate;Minney;4;M");
localStorage.setItem(1321218254, "Captain;Robb;8;R");
localStorage.setItem(1321218255, "seaman;Powers;0;P");
localStorage.setItem(1321218256, "Master;McCallister;8;M");
localStorage.setItem(1321218257, "Amades;Tait;5;T");
localStorage.setItem(1321218258, "near;Earl;8;E");
localStorage.setItem(1321218259, "John;Meyers;7;M");
localStorage.setItem(1321218260, "Carleill;Kenada;6;K");
localStorage.setItem(1321218261, "Drake;Lewis;4;L");
localStorage.setItem(1321218263, "Foxe;Phibbs;7;P");
localStorage.setItem(1321218264, "Captain;Napier;1;N");
localStorage.setItem(1321218265, "Chaundeler;Goodsell;5;G");
localStorage.setItem(1321218266, "Escot;Achester;8;A");
localStorage.setItem(1321218267, "MP;Nelles;7;N");
localStorage.setItem(1321218268, "Hariot;Cheney;3;C");
localStorage.setItem(1321218269, "Beale;McLalan;5;M");
localStorage.setItem(1321218270, "Iohn;McMurray;6;M");
localStorage.setItem(1321218271, "Henley;Gibbson;4;G");
localStorage.setItem(1321218272, "William;McClure;2;M");
localStorage.setItem(1321218273, "Master;Straps;2;S");
localStorage.setItem(1321218274, "Iohn;Bertholdt;5;B");
localStorage.setItem(1321218275, "Jesus;Edward;7;E");
localStorage.setItem(1321218277, "Wright;Cunningham;0;C");
localStorage.setItem(1321218278, "Baptista;Macnider;4;M");
localStorage.setItem(1321218279, "Acton;Wyng;3;W");
localStorage.setItem(1321218280, "Wildye;McMullan;8;M");
localStorage.setItem(1321218281, "Wade;Bain;3;B");
localStorage.setItem(1321218282, "Limehouse;McCoag;7;M");
localStorage.setItem(1321218283, "Cocke;Hoy;8;H");
localStorage.setItem(1321218284, "Wyles;McMillin;5;M");
localStorage.setItem(1321218285, "Bigges;Morison;5;M");
localStorage.setItem(1321218286, "Henry;Pace;7;P");
localStorage.setItem(1321218287, "Edward;Nunn;2;N");
localStorage.setItem(1321218288, "Master;Wilkie;1;W");
localStorage.setItem(1321218289, "Alexander;Tait;1;T");
localStorage.setItem(1321218290, "John;Fizzell;0;F");
localStorage.setItem(1321218291, "Margery;Kerrel;7;K");
localStorage.setItem(1321218292, "Berde;Downs;3;D");
localStorage.setItem(1321218293, "Captain;Walling;0;W");
localStorage.setItem(1321218295, "Temple;Peterson;2;P");
localStorage.setItem(1321218296, "Swanne;McGown;1;M");
localStorage.setItem(1321218297, "Erasmus;Reeser;5;R");
localStorage.setItem(1321218298, "Pattenson;Mars;4;M");
localStorage.setItem(1321218299, "John;Elder;4;E");
localStorage.setItem(1321218300, "Kelly;McWhinnie;4;M");
localStorage.setItem(1321218301, "Hulme;Corbeille;4;C");
localStorage.setItem(1321218302, "Dennis;Telfer;7;T");
localStorage.setItem(1321218303, "Hatton;McClintock;4;M");
localStorage.setItem(1321218304, "Greville;Bain;5;B");
localStorage.setItem(1321218305, "George;Hornblower;2;H");
localStorage.setItem(1321218306, "captain;McBain;6;M");
localStorage.setItem(1321218307, "Ioseph;Allsop;4;A");
localStorage.setItem(1321218308, "MP;Meckle;4;M");
localStorage.setItem(1321218309, "Fulke;Beaty;2;B");
localStorage.setItem(1321218310, "Captain;Ashdown;0;A");
localStorage.setItem(1321218311, "Foxe;Baston;6;B");
localStorage.setItem(1321218312, "Little;Warburton;0;W");
localStorage.setItem(1321218313, "Master;Quesnel;7;Q");
localStorage.setItem(1321218314, "purser;Creaser;5;C");
localStorage.setItem(1321218315, "Petro;Griffin;3;G");
localStorage.setItem(1321218316, "Plat;Langford;7;L");
localStorage.setItem(1321218317, "als;McWhirter;3;M");
localStorage.setItem(1321218318, "Francis;McKerrier;3;M");
localStorage.setItem(1321218319, "Phevens;Yates;4;Y");
localStorage.setItem(1321218320, "Kings;McQuinie;0;M");
localStorage.setItem(1321218321, "Chapman;Dunndeath;5;D");
localStorage.setItem(1321218322, "mate;Menzies;7;M");
localStorage.setItem(1321218323, "Assistant;Tinsly;4;T");
localStorage.setItem(1321218324, "Gale;Vanormann;3;V");
localStorage.setItem(1321218325, "William;McCutcheon;7;M");
localStorage.setItem(1321218326, "Ralegh;Upton;5;U");
localStorage.setItem(1321218327, "H;Wyman;4;W");
localStorage.setItem(1321218328, "Bigges;Batten;5;B");
localStorage.setItem(1321218329, "Dauid;Pingel;6;P");
localStorage.setItem(1321218330, "Willis;Shannon;7;S");
localStorage.setItem(1321218331, "Bertie;Nimmo;8;N");
localStorage.setItem(1321218332, "Dauid;Rigby;7;R");
localStorage.setItem(1321218333, "brother;Lowrey;8;L");
localStorage.setItem(1321218334, "Greville;McAlliser;6;M");
localStorage.setItem(1321218335, "de;McClenghan;8;M");
localStorage.setItem(1321218336, "Skinner;Grimshaw;8;G");
localStorage.setItem(1321218337, "Holecrt;Semple;2;S");
localStorage.setItem(1321218338, "Lawrence;Livingston;4;L");
localStorage.setItem(1321218339, "Martyn;Gwynne;1;G");
localStorage.setItem(1321218340, "Smart;Bensson;4;B");
localStorage.setItem(1321218341, "Fernandez;Nipluck;2;N");
localStorage.setItem(1321218342, "Richard;Fort;4;F");
localStorage.setItem(1321218343, "Carleill;Willsey;6;W");
localStorage.setItem(1321218344, "Michael;Mosier;0;M");
localStorage.setItem(1321218345, "master;Findlayson;7;F");
localStorage.setItem(1321218346, "Captain;Poston;5;P");
localStorage.setItem(1321218347, "Edmond;Youngson;7;Y");
localStorage.setItem(1321218348, "Clement;Miner;5;M");
localStorage.setItem(1321218349, "Iohn;Haugh;1;H");
localStorage.setItem(1321218350, "Richard;Haslett;4;H");
localStorage.setItem(1321218351, "Harvye;Bombard;2;B");
localStorage.setItem(1321218352, "Philip;Mfett;8;M");
localStorage.setItem(1321218354, "Bishop;Darby;0;D");
localStorage.setItem(1321218355, "Baptista;Addlasnall;3;A");
localStorage.setItem(1321218356, "Mayne;Long;0;L");
localStorage.setItem(1321218357, "Henry;Rickerby;6;R");
localStorage.setItem(1321218358, "Farthowe;Macwood;0;M");
localStorage.setItem(1321218359, "John;Houghton;8;H");
localStorage.setItem(1321218360, "Lieutenant;Cutter;2;C");
localStorage.setItem(1321218361, "Carleill;Addlasnall;6;A");
localStorage.setItem(1321218362, "Griffen;Dobie;2;D");
localStorage.setItem(1321218363, "Kemme;Pardellian;6;P");
localStorage.setItem(1321218364, "gentleman;Adey;7;A");
localStorage.setItem(1321218366, "Hyd;Willbert;4;W");
localStorage.setItem(1321218367, "William;Bowron;6;B");
localStorage.setItem(1321218368, "Mylton;Guilbord;0;G");
localStorage.setItem(1321218369, "George;DeValere;2;D");
localStorage.setItem(1321218370, "gentleman;Kirby;6;K");
localStorage.setItem(1321218371, "Henry;Bagnall;3;B");
localStorage.setItem(1321218372, "Marmaduke;Chalklen;0;C");
localStorage.setItem(1321218373, "Cocke;Perkins;3;P");
localStorage.setItem(1321218374, "Johnson;Coon;0;C");
localStorage.setItem(1321218375, "Recorder;Helm;3;H");
localStorage.setItem(1321218376, "Plat;Hammond;7;H");
localStorage.setItem(1321218377, "John;Brims;2;B");
localStorage.setItem(1321218378, "Glanville;Pelkey;1;P");
localStorage.setItem(1321218379, "John;Liebich;8;L");
localStorage.setItem(1321218381, "White;McAskill;0;M");
localStorage.setItem(1321218382, "Manuel;Cruikshank;5;C");
localStorage.setItem(1321218383, "London;Scot;1;S");
localStorage.setItem(1321218384, "Richard;Steward;3;S");
localStorage.setItem(1321218385, "the;Vinette;5;V");
localStorage.setItem(1321218386, "Fernandez;Chard;8;C");
localStorage.setItem(1321218387, "William;Tittimore;4;T");
localStorage.setItem(1321218388, "Walters;Airston;8;A");
localStorage.setItem(1321218389, "Smart;Sherwood;2;S");
localStorage.setItem(1321218390, "mariner;Woodruff;6;W");
localStorage.setItem(1321218391, "Harrye;Chalklen;5;C");
localStorage.setItem(1321218392, "Lieutenant;Vernet;7;V");
localStorage.setItem(1321218393, "Garden;McKinley;3;M");
localStorage.setItem(1321218394, "de;Holton;1;H");
localStorage.setItem(1321218395, "Whitton;McClintock;3;M");
localStorage.setItem(1321218396, "Walter;Warren;0;W");
localStorage.setItem(1321218397, "Wildye;Ransom;8;R");
localStorage.setItem(1321218398, "Philip;Balfour;4;B");
localStorage.setItem(1321218399, "Acton;McMartine;8;M");
localStorage.setItem(1321218400, "seaman;Hey;0;H");
localStorage.setItem(1321218401, "Edmund;Stewert;7;S");
localStorage.setItem(1321218402, "Robert;Darbyson;3;D");
localStorage.setItem(1321218403, "Master;Bausley;5;B");
localStorage.setItem(1321218405, "Robert;Watty;4;W");
localStorage.setItem(1321218406, "Admiral;Curry;2;C");
localStorage.setItem(1321218407, "Moone;Robage;0;R");
localStorage.setItem(1321218408, "gentleman;Craighton;5;C");
localStorage.setItem(1321218410, "Iames;Roddy;6;R");
localStorage.setItem(1321218411, "Conclude;McKenney;8;M");
localStorage.setItem(1321218412, "Walter;Glender;7;G");
localStorage.setItem(1321218413, "Grenvilles;Rodney;2;R");
localStorage.setItem(1321218414, "Assistant;Gingware;7;G");
localStorage.setItem(1321218415, "John;Bonnay;3;B");
localStorage.setItem(1321218416, "William;Debbie;8;D");
localStorage.setItem(1321218417, "Captain;June;0;J");
localStorage.setItem(1321218418, "Edward;Whittal;2;W");
localStorage.setItem(1321218419, "Prat;Pauchereau;6;P");
localStorage.setItem(1321218420, "Glandvill;Chatterton;0;C");
localStorage.setItem(1321218421, "Chappell;Watchorn;5;W");
localStorage.setItem(1321218422, "Barlowe;Vasy;1;V");
localStorage.setItem(1321218423, "the;Malyon;0;M");
localStorage.setItem(1321218424, "Walter;Burssell;3;B");
localStorage.setItem(1321218425, "Sampson;Lucie;5;L");
localStorage.setItem(1321218427, "John;Colcott;5;C");
localStorage.setItem(1321218428, "Chamberlain;Walton;7;W");
localStorage.setItem(1321218429, "William;Low;0;L");
localStorage.setItem(1321218430, "Knollys;McLenahin;5;M");
localStorage.setItem(1321218431, "Seville;Boonhoer;5;B");
localStorage.setItem(1321218432, "Greene;Lavois;6;L");
localStorage.setItem(1321218433, "Captain;Nielsen;6;N");
localStorage.setItem(1321218434, "Lieutenant;McLuckie;7;M");
localStorage.setItem(1321218435, "Wenefrid;Maither;7;M");
localStorage.setItem(1321218436, "Lane;Giligan;3;G");
localStorage.setItem(1321218437, "Erisey;Smail;1;S");
localStorage.setItem(1321218438, "Thomas;McKinnie;1;M");
localStorage.setItem(1321218439, "appraiser;Reynold;1;R");
localStorage.setItem(1321218441, "Plymouth;Doran;6;D");
localStorage.setItem(1321218442, "Henry;Wadsworth;4;W");
localStorage.setItem(1321218444, "Iohn;Cascadden;0;C");
localStorage.setItem(1321218445, "Jr;Hastie;3;H");
localStorage.setItem(1321218446, "pilot;Ashdown;8;A");
localStorage.setItem(1321218447, "Acton;Champ;8;C");
localStorage.setItem(1321218448, "Dyonis;McCosham;8;M");
localStorage.setItem(1321218449, "Seklemore;Upsone;0;U");
localStorage.setItem(1321218450, "Bygatte;Hay;2;H");
localStorage.setItem(1321218451, "Grant;Gillies;1;G");
localStorage.setItem(1321218452, "mate;Roe;0;R");
localStorage.setItem(1321218453, "mate;McKeegan;6;M");
localStorage.setItem(1321218454, "Barton;Sinkler;4;S");
localStorage.setItem(1321218455, "William;McLatchie;4;M");
localStorage.setItem(1321218456, "Nicholes;Biggar;4;B");
localStorage.setItem(1321218458, "Stilman;Rawstron;6;R");
localStorage.setItem(1321218460, "the;Doway;2;D");
localStorage.setItem(1321218461, "Simon;Andris;4;A");
localStorage.setItem(1321218462, "Lieutenant;Happer;7;H");
localStorage.setItem(1321218463, "Samora;Brinkwork;2;B");
localStorage.setItem(1321218464, "Syluester;Odom;6;O");
localStorage.setItem(1321218465, "Granganimeo;Strong;4;S");
localStorage.setItem(1321218466, "Anthony;Travisee;2;T");
localStorage.setItem(1321218467, "London;Barr;7;B");
localStorage.setItem(1321218468, "charles;Frederick;4;F");
localStorage.setItem(1321218469, "Sir;Wards;6;W");
localStorage.setItem(1321218470, "Simon;Brownrigg;5;B");
localStorage.setItem(1321218471, "Richard;Hincks;3;H");
localStorage.setItem(1321218472, "John;Fryer;7;F");
localStorage.setItem(1321218473, "Captain;Wheelock;7;W");
localStorage.setItem(1321218474, "Syluester;Ouimette;8;O");
localStorage.setItem(1321218475, "Longe;Edward;6;E");
localStorage.setItem(1321218476, "Edward;Hamilton;7;H");
localStorage.setItem(1321218478, "Francis;Sheats;1;S");
localStorage.setItem(1321218479, "Martin;Farr;6;F");
localStorage.setItem(1321218480, "Sergeant;Entwistle;1;E");
localStorage.setItem(1321218481, "Richard;Clemow;6;C");
localStorage.setItem(1321218482, "Powell;Miekle;7;M");
localStorage.setItem(1321218483, "Watts;OBrien;4;O");
localStorage.setItem(1321218484, "Bookener;Nevill;5;N");
localStorage.setItem(1321218485, "Tappan;Elson;2;E");
localStorage.setItem(1321218486, "Wotton;McDuff;3;M");
localStorage.setItem(1321218487, "Francis;Peak;7;P");
localStorage.setItem(1321218488, "Beale;Sheerer;4;S");
localStorage.setItem(1321218489, "Edward;Sherrington;5;S");
localStorage.setItem(1321218490, "Captain;Gleason;4;G");
localStorage.setItem(1321218491, "Edward;Meikle;4;M");
localStorage.setItem(1321218492, "Stevenson;Couton;7;C");
localStorage.setItem(1321218493, "Captain;McAfee;0;M");
localStorage.setItem(1321218494, "Captain;Adie;4;A");
localStorage.setItem(1321218495, "Lopez;Favreau;1;F");
localStorage.setItem(1321218496, "Gabriell;Boice;3;B");
localStorage.setItem(1321218497, "Master;McDowell;3;M");
localStorage.setItem(1321218498, "Recorder;Thistleton;3;T");
localStorage.setItem(1321218499, "Master;Blakely;2;B");
localStorage.setItem(1321218500, "Burden;Walters;3;W");
localStorage.setItem(1321218501, "Master;Sherwell;6;S");
localStorage.setItem(1321218502, "Foxe;Bourns;5;B");
localStorage.setItem(1321218503, "Thomas;Nichols;6;N");
localStorage.setItem(1321218504, "mbr;Stuart;6;S");
localStorage.setItem(1321218505, "Henry;Gall;2;G");
localStorage.setItem(1321218506, "Ananias;Thornlay;1;T");
localStorage.setItem(1321218507, "Captain;Buckham;5;B");
localStorage.setItem(1321218508, "Gerrard;Cooke;2;C");
localStorage.setItem(1321218510, "Russe;Macfie;4;M");
localStorage.setItem(1321218511, "John;Keilman;7;K");
localStorage.setItem(1321218512, "Master;Dengate;8;D");
localStorage.setItem(1321218513, "Sampson;Telfer;6;T");
localStorage.setItem(1321218514, "Bailie;Sieveright;5;S");
localStorage.setItem(1321218515, "Cage;McKenerick;8;M");
localStorage.setItem(1321218516, "Captain;Birkbeck;2;B");
localStorage.setItem(1321218517, "Master;Fountain;6;F");
localStorage.setItem(1321218518, "Hugh;MacDonald;1;M");
localStorage.setItem(1321218519, "Darby;Buchanan;4;B");
localStorage.setItem(1321218520, "Scroope;Kendale;0;K");
localStorage.setItem(1321218521, "Bagge;Alger;3;A");
localStorage.setItem(1321218522, "Edward;Sumners;6;S");
localStorage.setItem(1321218523, "William;OKeefe;3;O");
localStorage.setItem(1321218524, "Captain;Benton;6;B");
localStorage.setItem(1321218525, "Wylliam;Hartigan;4;H");
localStorage.setItem(1321218526, "Francis;Metcalf;4;M");
localStorage.setItem(1321218527, "Cooper;Sumerville;7;S");
localStorage.setItem(1321218528, "Scrivener;McAlpine;2;M");
localStorage.setItem(1321218529, "Cates;Padley;6;P");
localStorage.setItem(1321218530, "Fenner;Lutton;4;L");
localStorage.setItem(1321218531, "Wenefrid;Winterbottom;6;W");
localStorage.setItem(1321218532, "Henry;Bouchette;8;B");
localStorage.setItem(1321218533, "Rottenbury;Ewart;0;E");
localStorage.setItem(1321218534, "Chappell;Tinsley;3;T");
localStorage.setItem(1321218535, "Edward;Kaddy;4;K");
localStorage.setItem(1321218536, "John;Gifford;5;G");
localStorage.setItem(1321218538, "George;Chayne;8;C");
localStorage.setItem(1321218539, "Ioseph;Vipond;0;V");
localStorage.setItem(1321218540, "John;Fee;6;F");
localStorage.setItem(1321218541, "Henry;Janow;7;J");
localStorage.setItem(1321218543, "Plymouth;Clow;4;C");
localStorage.setItem(1321218544, "Powell;Wager;8;W");
localStorage.setItem(1321218545, "Elizabeth;Lunan;0;L");
localStorage.setItem(1321218546, "Hance;Bicknell;3;B");
localStorage.setItem(1321218547, "Linsey;McLaughlin;7;M");
localStorage.setItem(1321218548, "General;Loucks;4;L");
localStorage.setItem(1321218549, "Thomas;Pheres;8;P");
localStorage.setItem(1321218550, "Ralph;Connors;2;C");
localStorage.setItem(1321218551, "Farthowe;Vass;0;V");
localStorage.setItem(1321218552, "Barton;Rutherford;0;R");
localStorage.setItem(1321218553, "soldier;Palmer;4;P");
localStorage.setItem(1321218554, "Rogers;Charette;6;C");
localStorage.setItem(1321218555, "Limehouse;Dunberry;4;D");
localStorage.setItem(1321218556, "Assistant;Sims;0;S");
localStorage.setItem(1321218557, "Henry;Rife;1;R");
localStorage.setItem(1321218558, "Edward;Struther;1;S");
localStorage.setItem(1321218559, "William;Houston;1;H");
localStorage.setItem(1321218560, "John;Shirra;8;S");
localStorage.setItem(1321218561, "Poole;Pearce;8;P");
localStorage.setItem(1321218562, "Master;Minney;6;M");
localStorage.setItem(1321218563, "Thomas;Raine;1;R");
localStorage.setItem(1321218564, "Waterhouse;Darnell;0;D");
localStorage.setItem(1321218565, "merchant;McClaren;1;M");
localStorage.setItem(1321218566, "Hyd;Livingston;4;L");
localStorage.setItem(1321218567, "Vasse;McDowall;5;M");
localStorage.setItem(1321218568, "Walsingham;Briggs;1;B");
localStorage.setItem(1321218569, "Thomas;Kardos;1;K");
localStorage.setItem(1321218570, "Joyce;Sear;1;S");
localStorage.setItem(1321218571, "Warner;Burlingame;0;B");
localStorage.setItem(1321218572, "elder;Fife;4;F");
localStorage.setItem(1321218573, "Chichester;Cowles;6;C");
localStorage.setItem(1321218574, "Bigges;Facer;3;F");
localStorage.setItem(1321218575, "Joan;Clyde;5;C");
localStorage.setItem(1321218576, "Powell;Dick;0;D");
localStorage.setItem(1321218577, "mariner;Colwell;8;C");
localStorage.setItem(1321218579, "Middle;Racey;3;R");
localStorage.setItem(1321218580, "Watts;Blackall;6;B");
localStorage.setItem(1321218581, "Beniamin;McCurdy;8;M");
localStorage.setItem(1321218582, "Lord;Nielsen;3;N");
localStorage.setItem(1321218583, "Master;Wardner;8;W");
localStorage.setItem(1321218584, "Captain;McLaren;7;M");
localStorage.setItem(1321218585, "Russell;Roantree;4;R");
localStorage.setItem(1321218586, "Edward;Huot;2;H");
localStorage.setItem(1321218587, "Maruyn;Coward;2;C");
localStorage.setItem(1321218588, "Humfrey;Neal;4;N");
localStorage.setItem(1321218589, "Edward;McGugan;5;M");
localStorage.setItem(1321218590, "Thomas;Holm;3;H");
localStorage.setItem(1321218591, "Limehouse;Davey;8;D");
localStorage.setItem(1321218592, "Knollys;Gilland;7;G");
localStorage.setItem(1321218593, "William;Tinning;0;T");
localStorage.setItem(1321218594, "Master;Valpy;6;V");
localStorage.setItem(1321218595, "Thomas;Chapman;7;C");
localStorage.setItem(1321218596, "Skinner;Nicols;3;N");
localStorage.setItem(1321218597, "Cornieles;Gillis;8;G");
localStorage.setItem(1321218598, "Rey;Aston;7;A");
localStorage.setItem(1321218599, "Roger;Calwell;8;C");
localStorage.setItem(1321218600, "Jane;Garnett;6;G");
localStorage.setItem(1321218601, "Iohn;Story;5;S");
localStorage.setItem(1321218602, "Lane;Cronkwrite;0;C");
localStorage.setItem(1321218603, "Davys;Lowry;4;L");
localStorage.setItem(1321218604, "Thomas;Crothers;1;C");
localStorage.setItem(1321218605, "Walsingham;Boudreau;5;B");
localStorage.setItem(1321218606, "William;Jacobs;8;J");
localStorage.setItem(1321218607, "Thomas;Horning;7;H");
localStorage.setItem(1321218608, "master;Mayne;5;M");
localStorage.setItem(1321218609, "Sir;Goudy;3;G");
localStorage.setItem(1321218611, "Pew;MacMaster;3;M");
localStorage.setItem(1321218612, "Warner;MacDonell;2;M");
localStorage.setItem(1321218613, "Cutbert;Frary;0;F");
localStorage.setItem(1321218614, "Edward;Smallwood;3;S");
localStorage.setItem(1321218615, "Bevis;Sitiford;4;S");
localStorage.setItem(1321218616, "Assistant;Houston;1;H");
localStorage.setItem(1321218617, "Hampton;Fuster;3;F");
localStorage.setItem(1321218618, "John;Diman;2;D");
localStorage.setItem(1321218619, "Master;Morgan;3;M");
localStorage.setItem(1321218620, "John;Tait;1;T");
localStorage.setItem(1321218621, "Waterhouse;Stirling;7;S");
localStorage.setItem(1321218622, "Starkey;Creagh;7;C");
localStorage.setItem(1321218623, "Butler;Abott;2;A");
localStorage.setItem(1321218624, "Captain;Addlasnall;3;A");
localStorage.setItem(1321218625, "Thorne;Farr;0;F");
localStorage.setItem(1321218626, "Adams;Lackie;4;L");
localStorage.setItem(1321218627, "Cocke;Gruer;5;G");
localStorage.setItem(1321218628, "Edmond;McGarr;2;M");
localStorage.setItem(1321218629, "William;Fenton;3;F");
localStorage.setItem(1321218630, "Russe;Crawford;4;C");
localStorage.setItem(1321218631, "Aubry;McCandlish;0;M");
localStorage.setItem(1321218632, "Cavendish;Coglan;0;C");
localStorage.setItem(1321218633, "Robyns;Arnold;8;A");
localStorage.setItem(1321218635, "Richard;Barth;2;B");
localStorage.setItem(1321218636, "Tydway;Beddy;1;B");
localStorage.setItem(1321218637, "Richard;Buck;5;B");
localStorage.setItem(1321218638, "Allen;Dangerfield;1;D");
localStorage.setItem(1321218640, "Cates;Walsh;0;W");
localStorage.setItem(1321218641, "Roger;Spedon;3;S");
localStorage.setItem(1321218642, "Manteo;Dangerfield;5;D");
localStorage.setItem(1321218643, "Bagge;MacEachern;8;M");
localStorage.setItem(1321218644, "Edward;Lauzon;8;L");
localStorage.setItem(1321218645, "Richard;Holmes;2;H");
localStorage.setItem(1321218646, "Newcastle;Caine;1;C");
localStorage.setItem(1321218647, "soldier;Barnard;8;B");
localStorage.setItem(1321218648, "William;McRoberts;1;M");
localStorage.setItem(1321218649, "Limehouse;Popple;1;P");
localStorage.setItem(1321218650, "Moonlight;de;2;D");
localStorage.setItem(1321218651, "Richard;Hadley;7;H");
localStorage.setItem(1321218652, "John;Bartley;8;B");
localStorage.setItem(1321218653, "Barlowe;Sandilands;8;S");
localStorage.setItem(1321218654, "Whyte;Mongeon;0;M");
localStorage.setItem(1321218655, "John;Lapell;3;L");
localStorage.setItem(1321218656, "Jr;Landi;4;L");
localStorage.setItem(1321218658, "Margaret;Clemie;7;C");
localStorage.setItem(1321218659, "John;McClanaghan;1;M");
localStorage.setItem(1321218660, "gentleman;Fish;2;F");
localStorage.setItem(1321218661, "Dare;Murray;5;M");
localStorage.setItem(1321218662, "Wanchese;Cotton;1;C");
localStorage.setItem(1321218663, "Vincent;Oertan;0;O");
localStorage.setItem(1321218664, "Clarke;Anderton;2;A");
localStorage.setItem(1321218665, "Job;Aubrey;8;A");
localStorage.setItem(1321218666, "Fulke;Hesson;0;H");
localStorage.setItem(1321218667, "Hawkins;Maine;0;M");
localStorage.setItem(1321218668, "Richard;Ready;4;R");
localStorage.setItem(1321218670, "Powell;Fife;6;F");
localStorage.setItem(1321218671, "Captain;Bancrt;1;B");
localStorage.setItem(1321218672, "Captain;Whyte;2;W");
localStorage.setItem(1321218673, "Moonlight;Whimbey;4;W");
localStorage.setItem(1321218674, "Alonzo;Rowbotham;5;R");
localStorage.setItem(1321218675, "Little;Sideboard;0;S");
localStorage.setItem(1321218676, "Henry;Ingram;7;I");
localStorage.setItem(1321218677, "Marke;Buchannan;5;B");
localStorage.setItem(1321218678, "grocer;Pervis;2;P");
localStorage.setItem(1321218679, "Nicholls;Helm;7;H");
localStorage.setItem(1321218680, "Lte;Bellamy;0;B");
localStorage.setItem(1321218681, "Ralph;Gilgan;2;G");
localStorage.setItem(1321218682, "Thomas;Crossley;8;C");
localStorage.setItem(1321218683, "Hyd;Tierney;3;T");
localStorage.setItem(1321218684, "Acton;Brassington;6;B");
localStorage.setItem(1321218685, "ironmonger;Locherby;0;L");
localStorage.setItem(1321218687, "chaplain;Forrester;2;F");
localStorage.setItem(1321218688, "Norris;Livingston;4;L");
localStorage.setItem(1321218689, "Edward;Poston;1;P");
localStorage.setItem(1321218690, "Jones;Finsley;3;F");
localStorage.setItem(1321218691, "William;Faloon;3;F");
localStorage.setItem(1321218692, "Nicholas;Hogel;7;H");
localStorage.setItem(1321218693, "Crtes;Ovans;2;O");
localStorage.setItem(1321218694, "Master;Emaris;4;E");
localStorage.setItem(1321218695, "Captain;Jenkins;6;J");
localStorage.setItem(1321218696, "Luddington;Nesbit;0;N");
localStorage.setItem(1321218697, "Thomas;Gaeles;2;G");
localStorage.setItem(1321218698, "the;McKinnie;4;M");
localStorage.setItem(1321218700, "Harvie;Kees;8;K");
localStorage.setItem(1321218701, "Cooper;McNaughton;4;M");
localStorage.setItem(1321218702, "Henry;MacFarlande;2;M");
localStorage.setItem(1321218703, "John;Warrington;0;W");
localStorage.setItem(1321218704, "Captain;Fennell;6;F");
localStorage.setItem(1321218705, "John;Fry;4;F");
localStorage.setItem(1321218706, "Thomas;Clingen;4;C");
localStorage.setItem(1321218707, "Lucas;Mattison;1;M");
localStorage.setItem(1321218708, "William;Beddie;3;B");
localStorage.setItem(1321218710, "Wylliam;Cyr;8;C");
localStorage.setItem(1321218711, "Pomarie;Parson;6;P");
localStorage.setItem(1321218713, "Cottell;Lomer;5;L");
localStorage.setItem(1321218714, "Hugh;Story;2;S");
localStorage.setItem(1321218715, "Harry;Upham;0;U");
localStorage.setItem(1321218716, "Captain;LaBlanc;8;L");
localStorage.setItem(1321218717, "Gilman;Rabideau;8;R");
localStorage.setItem(1321218718, "Seklemore;Fewan;1;F");
localStorage.setItem(1321218719, "Ioseph;Jaires;1;J");
localStorage.setItem(1321218720, "surgion;Lucie;2;L");
localStorage.setItem(1321218721, "John;Twambly;8;T");
localStorage.setItem(1321218722, "Moonlight;Smallman;1;S");
localStorage.setItem(1321218723, "Assistant;OConnor;4;O");
localStorage.setItem(1321218724, "Butler;Sutherland;7;S");
localStorage.setItem(1321218725, "Fulke;Marcau;2;M");
localStorage.setItem(1321218727, "Hawkins;Baron;4;B");
localStorage.setItem(1321218728, "Amyas;Shephard;3;S");
localStorage.setItem(1321218729, "Baily;McGarvey;4;M");
localStorage.setItem(1321218730, "William;Ballantyne;0;B");
localStorage.setItem(1321218731, "goldsmith;Pierce;0;P");
localStorage.setItem(1321218732, "William;Dickinson;8;D");
localStorage.setItem(1321218733, "John;Reilly;7;R");
localStorage.setItem(1321218734, "John;Longeway;0;L");
localStorage.setItem(1321218735, "Rufoote;Slone;2;S");
localStorage.setItem(1321218736, "Butler;Butterfield;7;B");
localStorage.setItem(1321218737, "Captain;Hanson;1;H");
localStorage.setItem(1321218738, "Holecrt;Lafleur;3;L");
localStorage.setItem(1321218739, "Gramme;Sinkler;6;S");
localStorage.setItem(1321218740, "Villa;Roberts;8;R");
localStorage.setItem(1321218741, "Linsey;Poiquette;2;P");
localStorage.setItem(1321218742, "John;Pemberton;1;P");
localStorage.setItem(1321218743, "Admiral;Pennie;8;P");
localStorage.setItem(1321218744, "Lane;McEndoo;1;M");
localStorage.setItem(1321218745, "John;Cattanach;7;C");
localStorage.setItem(1321218746, "Bedford;Rennick;5;R");
localStorage.setItem(1321218747, "the;Thurston;4;T");
localStorage.setItem(1321218748, "Hawkins;Willsey;2;W");
localStorage.setItem(1321218749, "Lane;Maddock;4;M");
localStorage.setItem(1321218750, "Thomas;Donolly;1;D");
localStorage.setItem(1321218751, "William;Greenman;3;G");
localStorage.setItem(1321218752, "Francis;Vickerman;8;V");
localStorage.setItem(1321218753, "Howe;Exley;8;E");
localStorage.setItem(1321218754, "Jane;Moncay;7;M");
localStorage.setItem(1321218755, "Gostigo;Steele;6;S");
localStorage.setItem(1321218756, "expedition;McAskill;8;M");
localStorage.setItem(1321218757, "Elizabeth;Ainsworth;6;A");
localStorage.setItem(1321218758, "Edward;Law;6;L");
localStorage.setItem(1321218759, "Henry;Adamson;2;A");
localStorage.setItem(1321218760, "Master;Brownrigg;3;B");
localStorage.setItem(1321218761, "Newsome;Work;0;W");
localStorage.setItem(1321218762, "Latham;Currie;3;C");
localStorage.setItem(1321218763, "Ireland;Ward;4;W");
localStorage.setItem(1321218764, "Mason;Millin;1;M");
localStorage.setItem(1321218765, "Andrew;Goss;3;G");
localStorage.setItem(1321218766, "William;Grisdale;2;G");
localStorage.setItem(1321218768, "Richard;Lavery;4;L");
localStorage.setItem(1321218769, "William;Callaghan;1;C");
localStorage.setItem(1321218770, "Chapman;McLune;2;M");
localStorage.setItem(1321218771, "Dier;Dixon;3;D");
localStorage.setItem(1321218772, "Fernandez;Sommerville;2;S");
localStorage.setItem(1321218773, "servant;Sever;6;S");
localStorage.setItem(1321218774, "Newport;Fryer;0;F");
localStorage.setItem(1321218775, "purser;Cume;8;C");
localStorage.setItem(1321218776, "Master;Visuri;0;V");
localStorage.setItem(1321218777, "grocer;Appleton;4;A");
localStorage.setItem(1321218778, "Foxe;Barrow;8;B");
localStorage.setItem(1321218779, "William;Learmonth;7;L");
localStorage.setItem(1321218780, "Robert;Kneeshaw;5;K");
localStorage.setItem(1321218781, "Frobisher;Vanvliet;0;V");
localStorage.setItem(1321218783, "Captain;Christie;8;C");
localStorage.setItem(1321218784, "appraiser;Spence;8;S");
localStorage.setItem(1321218785, "Captain;Neily;6;N");
localStorage.setItem(1321218786, "Crosse;Derbson;6;D");
localStorage.setItem(1321218787, "Randall;Sinicale;4;S");
localStorage.setItem(1321218788, "mariner;Coultrie;5;C");
localStorage.setItem(1321218789, "Thomas;Currens;3;C");
localStorage.setItem(1321218790, "Dutton;Bunce;7;B");
localStorage.setItem(1321218791, "Amyas;Maguire;6;M");
localStorage.setItem(1321218792, "William;Burssell;5;B");
localStorage.setItem(1321218794, "Iohn;Thorpe;5;T");
localStorage.setItem(1321218795, "Governor;Moncrieff;8;M");
localStorage.setItem(1321218796, "Christopher;McCord;4;M");
localStorage.setItem(1321218797, "William;Kilpatrick;0;K");
localStorage.setItem(1321218798, "Chapman;Stinson;1;S");
localStorage.setItem(1321218799, "Marler;Laduc;5;L");
localStorage.setItem(1321218800, "Bishop;Fortier;3;F");
localStorage.setItem(1321218801, "Bridger;Pringle;4;P");
localStorage.setItem(1321218802, "Cheven;Sheppard;3;S");
localStorage.setItem(1321218803, "Assistant;Rider;1;R");
localStorage.setItem(1321218804, "Jonas;McCallah;5;M");
localStorage.setItem(1321218805, "Polyson;Gilogan;1;G");
localStorage.setItem(1321218806, "Frauncis;Sheets;0;S");
localStorage.setItem(1321218807, "Captain;Finlayson;5;F");
localStorage.setItem(1321218808, "Master;Ayceard;0;A");
localStorage.setItem(1321218809, "master;Lang;4;L");
localStorage.setItem(1321218810, "Assistant;Foster;4;F");
localStorage.setItem(1321218811, "Hugh;Mayhew;4;M");
localStorage.setItem(1321218812, "Dimmocke;Derrick;1;D");
localStorage.setItem(1321218813, "Lieutenant;Border;2;B");
localStorage.setItem(1321218814, "John;Hutcheson;0;H");
localStorage.setItem(1321218815, "Richard;Guertin;5;G");
localStorage.setItem(1321218816, "Master;DeWolfe;6;D");
localStorage.setItem(1321218817, "Richard;Hopping;0;H");
localStorage.setItem(1321218818, "Robert;Cummings;3;C");
localStorage.setItem(1321218819, "John;Gregg;3;G");
localStorage.setItem(1321218820, "Iohn;Ardah;3;A");
localStorage.setItem(1321218821, "Richard;Naron;2;N");
localStorage.setItem(1321218822, "Dyonis;Wing;5;W");
localStorage.setItem(1321218823, "Lieutenant;Maycott;7;M");
localStorage.setItem(1321218824, "Bennet;Fiddes;1;F");
localStorage.setItem(1321218825, "Hakluyt;Knely;0;K");
localStorage.setItem(1321218826, "Jane;McBrity;6;M");
localStorage.setItem(1321218827, "later;Crighton;3;C");
localStorage.setItem(1321218828, "the;Sullivan;8;S");
localStorage.setItem(1321218829, "MP;Cloons;1;C");
localStorage.setItem(1321218830, "Domingo;Riley;3;R");
localStorage.setItem(1321218831, "Henry;Critchfield;0;C");
localStorage.setItem(1321218832, "Constable;Hurlbert;3;H");
localStorage.setItem(1321218833, "William;Mattinson;6;M");
localStorage.setItem(1321218836, "Gamage;Rupert;2;R");
localStorage.setItem(1321218837, "Deane;Sinclair;3;S");
localStorage.setItem(1321218838, "Master;Van;4;V");
localStorage.setItem(1321218839, "Assistant;McWinnie;4;M");
localStorage.setItem(1321218840, "country;Mikle;2;M");
localStorage.setItem(1321218841, "Aubry;Boswick;0;B");
localStorage.setItem(1321218842, "Brocke;Pinhay;4;P");
localStorage.setItem(1321218843, "White;Atcheson;3;A");
localStorage.setItem(1321218844, "Philip;Sturgeon;7;S");
localStorage.setItem(1321218845, "Amades;Utton;4;U");
localStorage.setItem(1321218846, "William;Henshaw;0;H");
localStorage.setItem(1321218847, "Captain;Massy;0;M");
localStorage.setItem(1321218848, "Wilson;Morton;0;M");
localStorage.setItem(1321218849, "Ioseph;Putman;2;P");
localStorage.setItem(1321218850, "Burden;Severight;7;S");
localStorage.setItem(1321218851, "Kettell;Crowe;4;C");
localStorage.setItem(1321218852, "John;Bullions;7;B");
localStorage.setItem(1321218853, "Finch;Gray;3;G");
localStorage.setItem(1321218854, "Harry;Mfatt;5;M");
localStorage.setItem(1321218855, "Bishop;Donolly;4;D");
localStorage.setItem(1321218856, "Fulforde;Driver;4;D");
localStorage.setItem(1321218857, "Allyne;Guilbord;4;G");
localStorage.setItem(1321218858, "Lyne;Eaves;7;E");
localStorage.setItem(1321218859, "Thomas;Levque;5;L");
localStorage.setItem(1321218860, "de;Clemas;3;C");
localStorage.setItem(1321218861, "George;Royle;0;R");
localStorage.setItem(1321218863, "Thomas;Larrie;2;L");
localStorage.setItem(1321218864, "Fulke;Lilly;6;L");
localStorage.setItem(1321218865, "Careless;Dundass;6;D");
localStorage.setItem(1321218866, "Admiral;Kavener;0;K");
localStorage.setItem(1321218867, "appraiser;MacBean;0;M");
localStorage.setItem(1321218868, "Prat;Crighton;6;C");
localStorage.setItem(1321218869, "Wisse;Sawyers;8;S");
localStorage.setItem(1321218870, "appraiser;Beek;6;B");
localStorage.setItem(1321218871, "Limehouse;McLennan;3;M");
localStorage.setItem(1321218872, "Grenville;Mathieson;1;M");
localStorage.setItem(1321218873, "Sparrowe;Lacombe;2;L");
localStorage.setItem(1321218874, "Marler;Lipsey;3;L");
localStorage.setItem(1321218875, "Kings;Rae;8;R");
localStorage.setItem(1321218876, "Lasie;Jane;0;J");
localStorage.setItem(1321218877, "Kelle;Coote;0;C");
localStorage.setItem(1321218878, "Gomez;Loudan;4;L");
localStorage.setItem(1321218879, "Hawkins;Boardman;6;B");
localStorage.setItem(1321218880, "William;Colwell;7;C");
localStorage.setItem(1321218881, "Captain;Morrison;7;M");
localStorage.setItem(1321218883, "Atkinson;Goudy;6;G");
localStorage.setItem(1321218884, "Newsome;Barrett;3;B");
localStorage.setItem(1321218885, "Lopez;Fitzimons;0;F");
localStorage.setItem(1321218886, "Crtes;Simard;6;S");
localStorage.setItem(1321218887, "Richard;Marceau;6;M");
localStorage.setItem(1321218888, "Macklyn;Keerfoot;3;K");
localStorage.setItem(1321218889, "George;Watson;6;W");
localStorage.setItem(1321218890, "Stevens;Leroise;2;L");
localStorage.setItem(1321218891, "charles;Perole;3;P");
localStorage.setItem(1321218892, "Ferdinando;Boodah;3;B");
localStorage.setItem(1321218893, "George;Nelson;2;N");
localStorage.setItem(1321218894, "Captain;House;6;H");
localStorage.setItem(1321218895, "Ogle;Twitching;4;T");
localStorage.setItem(1321218896, "Major;Caruthers;5;C");
localStorage.setItem(1321218897, "Harding;Keeler;7;K");
localStorage.setItem(1321218898, "John;Twambley;2;T");
localStorage.setItem(1321218899, "prize;Holbrock;5;H");
localStorage.setItem(1321218900, "Vasse;McDonnel;0;M");
localStorage.setItem(1321218901, "Gernandes;Haller;5;H");
localStorage.setItem(1321218902, "Captain;Platt;6;P");
localStorage.setItem(1321218903, "Bremige;Barlough;2;B");
localStorage.setItem(1321218904, "James;Semple;1;S");
localStorage.setItem(1321218905, "Dimmocke;McEndoo;4;M");
localStorage.setItem(1321218906, "Hawkins;Symmons;1;S");
localStorage.setItem(1321218907, "Peter;Lasadine;8;L");
localStorage.setItem(1321218908, "Edward;Byrne;5;B");
localStorage.setItem(1321218909, "Wynter;Sherwin;3;S");
localStorage.setItem(1321218910, "Lane;McRay;5;M");
localStorage.setItem(1321218911, "Iames;Davidson;6;D");
localStorage.setItem(1321218912, "Prat;Rea;0;R");
localStorage.setItem(1321218913, "Edward;Crow;7;C");
localStorage.setItem(1321218914, "Stevenson;Lathamby;5;L");
localStorage.setItem(1321218915, "Chaundeler;Hynes;2;H");
localStorage.setItem(1321218916, "Lieutenant;Daoust;6;D");
localStorage.setItem(1321218917, "Iohn;Stuart;5;S");
localStorage.setItem(1321218919, "Hawkins;Krans;1;K");
localStorage.setItem(1321218920, "Elizabeth;Sangster;6;S");
localStorage.setItem(1321218921, "William;McGaw;8;M");
localStorage.setItem(1321218922, "Lionel;Hulburt;6;H");
localStorage.setItem(1321218923, "Chichester;Treadwell;0;T");
localStorage.setItem(1321218924, "Henry;Hart;7;H");
localStorage.setItem(1321218925, "Darige;Steven;4;S");
localStorage.setItem(1321218926, "Payne;Coverdale;5;C");
localStorage.setItem(1321218927, "Ioseph;Helyer;6;H");
localStorage.setItem(1321218928, "Vincent;McGregor;0;M");
localStorage.setItem(1321218929, "Bedford;Neely;4;N");
localStorage.setItem(1321218930, "Fulforde;McRay;8;M");
localStorage.setItem(1321218931, "Darby;Vass;4;V");
localStorage.setItem(1321218932, "Robyns;Vandem;7;V");
localStorage.setItem(1321218933, "Robert;Greenaway;6;G");
localStorage.setItem(1321218934, "Grenville;Hughey;8;H");
localStorage.setItem(1321218935, "Edward;Pattison;8;P");
localStorage.setItem(1321218936, "Scroope;Piper;4;P");
localStorage.setItem(1321218937, "Moonlight;Herman;7;H");
localStorage.setItem(1321218938, "Warner;Crutchfield;3;C");
localStorage.setItem(1321218939, "Ellis;Pritchard;3;P");
localStorage.setItem(1321218940, "Knotford;Hanes;5;H");
localStorage.setItem(1321218941, "Arnold;Fides;7;F");
localStorage.setItem(1321218942, "elder;McWhinnie;1;M");
localStorage.setItem(1321218943, "Henry;Chilton;4;C");

}
