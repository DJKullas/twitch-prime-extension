var notDoneClickingSubscribe = true;
var notDoneFindingSubDays = true;
var haveWeClosedModal = false;
var alreadyClickedClose = false;

document.body.addEventListener("DOMSubtreeModified", function () {
    var subscribeButton = document.querySelector('button[aria-label="Subscribe"]');
    var subDaysButton = document.querySelector('button[aria-label*="Prime Subscription"]');
    var modalClass = document.querySelector('body[class*="ReactModal__Body--open"]');
    var modalClose = document.querySelector('button[aria-label="Close modal"]');
    var modal = document.querySelector('div[class*="ReactModal__Overlay"]');
    var subText = document.querySelector('button[aria-label="Subscribe"]  div[data-a-target="tw-core-button-label-text"]');

    if (subscribeButton != null && notDoneClickingSubscribe && modalClass == null) {
        subscribeButton.click();
        subscribeButton.addEventListener("click", function () {
            var modal2 = document.querySelector('div[class*="ReactModal__Overlay"]');
            if (modal2 != null) {
                modal2.style.visibility = "visible";
            }
        });
    }

    if (modalClass != null && subDaysButton != null && notDoneFindingSubDays) {
        notDoneClickingSubscribe = false;
        var daysString = subDaysButton.getAttribute("aria-label");
        var date = daysString.substring(daysString.indexOf("available ") + 10);
        notDoneFindingSubDays = false;
        var subDate = new Date(date + " " + new Date().getFullYear()); // fix if next year in future
        var days = (subDate - new Date()) / (1000 * 3600 * 24);
        var roundedDays = Math.ceil(days);

        if (roundedDays <= 0) {
            subText.textContent = "Prime Sub Ready";
        } else {
            subText.textContent = roundedDays + " Days for Prime";
        }
    }

    if (alreadyClickedClose) {
        haveWeClosedModal = true;
    }

    if (modal != null && !haveWeClosedModal) {
        modal.style.visibility = "hidden";
        alreadyClickedClose = true;
    }
    
}, false);


