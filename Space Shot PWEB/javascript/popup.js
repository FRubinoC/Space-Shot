    /////// PAUSE POPUP ////////

function createPausePopup()
{
    var pausePopup = document.getElementById(PAUSE_POPUP_ID);
    if (pausePopup !== null) return;

    pausePopup = document.createElement("div");
    pausePopup.setAttribute("id", PAUSE_POPUP_ID);

    var pausePopupContent = document.createElement("div");
    pausePopupContent.setAttribute("id", PAUSE_POPUP_CONTENT_ID);
    pausePopupContent.appendChild(createBreakdownLabel());
    pausePopupContent.appendChild(createResumeLabel());
    pausePopupContent.appendChild(createBreakdownLabel());
    pausePopupContent.appendChild(createQuitgameLabel());

    pausePopup.appendChild(pausePopupContent);
    document.body.appendChild(pausePopup);
}

function createBreakdownLabel()
{
    var breakdownNode = document.createElement("br");
    return breakdownNode;
}

function createResumeLabel()
{
    var resumeLabelDiv = document.createElement("div");
    resumeLabelDiv.setAttribute("class", PAUSE_POPUP_LABEL);

    var resumeLabel = document.createElement('a');
    resumeLabel.setAttribute('onClick', "closePausePopup(); game1.start()");
    resumeLabel.innerText = " Continua";

    resumeLabelDiv.appendChild(resumeLabel);

    return resumeLabelDiv;
}

function createQuitgameLabel()
{
    var quitgameLabelDiv = document.createElement("div");
    quitgameLabelDiv.setAttribute("class", PAUSE_POPUP_LABEL);

    var quitgameLabel = document.createElement('a');
    quitgameLabel.setAttribute('onClick', "closePausePopup(); game1.gameover()");
    quitgameLabel.innerText = "Termina Partita";

    quitgameLabelDiv.appendChild(quitgameLabel);

    return quitgameLabelDiv;
}

function closePausePopup()
{
    var pausePopup = document.getElementById(PAUSE_POPUP_ID);
	if (pausePopup === null)
		return;
	
    document.body.removeChild(pausePopup);
}