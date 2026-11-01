// Campus Volunteer Hours Tracker
// This file uses basic JavaScript concepts: variables, arrays, objects,
// functions, conditions, loops, events and localStorage.

// 1. Sample volunteer activities
var activities = [
  { id: 1, name: "Campus Clean-up Drive", category: "Environment", emoji: "🌱", date: "2026-11-08", description: "Help keep shared campus spaces clean and welcoming.", hours: "2–3 hours" },
  { id: 2, name: "Community Teaching Day", category: "Education", emoji: "📚", date: "2026-11-10", description: "Help school students with reading and homework.", hours: "2 hours" },
  { id: 3, name: "Annual Fest Volunteer", category: "Events", emoji: "🎪", date: "2026-11-14", description: "Help with event coordination and visitor guidance.", hours: "3–5 hours" },
  { id: 4, name: "Food Donation Support", category: "Community", emoji: "🥫", date: "2026-11-17", description: "Help pack and distribute food donations.", hours: "2 hours" },
  { id: 5, name: "Tree Plantation Activity", category: "Environment", emoji: "🌳", date: "2026-11-20", description: "Plant and care for trees on campus.", hours: "2–3 hours" },
  { id: 6, name: "Library Reading Buddy", category: "Education", emoji: "📖", date: "2026-11-22", description: "Help younger students improve their reading.", hours: "1–2 hours" }
];

// 2. Get saved data from the browser
var submissions = JSON.parse(localStorage.getItem("campusCareSubmissions") || "[]");
var joinedActivities = JSON.parse(localStorage.getItem("campusCareJoined") || "[]");

// A short function to get an HTML element by its ID
function getElement(id) {
  return document.getElementById(id);
}

// Save the latest data in localStorage
function saveData() {
  localStorage.setItem("campusCareSubmissions", JSON.stringify(submissions));
  localStorage.setItem("campusCareJoined", JSON.stringify(joinedActivities));
}

// Change a date into a readable format
function formatDate(date) {
  if (date === "") {
    return "—";
  }

  var newDate = new Date(date + "T00:00:00");
  return newDate.toLocaleDateString("en-IN");
}

// Show a status label
function showStatus(status) {
  return '<span class="status status-' + status.toLowerCase() + '">' + status + '</span>';
}

// Calculate the number of hours
function calculateHours(status) {
  var total = 0;

  for (var i = 0; i < submissions.length; i++) {
    if (status === "All" || submissions[i].status === status) {
      total = total + Number(submissions[i].hours);
    }
  }

  return total;
}

// 3. Change between website sections
function showPage(pageName) {
  var pages = document.getElementsByClassName("page-view");
  var buttons = document.getElementsByClassName("nav-link");

  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }

  for (var j = 0; j < buttons.length; j++) {
    buttons[j].classList.remove("active");
  }

  getElement(pageName).classList.add("active");

  for (var k = 0; k < buttons.length; k++) {
    if (buttons[k].getAttribute("data-view") === pageName) {
      buttons[k].classList.add("active");
    }
  }

  var pageNames = {
    dashboard: "Dashboard",
    activities: "Activities",
    "my-hours": "My hours",
    submit: "Submit hours",
    organizer: "Organizer panel"
  };

  getElement("pageName").textContent = pageNames[pageName];
  getElement("sidebar").classList.remove("open");
  showAllData();
}

// Add click events to navigation buttons
var navigationButtons = document.querySelectorAll("[data-view]");
for (var i = 0; i < navigationButtons.length; i++) {
  navigationButtons[i].addEventListener("click", function () {
    showPage(this.getAttribute("data-view"));
  });
}

// Add click events to buttons that open another section
var pageButtons = document.querySelectorAll("[data-go]");
for (var i = 0; i < pageButtons.length; i++) {
  pageButtons[i].addEventListener("click", function () {
    showPage(this.getAttribute("data-go"));
  });
}

// Mobile menu button
getElement("menuToggle").addEventListener("click", function () {
  getElement("sidebar").classList.toggle("open");
});

// Show today's date
getElement("todayLabel").textContent = new Date().toLocaleDateString("en-IN");

