String.prototype.strReverse = function() {
	var newstring = "";
	for (var s=0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;
};

function passwordScore(password) {
  
  var score=0; // Starting score
  var letters = "abcdefghijklmnopqrstuvwxyz";
	var numbers = "01234567890";
	var symbols = ")!@#$%^&*()";
	var seqLength = 3;
	var minPasswordLength = 8;
  
  // Character Counters
  var countUpperCase=0, countConsecUpperCase=0;
  var countLowerCase=0, countConsecLowerCase=0;
  var countNumbers=0, countConsecNumbers=0;
  var countSymbols=0, countConsecSymbols=0, countComplexity=0;
  var countSeqLetters=0, countSeqNumbers=0, countSeqSymbols=0;
  var countMiddleChars=0, countRepeatChars=0, countUniqueChars=0;
  
  var onlyLetters = true, onlyNumbers = true;
  var scoreRepeatChars=0;
  
  // Multipliers
  var multLength=4, multNumber=4;
  
  if (password) {
    var length = password.length;
    
    // Loop through each character of password and count character types
    var currentChar;
    for (var i=0; i < length; i++) {
      
      // Upper Case Checks
      if (password.charAt(i).match(/[A-Z]/g)) {
        countUpperCase++;
        onlyNumbers = false;
        // Check for consecutive Upper Case characters
        if (password.charAt(i-1).match(/[A-Z]/g)) {
          countConsecUpperCase++;
        }
      }
      
      // Lower Case Checks
      if (password.charAt(i).match(/[a-z]/g)) {
        countLowerCase++;
        onlyNumbers = false;
        if (password.charAt(i-1).match(/[a-z]/g)) {
          countConsecLowerCase++;
        }
      }
      
      // Number Checks
      if (password.charAt(i).match(/[0-9]/g)) {
        countNumbers++;
        onlyLetters = false;
        if (i>0 && i<(length-1)) {
          countMiddleChars++;
        }
        if (password.charAt(i-1).match(/[0-9]/g)) {
          countConsecNumbers++;
        }
      }
      
      // Symbol Checks
      if (password.charAt(i).match(/[^a-zA-Z0-9]/g)) {
        countSymbols++;
        onlyLetters = false;
        onlyNumbers = false;
        if (i>0 && i<(length-1)) {
          countMiddleChars++;
        }
        if (password.charAt(i-1).match(/[^a-zA-Z0-9]/g)) {
          countConsecSymbols++;
        }
      }
      
      // Repeat characters
      var repeatCharExists = false;
      for (var j=0; j < length; j++) {
        if (password.charAt(i) == password.charAt(j) && i != j) {
          // Character has already been used
          repeatCharExists = true;
          // Add score based on distance from repeated character
          scoreRepeatChars += Math.abs(length/(j-i));
        }
      }
      if (repeatCharExists) {
        countRepeatChars++;
        countUniqueChars = length-countRepeatChars;
        // Normalize score based on ratio of repeated to unique characters
        scoreRepeatChars = countUniqueChars ? Math.ceil(scoreRepeatChars/countUniqueChars) : Math.ceil(scoreRepeatChars);
      }
    }
    
    // Check for sequential letters (forward and reverse)
		for (var i=0; i<(letters.length-seqLength); i++) {
			var sFwd = letters.substring(i,parseInt(i+seqLength));
			var sRev = sFwd.strReverse();
			if (password.toLowerCase().indexOf(sFwd) != -1 || password.toLowerCase().indexOf(sRev) != -1) { 
			  countSeqLetters++;
			}
		}
		
		// Check for sequential numbers (forward and reverse)
		for (var i=0; i<(numbers.length-seqLength); i++) {
			var sFwd = numbers.substring(i,parseInt(i+seqLength));
			var sRev = sFwd.strReverse();
			if (password.toLowerCase().indexOf(sFwd) != -1 || password.toLowerCase().indexOf(sRev) != -1) { 
			  countSeqNumbers++;
			}
		}
		
		// Check for sequential symbols (forward and reverse)
		for (var i=0; i<(symbols.length-seqLength); i++) {
			var sFwd = symbols.substring(i,parseInt(i+seqLength));
			var sRev = sFwd.strReverse();
			if (password.toLowerCase().indexOf(sFwd) != -1 || password.toLowerCase().indexOf(sRev) != -1) { 
			  countSeqSymbols++;
			}
		}
		
		// Password complexity
		if (countUpperCase > 0) {countComplexity++};
		if (countLowerCase > 0) {countComplexity++};
		if (countNumbers > 0) {countComplexity++};
		if (countSymbols > 0) {countComplexity++};
		countComplexity = length >= minPasswordLength ? countComplexity+1 : 0;
    
    // Number of Characters +(n*4)
    var scoreLength = parseInt(length * multLength);
    // Uppercase Letters +((len-n)*2)
    var scoreUpperCase = countUpperCase === 0 ? 0 : parseInt((length-countUpperCase)*2);
    // Lower Letters +((len-n)*2)
    var scoreLowerCase = countLowerCase === 0 ? 0 : parseInt((length-countLowerCase)*2);
    // Numbers +(n*4)
    var scoreNumbers = onlyNumbers ? 0 : parseInt(countNumbers*4);
    // Symbols +(n*6)
    var scoreSymbols = parseInt(countSymbols*6);
    // Middle Numbers or Symbols +(n*2)
    var scoreMiddleChars = parseInt(countMiddleChars*2);
    // Password Complexity +(n*2)
    var scoreComplexity = parseInt(countComplexity*2);
    
    // Letters Only
    var scoreonlyLetters = onlyLetters ? length : 0;
    // Numbers Only
    var scoreonlyNumbers = onlyNumbers ? length : 0;
    // Repeat Characters
    var scoreRepeatChars = countRepeatChars ? scoreRepeatChars : 0;
    // Consecutive Uppercase Letters -(n*2)
    var scoreConsecUpperCase = parseInt(countConsecUpperCase*2);
    // Consecutive Lower Letters -(n*2)
    var scoreConsecLowerCase = parseInt(countConsecLowerCase*2);
    // Consecutive Numbers -(n*2)
    var scoreConsecNumbers = parseInt(countConsecNumbers*2);
    // Sequential Letters -(n*3)
    var scoreSeqLetters = parseInt(countSeqLetters*3);
    // Sequential Numbers -(n*3)
    var scoreSeqNumbers = parseInt(countSeqNumbers*3);
    // Sequential Symbols -(n*3)
    var scoreSeqSymbols = parseInt(countSeqSymbols*3);
    
    score += scoreLength + scoreUpperCase + scoreLowerCase + scoreNumbers;
    score += scoreSymbols + scoreMiddleChars + scoreComplexity;
    score -= scoreonlyLetters + scoreonlyNumbers + scoreRepeatChars;
    score -= scoreConsecUpperCase + scoreConsecLowerCase + scoreConsecNumbers;
    score -= scoreSeqLetters + scoreSeqNumbers + scoreSeqSymbols;
    
    // Normalize score between 0-100
    if (score > 100) {
      score = 100;
    } else if (score < 0) {
      score = 0;
    }
    
    return score;
  } else {
    return 0;
  }
  
}