// 4. Show all volunteer activities
function showActivities() {
  var searchText = getElement("activitySearch").value.toLowerCase();
  var selectedCategory = getElement("categoryFilter").value;
  var activityHTML = "";

  for (var i = 0; i < activities.length; i++) {
    var activity = activities[i];
    var nameMatches = activity.name.toLowerCase().indexOf(searchText) !== -1;
    var descriptionMatches = activity.description.toLowerCase().indexOf(searchText) !== -1;
    var categoryMatches = selectedCategory === "All" || activity.category === selectedCategory;

    if (categoryMatches && (nameMatches || descriptionMatches)) {
      var buttonText = "Register now →";
      var disabledText = "";

      if (joinedActivities.indexOf(activity.id) !== -1) {
        buttonText = "✓ Registered";
        disabledText = "disabled";
      }

      activityHTML += '<article class="activity-card">';
      activityHTML += '<div class="activity-card-top"><div class="activity-emoji">' + activity.emoji + '</div>';
      activityHTML += '<span class="category-pill">' + activity.category + '</span></div>';
      activityHTML += '<h3>' + activity.name + '</h3>';
      activityHTML += '<p>' + activity.description + '</p>';
      activityHTML += '<div class="activity-meta"><span>▣ ' + formatDate(activity.date) + '</span>';
      activityHTML += '<span>◷ ' + activity.hours + '</span></div>';
      activityHTML += '<button class="primary-btn" data-join="' + activity.id + '" ' + disabledText + '>' + buttonText + '</button>';
      activityHTML += '</article>';
    }
  }

  if (activityHTML === "") {
    activityHTML = '<div class="no-results">No activities match your search.</div>';
  }

  getElement("activitiesGrid").innerHTML = activityHTML;

  // Add a click event to every Register button
  var registerButtons = document.querySelectorAll("[data-join]");
  for (var j = 0; j < registerButtons.length; j++) {
    registerButtons[j].addEventListener("click", function () {
      var activityId = Number(this.getAttribute("data-join"));

      if (joinedActivities.indexOf(activityId) === -1) {
        joinedActivities.push(activityId);
        saveData();
        showAllData();
      }
    });
  }
}

getElement("activitySearch").addEventListener("input", showActivities);
getElement("categoryFilter").addEventListener("change", showActivities);

// 5. Show dashboard information
function showDashboard() {
  getElement("totalHours").textContent = calculateHours("All");
  getElement("verifiedHours").textContent = calculateHours("Approved");
  getElement("impactHours").textContent = calculateHours("Approved");
  getElement("joinedCount").textContent = joinedActivities.length;

  var pending = 0;
  for (var i = 0; i < submissions.length; i++) {
    if (submissions[i].status === "Pending") {
      pending++;
    }
  }
  getElement("pendingCount").textContent = pending;

  var recentHTML = "";
  var count = 0;

  for (var j = submissions.length - 1; j >= 0 && count < 4; j--) {
    var item = submissions[j];
    recentHTML += '<tr><td>' + item.activity + '</td><td>' + formatDate(item.date) + '</td>';
    recentHTML += '<td>' + item.hours + ' hrs</td><td>' + showStatus(item.status) + '</td></tr>';
    count++;
  }

  if (recentHTML === "") {
    recentHTML = '<tr><td colspan="4" class="empty-row">No submissions yet. Submit your first volunteer hours!</td></tr>';
  }
  getElement("recentTable").innerHTML = recentHTML;

  var recommendedHTML = "";
  for (var k = 0; k < 3; k++) {
    var activity = activities[k];
    recommendedHTML += '<div class="activity-row"><div class="activity-emoji">' + activity.emoji + '</div>';
    recommendedHTML += '<div class="activity-info"><strong>' + activity.name + '</strong>';
    recommendedHTML += '<small>' + activity.category + ' · ' + formatDate(activity.date) + '</small></div>';
    recommendedHTML += '<button class="mini-action" data-go="activities">Explore</button></div>';
  }
  getElement("recommendedList").innerHTML = recommendedHTML;

  var exploreButtons = getElement("recommendedList").querySelectorAll("[data-go]");
  for (var m = 0; m < exploreButtons.length; m++) {
    exploreButtons[m].addEventListener("click", function () {
      showPage("activities");
    });
  }
}

// 6. Show the student's volunteer history
function showHistory() {
  getElement("historyVerified").textContent = calculateHours("Approved");
  getElement("historyPending").textContent = calculateHours("Pending");
  getElement("historyRejected").textContent = calculateHours("Rejected");

  var historyHTML = "";

  for (var i = submissions.length - 1; i >= 0; i--) {
    var item = submissions[i];
    historyHTML += '<tr><td>' + item.activity + '</td><td>' + formatDate(item.date) + '</td>';
    historyHTML += '<td>' + item.hours + ' hrs</td><td>' + showStatus(item.status) + '</td>';
    historyHTML += '<td>' + (item.note || "—") + '</td></tr>';
  }

  if (historyHTML === "") {
    historyHTML = '<tr><td colspan="5" class="empty-row">No volunteer hours submitted yet.</td></tr>';
  }

  getElement("historyTable").innerHTML = historyHTML;
}

// 7. Show submissions for the organizer
function showOrganizerPanel() {
  var pending = 0;
  var approved = 0;
  var tableHTML = "";

  for (var i = 0; i < submissions.length; i++) {
    var item = submissions[i];

    if (item.status === "Pending") {
      pending++;
    }
    if (item.status === "Approved") {
      approved++;
    }
  }

  getElement("organizerPending").textContent = pending;
  getElement("organizerApproved").textContent = approved;
  getElement("organizerTotal").textContent = submissions.length;

  for (var j = submissions.length - 1; j >= 0; j--) {
    var record = submissions[j];
    tableHTML += '<tr><td>' + record.student + '</td><td>' + record.activity + '</td>';
    tableHTML += '<td>' + formatDate(record.date) + '</td><td>' + record.hours + ' hrs</td>';
    tableHTML += '<td>' + showStatus(record.status) + '</td><td>';

    if (record.status === "Pending") {
      tableHTML += '<div class="action-group">';
      tableHTML += '<button class="approve-btn" data-approve="' + record.id + '">Approve</button>';
      tableHTML += '<button class="reject-btn" data-reject="' + record.id + '">Reject</button>';
      tableHTML += '</div>';
    } else {
      tableHTML += '—';
    }

    tableHTML += '</td></tr>';
  }

  if (tableHTML === "") {
    tableHTML = '<tr><td colspan="6" class="empty-row">There are no submissions to review.</td></tr>';
  }

  getElement("organizerTable").innerHTML = tableHTML;

  var approveButtons = document.querySelectorAll("[data-approve]");
  for (var k = 0; k < approveButtons.length; k++) {
    approveButtons[k].addEventListener("click", function () {
      changeStatus(Number(this.getAttribute("data-approve")), "Approved");
    });
  }

  var rejectButtons = document.querySelectorAll("[data-reject]");
  for (var m = 0; m < rejectButtons.length; m++) {
    rejectButtons[m].addEventListener("click", function () {
      changeStatus(Number(this.getAttribute("data-reject")), "Rejected");
    });
  }
}

// Change a submission's status
function changeStatus(id, newStatus) {
  for (var i = 0; i < submissions.length; i++) {
    if (submissions[i].id === id) {
      submissions[i].status = newStatus;

      if (newStatus === "Approved") {
        submissions[i].note = "Hours verified by organizer.";
      } else {
        submissions[i].note = "Submission was not approved. Please contact the organizer.";
      }

      break;
    }
  }

  saveData();
  showAllData();
}

// 8. Fill the activity dropdown in the form
for (var i = 0; i < activities.length; i++) {
  var option = document.createElement("option");
  option.value = activities[i].name;
  option.textContent = activities[i].name;
  getElement("activityName").appendChild(option);
}

// Do not allow a future date in the form
getElement("activityDate").max = new Date().toISOString().split("T")[0];

// 9. Submit volunteer hours
getElement("hoursForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var activityName = getElement("activityName").value;
  var activityDate = getElement("activityDate").value;
  var hours = Number(getElement("hoursInput").value);

  if (activityName === "" || activityDate === "" || hours < 0.5 || hours > 24) {
    getElement("formMessage").textContent = "Please enter valid activity details and hours.";
    return;
  }

  var newSubmission = {
    id: Date.now(),
    student: "Student User",
    activity: activityName,
    date: activityDate,
    hours: hours,
    description: getElement("description").value,
    organizer: getElement("organizerName").value,
    status: "Pending",
    note: "Awaiting organizer review."
  };

  submissions.push(newSubmission);
  saveData();
  getElement("hoursForm").reset();
  getElement("formMessage").textContent = "Your hours have been submitted and are pending verification.";
  showAllData();
});

// Update all sections of the website
function showAllData() {
  showDashboard();
  showActivities();
  showHistory();
  showOrganizerPanel();
}

// Start the website
showAllData();
